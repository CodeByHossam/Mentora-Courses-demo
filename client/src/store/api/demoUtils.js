// demoUtils — shared helpers for the browser-only Mentora API router.
import {
  findById,
  getSessionUser,
  publicUser,
  readCollection,
  upsertItem,
} from '../../services/demoStorage'

export const DEMO_ADMIN_ID = 'u-admin'

export const clone = (value) =>
  value === undefined ? undefined : JSON.parse(JSON.stringify(value))

export const delay = (ms = 200 + Math.round(Math.random() * 100)) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export const httpError = (status, message) => new HttpError(status, message)

export const ok = (data, message = 'OK', extra = {}) => ({
  success: true,
  message,
  data,
  ...extra,
})

export const customEnvelope = (envelope) => ({ __demoEnvelope: envelope })

export const normalizeArg = (arg) => {
  const source = typeof arg === 'string' ? { url: arg } : arg || {}
  let url = String(source.url || '')

  // Accept relative demo URLs as well as the original backend URLs so the
  // global fetch shim can reuse exactly the same handlers.
  url = url.replace(/^https?:\/\/[^/]+/i, '')
  url = url.replace(/^\/api\b/, '')
  url = url.replace(/^\/+/, '')

  const [pathname, search = ''] = url.split('?')
  const params = {
    ...Object.fromEntries(new URLSearchParams(search)),
    ...(source.params || {}),
  }

  return {
    path: pathname,
    params,
    method: String(source.method || 'GET').toUpperCase(),
    body: source.body,
    headers: source.headers || {},
    responseHandler: source.responseHandler,
  }
}

const fileToInfo = (file, key = 'file') => ({
  filename: file?.name || `${key}-demo.txt`,
  url: '#demo-file',
  size: file?.size || 0,
  type: file?.type || 'application/octet-stream',
})

export const bodyToObject = (body) => {
  if (!body) return {}
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  if (typeof FormData !== 'undefined' && body instanceof FormData) {
    const result = {}
    body.forEach((value, key) => {
      const isFile = typeof File !== 'undefined' && value instanceof File
      const normalizedKey = key.endsWith('[]') ? key.slice(0, -2) : key
      const parsedValue = isFile ? fileToInfo(value, normalizedKey) : value

      if (key.endsWith('[]')) {
        if (!Array.isArray(result[normalizedKey])) result[normalizedKey] = []
        result[normalizedKey].push(parsedValue)
      } else {
        result[normalizedKey] = parsedValue
      }
    })
    return result
  }
  return body
}

export const paramString = (value) =>
  value === undefined || value === null ? '' : String(value)

export const currentUser = () => getSessionUser()

export const requireUser = () => {
  const user = currentUser()
  if (!user) throw httpError(401, 'Please sign in to continue.')
  return user
}

export const requireRole = (...roles) => {
  const user = requireUser()
  if (!roles.includes(user.role)) {
    throw httpError(403, 'You do not have permission to do that in this demo.')
  }
  return user
}

export const all = (collection) => readCollection(collection)

export const byId = (collection, id) => findById(collection, id)

export const patchItem = (collection, id, patch) => {
  const item = byId(collection, id)
  if (!item) throw httpError(404, 'Record not found.')
  const next = { ...item, ...clone(patch), updatedAt: new Date().toISOString() }
  upsertItem(collection, next)
  return clone(next)
}

export const nextId = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

export const summary = (user) => {
  if (!user) return null
  return {
    _id: user._id,
    id: user._id,
    name: user.name || user.email,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
  }
}

export const summaryCategory = (category) => {
  if (!category) return { _id: '', id: '', name: 'Uncategorized' }
  return {
    _id: category._id,
    id: category._id,
    name: category.name,
    description: category.description,
  }
}

