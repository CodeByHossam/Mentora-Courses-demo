---
name: nodejs-production-patterns
description: >-
  Production Node.js patterns: async error handling, streams, worker threads,
  clustering, EventEmitter discipline, backpressure, and graceful shutdown.
  Use when building or hardening a Node.js backend service, handling large data,
  offloading CPU work, or fixing unhandled rejections. Trigger phrases: "unhandled
  rejection", "graceful shutdown", "worker threads", "streams", "cluster",
  "backpressure", "EventEmitter leak".
---

# Node.js Production Patterns

Production Node services fail predictably and shut down cleanly. Handle every
rejection, move CPU-bound work off the event loop, and never leave resources open.

## When to use

- Building or hardening a Node.js service.
- Handling async errors, unhandled rejections, or process crashes.
- Processing large files/streams or CPU-heavy tasks.
- Adding graceful shutdown and health/readiness signals.
- Trigger phrases: "unhandled rejection", "graceful shutdown", "worker threads",
  "streams", "cluster", "backpressure", "EventEmitter".

## Instructions

1. Make every async path handle errors; add `process.on('unhandledRejection')` and `'uncaughtException'` as a backstop that fails fast and exits.
2. Use the async wrapper so controller/service rejections reach the error handler.
3. Stream large payloads; respect backpressure instead of buffering whole files.
4. Offload CPU-bound work to `worker_threads`; scale across cores with `cluster`.
5. Implement graceful shutdown: stop accepting, drain, close DB/connections, exit.
6. Clean up listeners on EventEmitters to avoid leaks.

### Async error handling

```js
process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled rejection — shutting down');
  server.close(() => process.exit(1));
});
process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception — shutting down');
  process.exit(1);
});
```

### Graceful shutdown

```js
const shutdown = async (signal) => {
  logger.info({ signal }, 'shutting down');
  server.close();                       // stop accepting new connections
  await drainConnections();             // let in-flight requests finish
  await mongoose.connection.close();
  await redis.quit();
  process.exit(0);
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
```

### Streams with backpressure

```js
import { pipeline } from 'node:stream/promises';
await pipeline(
  fs.createReadStream(input),
  csvParser(),
  transformRow(),
  fs.createWriteStream(output),
);  // pipeline handles backpressure and destroys on error
```

### Worker threads (CPU-bound)

```js
import { Worker } from 'node:worker_threads';
const run = (payload) => new Promise((resolve, reject) => {
  const w = new Worker(new URL('./heavy.worker.js', import.meta.url), { workerData: payload });
  w.once('message', resolve);
  w.once('error', reject);
  w.once('exit', (code) => code !== 0 && reject(new Error(`worker exit ${code}`)));
});
```

### Clustering (use all cores)

```js
import cluster from 'node:cluster';
import os from 'node:os';
if (cluster.isPrimary) {
  os.cpus().forEach(() => cluster.fork());
  cluster.on('exit', (worker) => { logger.error({ pid: worker.process.pid }, 'worker died'); cluster.fork(); });
} else {
  startServer();
}
```

### EventEmitter discipline

```js
emitter.setMaxListeners(20);
const onData = (d) => handle(d);
emitter.on('data', onData);
// always remove on teardown to prevent leaks
cleanup(() => emitter.off('data', onData));
```

## Examples

### Good — bounded parallelism

```js
const pLimit = (await import('p-limit')).default;
const limit = pLimit(5);
await Promise.all(ids.map((id) => limit(() => fetchItem(id))));
```

### Bad — unbounded fan-out and swallowed errors

```js
await Promise.all(items.map(async (i) => { doWork(i).catch(() => {}); })); // no limit, errors ignored
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Empty `.catch(() => {})` | Hides failures | Log + handle or rethrow |
| Blocking loop over big data on the main thread | Freezes the event loop | Stream or worker thread |
| Buffering whole files into memory | OOM under load | `pipeline` / streams |
| No graceful shutdown | Dropped requests, corrupt state | SIGTERM handler |
| Forgetting `await` in try/catch | Catch never runs | Always `await` |
| Growing `EventEmitter` listeners | Memory leak, MaxListeners warning | `off` on cleanup |
| One process, many cores unused | Underutilized CPU | `cluster` / worker pool |

## Related skills

- `workflow/debugging-playbook`, `architecture/caching-and-performance`,
  `workflow/deployment`, `architecture/mern-architecture`.
