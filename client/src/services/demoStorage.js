// demoStorage — browser-only persistence for the Mentora demo.
// Every RTK Query request is answered from these localStorage collections.
import { createSeedData, resolveDateMarkers } from '../data/demoSeed'

const NAMESPACE = 'mentoraDemo.'
const SCHEMA_VERSION = 4
const DEMO_ADMIN_ID = 'u-admin'

const withKey = (key) => `${NAMESPACE}${key}`

export const STORAGE_KEYS = Object.freeze({
  users: withKey('users'),
  categories: withKey('categories'),
  courses: withKey('courses'),
  lessons: withKey('lessons'),
  enrollments: withKey('enrollments'),
  wishlist: withKey('wishlist'),
  cart: withKey('cart'),
  progress: withKey('progress'),
  courseInteractions: withKey('courseInteractions'),
  liveSessions: withKey('liveSessions'),
  enrollmentRequests: withKey('enrollmentRequests'),
  instructorRequests: withKey('instructorRequests'),
  notifications: withKey('notifications'),
  messages: withKey('messages'),
  grades: withKey('grades'),
  certificates: withKey('certificates'),
  payments: withKey('payments'),
  billingAccounts: withKey('billingAccounts'),
  billingTransactions: withKey('billingTransactions'),
  giftCards: withKey('giftCards'),
  payoutRequests: withKey('payoutRequests'),
  refunds: withKey('refunds'),
  levels: withKey('levels'),
  adminSettings: withKey('adminSettings'),
  session: withKey('session'),
  bannerDismissed: withKey('bannerDismissed'),
  version: withKey('version'),
})

const COLLECTION_NAMES = Object.freeze([
  'users',
  'categories',
  'courses',
  'lessons',
  'enrollments',
  'wishlist',
  'cart',
  'progress',
  'courseInteractions',
  'liveSessions',
  'enrollmentRequests',
  'instructorRequests',
  'notifications',
  'messages',
  'grades',
  'certificates',
  'payments',
  'billingAccounts',
  'billingTransactions',
  'giftCards',
  'payoutRequests',
  'refunds',
  'levels',
  'adminSettings',
])

const clone = (value) =>
  value === undefined ? value : JSON.parse(JSON.stringify(value))

const encodeTokenPart = (value) => {
  const json = JSON.stringify(value)
  const bytes = new TextEncoder().encode(json)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function createDemoToken(user) {
  const now = Math.floor(Date.now() / 1000)
  const header = encodeTokenPart({ alg: 'none', typ: 'JWT' })
  const payload = encodeTokenPart({
    ...publicUser(user),
    id: user._id,
    _id: user._id,
    iat: now,
    exp: now + 60 * 60 * 24,
  })
  return `${header}.${payload}.demo-signature`
}

export function publicUser(user) {
  if (!user) return null
  const { password, ...safeUser } = user
  return {
    ...clone(safeUser),
    id: user._id,
    _id: user._id,
    isActive: user.isActive !== false,
  }
}

export function initializeDemoData(force = false) {
  const storedVersion = Number(localStorage.getItem(STORAGE_KEYS.version) || 0)
  if (!force && storedVersion === SCHEMA_VERSION) return

  const seed = resolveDateMarkers(createSeedData())
  COLLECTION_NAMES.forEach((name) => {
    localStorage.setItem(STORAGE_KEYS[name], JSON.stringify(seed[name]))
  })

  localStorage.setItem(STORAGE_KEYS.version, String(SCHEMA_VERSION))
  localStorage.setItem(STORAGE_KEYS.bannerDismissed, JSON.stringify(false))
  setDemoSession(DEMO_ADMIN_ID)
}

export function resetDemoData() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
  initializeDemoData(true)
}

export function readCollection(name) {
  initializeDemoData()
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS[name]) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeCollection(name, items) {
  initializeDemoData()
  localStorage.setItem(STORAGE_KEYS[name], JSON.stringify(items))
  return clone(items)
}

export function readSetting(name, fallback = null) {
  initializeDemoData()
  try {
    const value = localStorage.getItem(STORAGE_KEYS[name])
    return value === null ? clone(fallback) : JSON.parse(value)
  } catch {
    return clone(fallback)
  }
}

export function writeSetting(name, value) {
  initializeDemoData()
  localStorage.setItem(STORAGE_KEYS[name], JSON.stringify(value))
  return clone(value)
}

export function createId(prefix = 'demo') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function findById(collectionName, id) {
  return readCollection(collectionName).find(
    (item) => String(item._id || item.id) === String(id),
  )
}

export function upsertItem(collectionName, item) {
  const items = readCollection(collectionName)
  const id = String(item._id || item.id)
  const index = items.findIndex(
    (existing) => String(existing._id || existing.id) === id,
  )
  const nextItem = clone(item)

  if (index >= 0) {
    items[index] = { ...items[index], ...nextItem }
  } else {
    items.unshift(nextItem)
  }

  writeCollection(collectionName, items)
  return clone(nextItem)
}

export function removeById(collectionName, id) {
  const items = readCollection(collectionName).filter(
    (item) => String(item._id || item.id) !== String(id),
  )
  writeCollection(collectionName, items)
  return items
}

export function getSession() {
  initializeDemoData()
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || 'null')
  } catch {
    return null
  }
}

export function setSession(session) {
  initializeDemoData()
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session))
  return clone(session)
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session)
  localStorage.removeItem('token')
  localStorage.setItem('persist', JSON.stringify(false))
}

export function setDemoSession(userId = DEMO_ADMIN_ID) {
  const user = findById('users', userId)
  if (!user) throw new Error('Demo user not found.')
  if (user.isActive === false) throw new Error('This demo account is inactive.')

  const safeUser = publicUser(user)
  const token = createDemoToken(user)
  localStorage.setItem('token', token)
  localStorage.setItem('persist', JSON.stringify(true))
  return setSession({ _id: user._id, token, user: safeUser })
}

export function getSessionUser() {
  return getSession()?.user || null
}

export function getSwitchableUsers() {
  const roleLabels = { admin: 'Admin', instructor: 'Instructor', student: 'Student' }
  return readCollection('users')
    .filter((user) => user.isActive !== false)
    .map((user) => ({
      id: user._id,
      name: user.name || user.email,
      role: user.role,
      roleLabel: roleLabels[user.role] || user.role,
      email: user.email,
    }))
    .sort((left, right) => {
      const roleOrder = { admin: 0, instructor: 1, student: 2 }
      const order = (roleOrder[left.role] ?? 9) - (roleOrder[right.role] ?? 9)
      return order || left.name.localeCompare(right.name)
    })
}

export function isBannerDismissed() {
  return readSetting('bannerDismissed', false) === true
}

export function setBannerDismissed(dismissed) {
  return writeSetting('bannerDismissed', Boolean(dismissed))
}
