// demoRouter — answers every RTK Query URL from localStorage. No HTTP request
// is made, but the response keeps the original { success, message, data } shape.
import { routes } from './demoHandlers'
import {
  bodyToObject,
  delay,
  HttpError,
  normalizeArg,
  ok,
} from './demoUtils'

const errorEnvelope = (message, status = 500) => ({
  success: false,
  message,
  data: null,
  status,
})

export const executeDemoRequest = async (arg) => {
  await delay()

  const request = normalizeArg(arg)
  const matchedRoute = routes.find(
    (item) =>
      item.method === request.method && item.pattern.test(request.path),
  )

  if (!matchedRoute) {
    return {
      ok: false,
      status: 404,
      envelope: errorEnvelope(
        `Demo endpoint not found: ${request.method} ${request.path}`,
        404,
      ),
    }
  }

  try {
    const captures = request.path.match(matchedRoute.pattern)?.slice(1) || []
    const result = await matchedRoute.handle({
      ...request,
      body: bodyToObject(request.body),
      captures,
    })
    const envelope =
      result && result.__demoEnvelope ? result.__demoEnvelope : ok(result)

    return { ok: true, status: 200, envelope }
  } catch (error) {
    const status = error instanceof HttpError ? error.status : error?.status || 500
    const message =
      error?.message || 'Something went wrong in the demo. Please try again.'

    return {
      ok: false,
      status,
      envelope: errorEnvelope(message, status),
    }
  }
}

const fakeResponse = (envelope, status = 200, responseOk = true) => ({
  ok: responseOk,
  status,
  statusText: responseOk ? 'OK' : 'Request failed',
  headers: {
    get: (name) =>
      String(name).toLowerCase() === 'content-type' ? 'application/json' : null,
  },
  json: async () => envelope,
  text: async () => JSON.stringify(envelope),
  blob: async () =>
    new Blob(['Mentora demo download'], { type: 'application/octet-stream' }),
  arrayBuffer: async () => new TextEncoder().encode('Mentora demo download').buffer,
})

// RTK Query baseQuery replacement.
export const demoBaseQuery = async (arg) => {
  const result = await executeDemoRequest(arg)

  if (!result.ok) {
    return {
      error: {
        status: result.status,
        data: result.envelope,
      },
    }
  }

  // A few endpoints ask fetchBaseQuery for a raw blob instead of JSON.
  if (arg && typeof arg === 'object' && typeof arg.responseHandler === 'function') {
    const handled = await arg.responseHandler(fakeResponse(result.envelope))
    return { data: handled }
  }

  return { data: result.envelope }
}

// Used by the global fetch shim for the few components that bypass RTK Query.
export const demoFetch = async (input, options = {}) => {
  const url = typeof input === 'string' ? input : input?.url || ''
  const result = await executeDemoRequest({
    url,
    method: options.method || 'GET',
    body: options.body,
    headers: options.headers,
  })

  return fakeResponse(result.envelope, result.status, result.ok)
}

export default demoBaseQuery