export const enrichCourse = (course) => {
  if (!course) return course
  const lessons = all('lessons')
    .filter((lesson) => lesson.courseId === course._id)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
  const enrolledStudents = (course.enrolledStudents || [])
    .map((entry) => (typeof entry === 'string' ? byId('users', entry) : entry))
    .filter(Boolean)
    .map(summary)
  const category = byId('categories', course.categoryId) || course.category
  const instructor = byId('users', course.instructorId) || course.instructor
  const ratingInfo = {
    averageRating: course.averageRating || course.rating || 0,
    ratingsCount: course.ratingInfo?.ratingsCount || 0,
    likesCount: course.likesCount || course.likes || 0,
    userRating: course.ratingInfo?.userRating || 0,
    liked: Boolean(course.ratingInfo?.liked),
  }
  const userId = currentUser()?._id

  return {
    ...clone(course),
    id: course._id,
    category: summaryCategory(category),
    categoryId: course.categoryId || category?._id,
    instructor: summary(instructor) || clone(course.instructor) || null,
    instructorId: course.instructorId || instructor?._id,
    lessons: lessons.map((lesson) => enrichLesson(lesson)),
    lessonsCount: lessons.length || course.lessonsCount || 0,
    enrolledStudents,
    students: enrolledStudents.length || course.students || 0,
    ratingInfo,
    averageRating: ratingInfo.averageRating,
    hasPendingRequest: all('enrollmentRequests').some(
      (request) =>
        request.userId === userId &&
        request.courseId === course._id &&
        request.status === 'pending',
    ),
  }
}

export const enrichLesson = (lesson) => ({
  ...clone(lesson),
  id: lesson._id,
  isPublished: lesson.isPublished !== false,
  isPreview: Boolean(lesson.isPreview),
})

export const enrichInteraction = (interaction) => {
  const base = interaction || {
    _id: nextId('interaction'),
    courseId: '',
    comments: [],
    tests: [],
    attachments: [],
  }

  return {
    ...clone(base),
    id: base._id,
    comments: (base.comments || []).map((comment) => ({
      ...clone(comment),
      user: summary(byId('users', comment.user?._id || comment.user)) || comment.user,
      replies: (comment.replies || []).map((reply) => ({
        ...clone(reply),
        user: summary(byId('users', reply.user?._id || reply.user)) || reply.user,
      })),
    })),
    tests: (base.tests || []).map((test) => ({
      ...clone(test),
      fileUrl: test.fileUrl || test.questionFile?.url || '#demo-questions',
      answerKey: test.answerKey || { filename: 'answer-key.pdf', url: '#demo-answer-key' },
      submissions: (test.submissions || []).map((submission) => ({
        ...clone(submission),
        answerFileUrl:
          submission.answerFileUrl || submission.answerFile?.url || '#demo-answers',
      })),
    })),
    attachments: (base.attachments || []).map((attachment) => ({
      ...clone(attachment),
      lesson: attachment.lesson || attachment.lessonId || '',
      lessonId: attachment.lessonId || attachment.lesson || '',
      fileUrl: attachment.fileUrl || attachment.file?.url || '#demo-file',
      fileSize: attachment.fileSize || attachment.file?.size || 0,
      fileType: attachment.fileType || attachment.file?.type || 'application/pdf',
      uploadedBy:
        summary(byId('users', attachment.uploadedBy?._id || attachment.uploadedBy)) ||
        attachment.uploadedBy ||
        summary(requireUser()),
    })),
  }
}

export const interactionForCourse = (courseId) => {
  let interaction = all('courseInteractions').find((item) => item.courseId === courseId)
  if (!interaction) {
    interaction = {
      _id: nextId('interaction'),
      courseId,
      comments: [],
      tests: [],
      attachments: [],
    }
    upsertItem('courseInteractions', interaction)
  }
  return interaction
}

export const enrichRequest = (request) => {
  const user = byId('users', request.userId) || request.user
  const course = byId('courses', request.courseId) || request.course
  return {
    ...clone(request),
    user: summary(user) || request.user,
    course: course ? enrichCourse(course) : request.course,
    adminNotes: request.adminNotes || [],
    receiptUrl: request.receiptUrl || '#demo-receipt',
  }
}

export const enrichSession = (session) => {
  const instructor = byId('users', session.instructorId) || session.instructor
  const course = byId('courses', session.courseId) || session.course
  const studentIds = session.studentIds || []
  const participants = studentIds
    .map((id) => byId('users', id))
    .filter(Boolean)
    .map(summary)

  return {
    ...clone(session),
    course: course
      ? {
          _id: course._id,
          id: course._id,
          title: course.title,
          instructor: summary(byId('users', course.instructorId)) || null,
        }
      : session.course,
    instructor: summary(instructor) || session.instructor,
    participants,
    scheduledDate: session.scheduledDate || session.scheduledAt,
    scheduledDateTime: session.scheduledDateTime || session.scheduledAt,
    currentStatus: session.currentStatus || session.status,
    meetingUrl: session.meetingUrl || '#demo-meeting',
    zoomJoinUrl: session.zoomJoinUrl || '#demo-meeting',
    zoomStartUrl: session.zoomStartUrl || '#demo-host',
    recordingUrl: session.recordingUrl || '#demo-recording',
  }
}

