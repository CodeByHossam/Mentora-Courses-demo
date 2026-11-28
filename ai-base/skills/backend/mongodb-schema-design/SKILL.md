---
name: mongodb-schema-design
description: >-
  Design MongoDB schemas with Mongoose: embed vs reference decisions, validation,
  compound/partial/TTL/text/sparse indexes, virtuals, and query performance.
  Use when modeling a domain in MongoDB, choosing relationships, adding indexes,
  or fixing slow Mongoose queries. Trigger phrases: "Mongoose schema", "embed vs
  reference", "add an index", "data model", "populate", "lean query", "TTL".
---

# MongoDB Schema Design (Mongoose)

Mongoose adds structure to MongoDB's flexibility. Model the shape that matches
your access patterns, enforce integrity at the DB layer, and index for the
queries you actually run.

## When to use

- Designing or reviewing a Mongoose model.
- Deciding embed vs reference for a relationship.
- Adding indexes for query performance or uniqueness.
- Fixing N+1 queries, missing `.lean()`, or duplicate-key handling.
- Trigger phrases: "Mongoose schema", "embed vs reference", "add index",
  "data model", "populate", "lean", "TTL", "soft delete".

## Instructions

1. Ask: how is this data read and written? Design for the read path.
2. Embed when data is always fetched together and is one-to-few and bounded.
3. Reference when data is queried independently or is one-to-many/many.
4. Add validators at the schema layer (last line of defense) in addition to API validation.
5. Index every field used in `find`, `sort`, or uniqueness constraints.
6. Use `.lean()` for read-only queries; only skip it when you must call `save()`.

### Model structure

```js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'] },
  passwordHash: { type: String, required: true, select: false },   // never returned by default
  displayName: { type: String, required: true, trim: true, maxlength: 50 },
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  emailVerified: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },                        // soft delete
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret.passwordHash; delete ret.__v; return ret; } },
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.methods.isPasswordMatch = function (plain) { return bcrypt.compare(plain, this.passwordHash); };
userSchema.statics.findActiveByEmail = function (email) { return this.findOne({ email, deletedAt: null }); };
userSchema.virtual('profileUrl').get(function () { return `/users/${this._id}`; });
```

### Embed vs reference

```js
// EMBED — always fetched together, one-to-few, bounded
const postSchema = new mongoose.Schema({
  title: String,
  tags: [{ type: String, maxlength: 50 }],
  author: { _id: ObjectId, displayName: String, avatarUrl: String }, // denormalized snapshot
});

// REFERENCE — many, queried independently
const commentSchema = new mongoose.Schema({
  postId: { type: ObjectId, ref: 'Post', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  body: { type: String, required: true, maxlength: 2000 },
}, { timestamps: true });
commentSchema.index({ postId: 1, createdAt: 1 });
```

### Indexes that matter

```js
postSchema.index({ authorId: 1, createdAt: -1 });          // filter + sort
userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { deletedAt: null } }); // active only
tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });   // TTL cleanup
postSchema.index({ title: 'text', body: 'text' }, { weights: { title: 2, body: 1 } }); // search
userSchema.index({ googleId: 1 }, { sparse: true, unique: true });   // only OAuth docs
```

### Query performance

```js
// Read-only: use lean (plain objects, far less memory)
const user = await User.findById(id).lean();

// Avoid N+1: batch-populate instead of per-item queries
const posts = await Post.find({ status: 'published' })
  .populate('authorId', 'displayName avatarUrl')
  .lean();

// Soft-delete filter on every find
userSchema.pre(/^find/, function () { this.where({ deletedAt: null }); });
```

## Examples

### Good — bounded embed, indexed, lean read

```js
const article = await Article.find({ authorId }).sort({ createdAt: -1 }).limit(20).lean();
```

### Bad — unbounded embed and N+1

```js
// comments array grows forever inside Post (document can exceed 16MB)
await Post.updateOne({ _id }, { $push: { comments: c } });
for (const p of posts) p.author = await User.findById(p.authorId); // N+1
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Unbounded arrays inside a document | Hits 16MB doc limit, slow | Reference the children |
| Not using `.lean()` on reads | 5–10× memory overhead | `.lean()` for read-only |
| N+1 queries in loops | Latency scales with N | `populate` / `$in` |
| Missing `await` on `create`/`update` | Silent bugs, returns Promise | Always `await` |
| Using `id` in DB queries | Only the virtual exists in JSON | Query by `_id` |
| Relying only on Mongoose validation | No defense at API edge | Validate at both layers |
| Denormalizing without a refresh strategy | Stale data | Document staleness or keep a single source |

## Related skills

- `architecture/data-and-systems-design`, `backend/express-api-structure`,
  `testing/integration-testing`, `architecture/api-design`.