export const enrichPayment = (payment) => {
  const user = byId('users', payment.userId) || payment.user
  const course = byId('courses', payment.courseId) || payment.course
  return {
    ...clone(payment),
    user: summary(user) || payment.user,
    course: course ? enrichCourse(course) : payment.course,
    amount: payment.amount || payment.finalAmount || 0,
    finalAmount: payment.finalAmount || payment.amount || 0,
    receiptUrl: payment.receiptUrl || '#demo-receipt',
  }
}

export const enrichGrade = (grade) => {
  const student = byId('users', grade.studentId) || grade.student
  const course = byId('courses', grade.courseId) || grade.course
  return {
    ...clone(grade),
    student: summary(student) || grade.student,
    course: course ? enrichCourse(course) : grade.course,
    testGrades: grade.testGrades || [],
  }
}

const ACTIVE_BILLING_STATUS = Object.freeze({
  isActive: true,
  isOverLimit: false,
  outstandingPayments: 0,
})

export const billingFor = (userId) => {
  const stored = all('billingAccounts').find((item) => item.userId === userId)
  if (stored) {
    return { ...clone(stored), ...ACTIVE_BILLING_STATUS }
  }
  return {
    _id: `billing-${userId}`,
    userId,
    balance: 0,
    availableBalance: 0,
    totalRevenue: 0,
    totalEarnings: 0,
    pendingAmount: 0,
    platformBalance: 0,
    totalInstructorPayouts: 0,
    totalStudentRefunds: 0,
    currency: 'USD',
    ...ACTIVE_BILLING_STATUS,
  }
}

export const buildBillingData = (userId) => {
  const account = billingFor(userId)
  const transactions = all('billingTransactions')
    .filter((item) => item.userId === userId)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
  const payments = all('payments')
    .filter((item) => item.userId === userId)
    .map(enrichPayment)
  const giftCards = all('giftCards').filter(
    (item) => !item.userId || item.userId === userId,
  )

  const view = {
    ...account,
    account: clone(account),
    billingAccount: clone(account),
    config: {
      creditLimit: 1000,
      annualFee: 0,
      currency: account.currency || 'USD',
    },
    recentTransactions: clone(transactions),
    transactions: clone(transactions),
    coursePurchases: payments.map((payment) => ({
      ...clone(payment),
      courseName: payment.course?.title,
      purchaseDate: payment.createdAt,
      purchaseAmount: payment.finalAmount,
      paymentMethod: payment.method,
    })),
    giftCards: clone(giftCards),
    annualFees: 0,
    outstandingPayments: payments.filter((item) => item.status === 'pending').length,
    isActive: true,
    isOverLimit: false,
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    summary: {
      totalRevenue: account.totalRevenue || 0,
      totalCommission: account.platformBalance || 0,
      totalInstructorAmount: account.totalEarnings || 0,
      totalSales: payments.length,
    },
  }

  return view
}

export const paginate = (items, params = {}, defaultLimit = 10) => {
  const page = Math.max(1, Number(params.page) || 1)
  const limit = Math.max(1, Number(params.limit) || defaultLimit)
  const total = items.length
  const pages = Math.max(1, Math.ceil(total / limit))
  const start = (page - 1) * limit
  const data = items.slice(start, start + limit)

  return {
    data,
    meta: {
      page,
      pages,
      total,
      limit,
      hasNextPage: page < pages,
      hasPrevPage: page > 1,
    },
  }
}

export const sortCourses = (courses, sort = 'newest') => {
  const list = [...courses]
  if (sort === 'price-low' || sort === 'price-asc') {
    return list.sort((a, b) => a.price - b.price)
  }
  if (sort === 'price-high' || sort === 'price-desc') {
    return list.sort((a, b) => b.price - a.price)
  }
  if (sort === 'rating') return list.sort((a, b) => b.averageRating - a.averageRating)
  if (sort === 'popular') return list.sort((a, b) => b.students - a.students)
  if (sort === 'oldest') {
    return list.sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)))
  }
  return list.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
}
