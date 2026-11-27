// demoHandlers — localStorage implementations for the original RTK Query URLs.
import {
  clearSession,
  createDemoToken,
  createId,
  getSession,
  publicUser,
  readCollection,
  readSetting,
  removeById,
  setDemoSession,
  upsertItem,
  writeCollection,
  writeSetting,
} from '../../services/demoStorage'
import {
  all,
  bodyToObject,
  billingFor,
  buildBillingData,
  byId,
  clone,
  currentUser,
  customEnvelope,
  DEMO_ADMIN_ID,
  enrichCourse,
  enrichGrade,
  enrichInteraction,
  enrichLesson,
  enrichPayment,
  enrichRequest,
  enrichSession,
  httpError,
  interactionForCourse,
  nextId,
  ok,
  paginate,
  patchItem,
  requireRole,
  requireUser,
  sortCourses,
  summary,
} from './demoUtils'

const route = (method, pattern, handle) => ({ method, pattern, handle })
const isTrue = (value) => value === true || value === 'true' || value === '1'
const stringValue = (value, fallback = '') =>
  value === undefined || value === null ? fallback : String(value)

const saveUser = (user) => {
  upsertItem('users', user)
  return publicUser(user)
}

const createEnrollment = (userId, courseId, progress = 0) => {
  const existing = all('enrollments').find(
    (item) => item.userId === userId && item.courseId === courseId,
  )
  if (existing) return existing

  const enrollment = {
    _id: nextId('enroll'),
    userId,
    courseId,
    progress,
    completedLessons: 0,
    enrolledAt: new Date().toISOString(),
    status: 'active',
  }
  upsertItem('enrollments', enrollment)

  const course = byId('courses', courseId)
  if (course) {
    const enrolledStudents = course.enrolledStudents || []
    if (!enrolledStudents.includes(userId)) {
      upsertItem('courses', {
        ...course,
        enrolledStudents: [...enrolledStudents, userId],
      })
    }
  }
  return enrollment
}

const addNote = (notes, note, idPrefix = 'note') => [
  ...(notes || []),
  {
    _id: nextId(idPrefix),
    note: stringValue(note),
    createdAt: new Date().toISOString(),
  },
]

const editNote = (notes, noteId, note) =>
  (notes || []).map((item) =>
    item._id === noteId ? { ...item, note: stringValue(note), updatedAt: new Date().toISOString() } : item,
  )

const coursesForInstructor = (instructorId) =>
  all('courses').filter((course) => course.instructorId === instructorId)

const ensureInteraction = (courseId) => interactionForCourse(courseId)

const updateInteraction = (courseId, updater) => {
  const interaction = ensureInteraction(courseId)
  const next = updater(clone(interaction))
  upsertItem('courseInteractions', { ...next, courseId })
  return enrichInteraction({ ...next, courseId })
}

const sessionsEnvelope = (sessions, message = 'OK', extra = {}) =>
  customEnvelope(ok(sessions, message, { sessions, ...extra }))

const notificationView = (notifications, extra = {}) =>
  customEnvelope(
    ok(notifications, 'OK', {
      notifications,
      unreadCount: notifications.filter((item) => !item.isRead).length,
      ...extra,
    }),
  )

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

const login = ({ body }) => {
  const email = stringValue(body.email).toLowerCase()
  const user = all('users').find(
    (item) => stringValue(item.email).toLowerCase() === email,
  )

  if (!user || (user.password && user.password !== stringValue(body.password))) {
    throw httpError(401, 'Invalid email or password.')
  }
  if (user.isActive === false) throw httpError(403, 'This account is inactive.')

  const session = setDemoSession(user._id)
  return { accessToken: session.token, user: session.user }
}

const register = ({ body }) => {
  const email = stringValue(body.email).toLowerCase()
  if (all('users').some((item) => item.email?.toLowerCase() === email)) {
    throw httpError(409, 'An account with this email already exists.')
  }

  const user = {
    _id: nextId('user'),
    name: stringValue(body.name, 'Demo Student'),
    email,
    password: stringValue(body.password, 'demo1234'),
    role: 'student',
    avatar: '/images/photo-1472099645785-5658abf4ff4e.jpg',
    phone: stringValue(body.phone),
    bio: stringValue(body.bio),
    isActive: true,
    isVerified: true,
    createdAt: new Date().toISOString(),
  }
  saveUser(user)
  const session = setDemoSession(user._id)
  return { accessToken: session.token, user: session.user }
}

const logout = () => {
  clearSession()
  return { message: 'Logged out of the demo.' }
}

const refresh = () => {
  const session = getSession() || setDemoSession(DEMO_ADMIN_ID)
  return {
    accessToken: session.token || createDemoToken(session.user),
    user: session.user,
  }
}

const updateOwnProfile = ({ body }) => {
  const user = requireUser()
  const patch = { ...body }
  delete patch.password
  delete patch.currentPassword
  delete patch.newPassword
  const stored = byId('users', user._id)
  const next = saveUser({ ...stored, ...patch })
  setDemoSession(user._id)
  return next
}

const changePassword = ({ body }) => {
  const user = requireUser()
  const stored = byId('users', user._id)
  const currentPassword = stringValue(body.currentPassword || body.oldPassword)
  if (stored.password && currentPassword && stored.password !== currentPassword) {
    throw httpError(400, 'Current password is incorrect.')
  }
  const nextPassword = stringValue(body.newPassword || body.password)
  saveUser({ ...stored, password: nextPassword || stored.password })
  return { message: 'Password updated.' }
}

// ---------------------------------------------------------------------------
// Users and reports
// ---------------------------------------------------------------------------

const listUsers = () =>
  all('users').map((user) => ({
    ...publicUser(user),
    billingAccount: billingFor(user._id),
  }))

const createUser = ({ body }) => {
  requireRole('admin')
  const email = stringValue(body.email).toLowerCase()
  if (all('users').some((item) => item.email?.toLowerCase() === email)) {
    throw httpError(409, 'An account with this email already exists.')
  }
  const user = {
    _id: nextId('user'),
    name: stringValue(body.name, 'New User'),
    email,
    password: stringValue(body.password, 'demo1234'),
    role: ['admin', 'instructor', 'student'].includes(body.role) ? body.role : 'student',
    avatar: '/images/photo-1472099645785-5658abf4ff4e.jpg',
    bio: stringValue(body.bio),
    phone: stringValue(body.phone),
    isActive: body.isActive !== false,
    isVerified: isTrue(body.isVerified),
    specialization: stringValue(body.specialization),
    createdAt: new Date().toISOString(),
  }
  return saveUser(user)
}

const getUser = ({ captures }) => {
  const user = byId('users', captures[0])
  if (!user) throw httpError(404, 'User not found.')
  const safe = publicUser(user)
  return { ...safe, userData: safe }
}

const updateUser = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const stored = byId('users', captures[0])
  if (!stored) throw httpError(404, 'User not found.')
  const patch = { ...body }
  delete patch.photo
  return saveUser({ ...stored, ...patch })
}

const deleteUser = ({ captures }) => {
  requireRole('admin')
  removeById('users', captures[0])
  return { message: 'User deleted.' }
}

const userStats = () => {
  const users = all('users')
  return {
    totalUsers: users.length,
    totalStudents: users.filter((item) => item.role === 'student').length,
    totalInstructors: users.filter((item) => item.role === 'instructor').length,
    totalAdmins: users.filter((item) => item.role === 'admin').length,
    verifiedUsers: users.filter((item) => item.isVerified).length,
    totalCreatedCourses: all('courses').length,
    totalEnrolledCourses: all('enrollments').length,
  }
}

const adminReports = () => ({
  ...userStats(),
  revenue: all('payments').reduce((sum, item) => sum + (item.finalAmount || 0), 0),
  requests: all('enrollmentRequests').length,
  payouts: all('payoutRequests').length,
})

const instructorStudents = ({ captures }) => {
  const courseIds = coursesForInstructor(captures[0]).map((item) => item._id)
  const userIds = all('enrollments')
    .filter((item) => courseIds.includes(item.courseId))
    .map((item) => item.userId)
  return [...new Set(userIds)].map((id) => publicUser(byId('users', id))).filter(Boolean)
}

const instructorReports = ({ captures }) => {
  const courses = coursesForInstructor(captures[0])
  return {
    totalStudents: instructorStudents({ captures }).length,
    totalCourses: courses.length,
    totalRevenue: courses.reduce((sum, course) => sum + (course.price || 0) * (course.students || 0), 0),
    courses: courses.map((course) => enrichCourse(course)),
  }
}

const instructorsWithBilling = () => {
  const users = all('users')
    .filter((item) => item.role === 'instructor')
    .map((item) => ({
      ...publicUser(item),
      billingAccount: billingFor(item._id),
      students: instructorStudents({ captures: [item._id] }).length,
    }))
  return { users, instructors: users }
}

const bankDetails = () => {
  const admin = byId('users', DEMO_ADMIN_ID) || all('users').find((item) => item.role === 'admin')
  return {
    name: admin?.name || 'Mentora Admin',
    paymentDetails: {
      bankDetails: {
        bankName: 'Demo Bank',
        accountNumber: 'DEMO-000-123456',
        accountHolder: admin?.name || 'Mentora Admin',
        swift: 'DEMOBANK',
        iban: 'DE00 0000 0000 0000 0000 00',
      },
    },
  }
}

// ---------------------------------------------------------------------------
// Categories, courses, lessons
// ---------------------------------------------------------------------------

const listCategories = () => all('categories')

const createCategory = ({ body }) => {
  requireRole('admin')
  const category = {
    _id: nextId('cat'),
    name: stringValue(body.name, 'New category'),
    description: stringValue(body.description),
    isActive: body.isActive !== false,
    order: Number(body.order) || all('categories').length + 1,
    createdAt: new Date().toISOString(),
  }
  upsertItem('categories', category)
  return category
}

const categoryById = ({ captures }) => byId('categories', captures[0]) || null

const updateCategory = ({ captures, body }) => {
  requireRole('admin')
  return patchItem('categories', captures[0], body)
}

const deleteCategory = ({ captures }) => {
  requireRole('admin')
  removeById('categories', captures[0])
  return { message: 'Category deleted.' }
}

const listCourses = ({ params }) => {
  let courses = all('courses').map(enrichCourse)
  const search = stringValue(params.search).toLowerCase()
  if (search) {
    courses = courses.filter((course) =>
      [course.title, course.description, course.instructor?.name, course.category?.name]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search)),
    )
  }
  if (params.category) {
    courses = courses.filter(
      (course) =>
        course.category?.name === params.category ||
        course.category?._id === params.category,
    )
  }
  if (params.level) {
    courses = courses.filter(
      (course) => String(course.level).toLowerCase() === String(params.level).toLowerCase(),
    )
  }

  const paged = paginate(sortCourses(courses, params.sort), params)
  return customEnvelope(ok(paged.data, 'Courses loaded.', paged.meta))
}

const allCourses = () => all('courses').map(enrichCourse)

const courseById = ({ captures }) => enrichCourse(byId('courses', captures[0]))

const createCourse = ({ body }) => {
  const user = requireRole('admin', 'instructor')
  let topics = body.topics
  if (typeof topics === 'string') {
    try {
      topics = JSON.parse(topics)
    } catch {
      topics = topics.split('\n').filter(Boolean)
    }
  }
  const category = all('categories').find(
    (item) => item._id === body.category || item.name === body.category,
  )
  const instructor = user.role === 'instructor' ? user : all('users').find((item) => item.role === 'instructor')

  const course = {
    _id: nextId('course'),
    title: stringValue(body.title, 'Untitled course'),
    description: stringValue(body.description),
    categoryId: category?._id || '',
    category: category || null,
    instructorId: body.instructorId || instructor?._id || user._id,
    instructor: summary(instructor || user),
    price: Number(body.price) || 0,
    originalPrice: Number(body.originalPrice) || Number(body.price) || 0,
    level: stringValue(body.level, 'Beginner'),
    status: stringValue(body.status, 'published'),
    duration: body.duration,
    lessonsCount: 0,
    enrolledCount: 0,
    students: 0,
    averageRating: 0,
    ratingInfo: { averageRating: 0, ratingsCount: 0, likesCount: 0, liked: false },
    enrolledStudents: [],
    imageUrl: body.imageUrl || '/images/photo-1522202176988-66273c2fd55f.jpg',
    thumbnail: body.imageUrl || '/images/photo-1522202176988-66273c2fd55f.jpg',
    whatYouWillLearn: Array.isArray(topics) ? topics : [],
    requirements: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  upsertItem('courses', course)
  return enrichCourse(course)
}

const updateCourse = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const stored = byId('courses', captures[0])
  if (!stored) throw httpError(404, 'Course not found.')
  const patch = { ...body }
  delete patch.imageFile
  const category = all('categories').find(
    (item) => item._id === patch.category || item.name === patch.category,
  )
  if (category) patch.categoryId = category._id
  const next = { ...stored, ...patch, updatedAt: new Date().toISOString() }
  upsertItem('courses', next)
  return enrichCourse(next)
}

const updateCourseStatus = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  return enrichCourse(patchItem('courses', captures[0], { status: body.status }))
}

const deleteCourse = ({ captures }) => {
  requireRole('admin', 'instructor')
  removeById('courses', captures[0])
  return { message: 'Course deleted.' }
}

const courseStudents = ({ captures }) => {
  const course = byId('courses', captures[0])
  if (!course) return []
  const ids = course.enrolledStudents || []
  return ids.map((id) => publicUser(byId('users', id))).filter(Boolean)
}

const instructorCourses = ({ captures }) =>
  coursesForInstructor(captures[0]).map(enrichCourse)

const enrolledCourses = () => {
  const user = requireUser()
  return all('enrollments')
    .filter((item) => item.userId === user._id)
    .map((item) => byId('courses', item.courseId))
    .filter(Boolean)
    .map(enrichCourse)
}

const enrollInCourse = ({ captures }) => {
  const user = requireUser()
  const course = byId('courses', captures[0])
  if (!course) throw httpError(404, 'Course not found.')
  return createEnrollment(user._id, course._id)
}

const updateProgress = ({ captures, body }) => {
  const user = requireUser()
  const item = {
    _id: nextId('progress'),
    userId: user._id,
    courseId: captures[0],
    lessonId: body.lessonId,
    progress: Number(body.progress) || 0,
    completed: isTrue(body.completed),
    lastPosition: Number(body.lastPosition) || 0,
    updatedAt: new Date().toISOString(),
  }
  upsertItem('progress', item)
  return item
}

const rateCourse = ({ captures, body }) => {
  requireUser()
  const course = byId('courses', captures[0])
  if (!course) throw httpError(404, 'Course not found.')
  const value = Number(body.value) || 0
  const ratingInfo = {
    ...(course.ratingInfo || {}),
    userRating: value,
    averageRating: course.averageRating || value,
  }
  return enrichCourse(patchItem('courses', course._id, { ratingInfo, averageRating: ratingInfo.averageRating }))
}

const likeCourse = ({ captures }) => {
  const user = requireUser()
  const course = byId('courses', captures[0])
  if (!course) throw httpError(404, 'Course not found.')
  const liked = !course.ratingInfo?.liked
  const likesCount = Math.max(0, (course.likesCount || 0) + (liked ? 1 : -1))
  return enrichCourse(
    patchItem('courses', course._id, {
      likesCount,
      ratingInfo: { ...(course.ratingInfo || {}), liked },
    }),
  )
}

const listLessons = ({ params }) =>
  all('lessons')
    .filter((lesson) => !params.courseId || lesson.courseId === params.courseId)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(enrichLesson)

const getLesson = ({ captures }) => enrichLesson(byId('lessons', captures[0]))

const createLesson = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const lesson = {
    _id: nextId('lesson'),
    courseId: captures[0],
    title: stringValue(body.title, 'New lesson'),
    description: stringValue(body.description),
    content: stringValue(body.content),
    videoUrl: body.videoUrl || body.videoFile?.url || '',
    videoTitle: stringValue(body.videoTitle, stringValue(body.title, 'Lesson video')),
    duration: stringValue(body.duration),
    order: Number(body.order) || all('lessons').length + 1,
    isPublished: body.isPublished !== false,
    isPreview: isTrue(body.isPreview),
    createdAt: new Date().toISOString(),
  }
  upsertItem('lessons', lesson)
  return enrichLesson(lesson)
}

const updateLesson = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  return enrichLesson(patchItem('lessons', captures[0], body))
}

const deleteLesson = ({ captures }) => {
  requireRole('admin', 'instructor')
  removeById('lessons', captures[0])
  return { message: 'Lesson deleted.' }
}

// ---------------------------------------------------------------------------
// Requests
// ---------------------------------------------------------------------------

const listEnrollmentRequests = () =>
  all('enrollmentRequests').map(enrichRequest)

const userEnrollmentRequests = () => {
  const user = requireUser()
  return all('enrollmentRequests')
    .filter((item) => item.userId === user._id)
    .map(enrichRequest)
}

const instructorEnrollmentRequests = () => {
  const user = requireUser()
  const courseIds = coursesForInstructor(user._id).map((item) => item._id)
  return all('enrollmentRequests')
    .filter((item) => courseIds.includes(item.courseId))
    .map(enrichRequest)
}

const createEnrollmentRequest = ({ body }) => {
  const user = requireUser()
  const course = byId('courses', body.courseId)
  if (!course) throw httpError(404, 'Course not found.')
  const request = {
    _id: nextId('er'),
    userId: user._id,
    user: summary(user),
    courseId: course._id,
    course: enrichCourse(course),
    status: 'pending',
    note: stringValue(body.message || body.note),
    paymentMethod: stringValue(body.paymentMethod || body.paymentDetails, 'direct_transfer'),
    transferredAmount: Number(body.transferredAmount) || 0,
    bankName: stringValue(body.bankName),
    referenceNumber: stringValue(body.referenceNumber),
    transferDate: stringValue(body.transferDate),
    proof: body.bankTransferProof || null,
    adminNotes: [],
    createdAt: new Date().toISOString(),
  }
  upsertItem('enrollmentRequests', request)
  return enrichRequest(request)
}

const updateEnrollmentRequest = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const next = patchItem('enrollmentRequests', captures[0], {
    status: body.status,
    adminNote: undefined,
  })
  if (body.adminNote) {
    next.adminNotes = addNote(next.adminNotes, body.adminNote, 'ern')
    upsertItem('enrollmentRequests', next)
  }
  if (body.status === 'approved') {
    createEnrollment(next.userId, next.courseId)
  }
  return enrichRequest(next)
}

const deleteEnrollmentRequest = ({ captures }) => {
  requireRole('admin', 'instructor')
  removeById('enrollmentRequests', captures[0])
  return { message: 'Request deleted.' }
}

const addEnrollmentNote = ({ captures, body }) => {
  const request = byId('enrollmentRequests', captures[0])
  if (!request) throw httpError(404, 'Request not found.')
  return enrichRequest(
    patchItem('enrollmentRequests', request._id, {
      adminNotes: addNote(request.adminNotes, body.note, 'ern'),
    }),
  )
}

const editEnrollmentNote = ({ captures, body }) => {
  const request = byId('enrollmentRequests', captures[0])
  if (!request) throw httpError(404, 'Request not found.')
  return enrichRequest(
    patchItem('enrollmentRequests', request._id, {
      adminNotes: editNote(request.adminNotes, captures[1], body.note),
    }),
  )
}

const deleteEnrollmentNote = ({ captures }) => {
  const request = byId('enrollmentRequests', captures[0])
  if (!request) throw httpError(404, 'Request not found.')
  return enrichRequest(
    patchItem('enrollmentRequests', request._id, {
      adminNotes: (request.adminNotes || []).filter((item) => item._id !== captures[1]),
    }),
  )
}

const enrollmentReceipt = ({ captures }) => ({
  url: '#demo-receipt',
  requestId: captures[0],
})

const listInstructorRequests = () => all('instructorRequests')

const userInstructorRequest = () => {
  const user = requireUser()
  return (
    all('instructorRequests').find((item) => item.userId === user._id) || null
  )
}

const createInstructorRequest = ({ body }) => {
  const user = requireUser()
  const request = {
    _id: nextId('ir'),
    userId: user._id,
    user: summary(user),
    name: stringValue(body.name, user.name),
    email: stringValue(body.email, user.email),
    password: stringValue(body.password),
    field: stringValue(body.field || body.specialization),
    bio: stringValue(body.bio),
    status: 'pending',
    adminNotes: [],
    createdAt: new Date().toISOString(),
  }
  upsertItem('instructorRequests', request)
  return request
}

const updateInstructorRequest = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const next = patchItem('instructorRequests', captures[0], { status: body.status })
  if (body.adminNote) {
    next.adminNotes = addNote(next.adminNotes, body.adminNote, 'irn')
    upsertItem('instructorRequests', next)
  }
  return next
}

const addInstructorNote = ({ captures, body }) => {
  const request = byId('instructorRequests', captures[0])
  if (!request) throw httpError(404, 'Request not found.')
  return patchItem('instructorRequests', request._id, {
    adminNotes: addNote(request.adminNotes, body.adminNote || body.note, 'irn'),
  })
}

const editInstructorNote = ({ captures, body }) => {
  const request = byId('instructorRequests', captures[0])
  if (!request) throw httpError(404, 'Request not found.')
  return patchItem('instructorRequests', request._id, {
    adminNotes: editNote(request.adminNotes, captures[1], body.note),
  })
}

const deleteInstructorNote = ({ captures }) => {
  const request = byId('instructorRequests', captures[0])
  if (!request) throw httpError(404, 'Request not found.')
  return patchItem('instructorRequests', request._id, {
    adminNotes: (request.adminNotes || []).filter((item) => item._id !== captures[1]),
  })
}

const deleteInstructorRequest = ({ captures }) => {
  requireRole('admin', 'instructor')
  removeById('instructorRequests', captures[0])
  return { message: 'Request deleted.' }
}

// ---------------------------------------------------------------------------
// Course interactions
// ---------------------------------------------------------------------------

const getInteractions = ({ captures }) => enrichInteraction(ensureInteraction(captures[0]))

const addComment = ({ captures, body }) => {
  const user = requireUser()
  return updateInteraction(captures[0], (interaction) => {
    const comment = {
      _id: nextId('comment'),
      user: summary(user),
      content: stringValue(body.content),
      lesson: body.lessonId || '',
      lessonId: body.lessonId || '',
      createdAt: new Date().toISOString(),
      replies: [],
    }
    if (body.parentCommentId) {
      interaction.comments = interaction.comments.map((item) =>
        item._id === body.parentCommentId
          ? { ...item, replies: [...(item.replies || []), comment] }
          : item,
      )
    } else {
      interaction.comments = [comment, ...(interaction.comments || [])]
    }
    return interaction
  })
}

const editComment = ({ captures, body }) =>
  updateInteraction(captures[0], (interaction) => {
    const mapComment = (comment) => {
      if (comment._id === captures[1]) return { ...comment, content: stringValue(body.content) }
      return {
        ...comment,
        replies: (comment.replies || []).map((reply) =>
          reply._id === (body.replyId || captures[1])
            ? { ...reply, content: stringValue(body.content) }
            : reply,
        ),
      }
    }
    interaction.comments = (interaction.comments || []).map(mapComment)
    return interaction
  })

const deleteComment = ({ captures, body }) =>
  updateInteraction(captures[0], (interaction) => {
    interaction.comments = (interaction.comments || []).filter(
      (comment) => comment._id !== captures[1],
    )
    if (body.replyId) {
      interaction.comments = interaction.comments.map((comment) => ({
        ...comment,
        replies: (comment.replies || []).filter((reply) => reply._id !== body.replyId),
      }))
    }
    return interaction
  })

const addTest = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const source = body.formData || body
  const file = source.questionFile || source.file || { filename: 'questions.pdf', url: '#demo-questions' }
  return updateInteraction(captures[0], (interaction) => {
    interaction.tests = [
      {
        _id: nextId('test'),
        title: stringValue(source.title, 'New test'),
        description: stringValue(source.description),
        dueDate: source.dueDate || new Date(Date.now() + 7 * 86400000).toISOString(),
        totalMarks: Number(source.totalMarks) || 100,
        questionFile: file,
        fileUrl: file.url || '#demo-questions',
        answerKey: { filename: 'answer-key.pdf', url: '#demo-answer-key' },
        submissions: [],
        createdAt: new Date().toISOString(),
      },
      ...(interaction.tests || []),
    ]
    return interaction
  })
}

const updateTest = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const source = body.formData || body
  return updateInteraction(captures[0], (interaction) => {
    interaction.tests = (interaction.tests || []).map((test) =>
      test._id === captures[1] ? { ...test, ...source, _id: test._id } : test,
    )
    return interaction
  })
}

const deleteTest = ({ captures }) => {
  requireRole('admin', 'instructor')
  return updateInteraction(captures[0], (interaction) => {
    interaction.tests = (interaction.tests || []).filter((test) => test._id !== captures[1])
    return interaction
  })
}

const submitTestAnswer = ({ captures, body }) => {
  const user = requireUser()
  return updateInteraction(captures[0], (interaction) => {
    interaction.tests = (interaction.tests || []).map((test) => {
      if (test._id !== captures[1]) return test
      const submission = {
        _id: nextId('submission'),
        student: summary(user),
        studentId: user._id,
        submittedAt: new Date().toISOString(),
        answerFile: body.answerFile || { filename: 'answers.pdf', url: '#demo-answers' },
        status: 'submitted',
      }
      return {
        ...test,
        submissions: [submission, ...(test.submissions || []).filter(
          (item) => item.studentId !== user._id,
        )],
      }
    })
    return interaction
  })
}

const uploadAnswerKey = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const source = body.answerKeyFile || body.file || body
  return updateInteraction(captures[0], (interaction) => {
    interaction.tests = (interaction.tests || []).map((test) =>
      test._id === captures[1]
        ? {
            ...test,
            answerKey: source.answerKeyFile || source.file || {
              filename: 'answer-key.pdf',
              url: '#demo-answer-key',
            },
          }
        : test,
    )
    return interaction
  })
}

const downloadAnswerKey = ({ captures }) => ({
  downloadUrl: `/api/course-interactions/${captures[0]}/tests/${captures[1]}/answer-key/download`,
})

const deleteTestAnswer = ({ captures }) =>
  updateInteraction(captures[0], (interaction) => {
    interaction.tests = (interaction.tests || []).map((test) => ({
      ...test,
      submissions: (test.submissions || []).filter((item) => item._id !== captures[2]),
    }))
    return interaction
  })

const gradeTestSubmission = ({ captures, body }) =>
  updateInteraction(captures[0], (interaction) => {
    interaction.tests = (interaction.tests || []).map((test) => ({
      ...test,
      submissions: (test.submissions || []).map((submission) =>
        submission._id === captures[2]
          ? {
              ...submission,
              grade: Number(body.grade) || 0,
              feedback: stringValue(body.feedback),
              status: 'graded',
            }
          : submission,
      ),
    }))
    return interaction
  })

const addAttachment = ({ captures, body }) => {
  const user = requireUser()
  const file = body.file || { filename: 'attachment.pdf', url: '#demo-file' }
  return updateInteraction(captures[0], (interaction) => {
    interaction.attachments = [
      {
        _id: nextId('attachment'),
        title: stringValue(body.title, 'Course attachment'),
        description: stringValue(body.description),
        file,
        fileUrl: file.url || '#demo-file',
        lesson: body.lessonId || '',
        lessonId: body.lessonId || '',
        uploadedBy: summary(user),
        createdAt: new Date().toISOString(),
      },
      ...(interaction.attachments || []),
    ]
    return interaction
  })
}

const editAttachment = ({ captures, body }) =>
  updateInteraction(captures[0], (interaction) => {
    interaction.attachments = (interaction.attachments || []).map((attachment) =>
      attachment._id === captures[1]
        ? {
            ...attachment,
            title: stringValue(body.title, attachment.title),
            description: stringValue(body.description, attachment.description),
            lessonId: body.lessonId || attachment.lessonId,
          }
        : attachment,
    )
    return interaction
  })

const deleteAttachment = ({ captures }) =>
  updateInteraction(captures[0], (interaction) => {
    interaction.attachments = (interaction.attachments || []).filter(
      (attachment) => attachment._id !== captures[1],
    )
    return interaction
  })

// ---------------------------------------------------------------------------
// Live sessions
// ---------------------------------------------------------------------------

const filteredSessions = (params, user) => {
  let sessions = all('liveSessions')
  if (params.courseId) {
    sessions = sessions.filter((item) => item.courseId === params.courseId)
  }
  if (params.status) {
    sessions = sessions.filter((item) => item.status === params.status)
  }
  if (isTrue(params.upcoming)) {
    sessions = sessions.filter(
      (item) => new Date(item.scheduledAt).getTime() >= Date.now(),
    )
  }
  if (user?.role === 'instructor') {
    sessions = sessions.filter((item) => item.instructorId === user._id)
  }
  if (user?.role === 'student') {
    sessions = sessions.filter((item) => (item.studentIds || []).includes(user._id))
  }
  return sessions
    .sort((a, b) => String(a.scheduledAt).localeCompare(String(b.scheduledAt)))
    .map(enrichSession)
}

const listCourseSessions = ({ captures, params }) =>
  sessionsEnvelope(filteredSessions({ ...params, courseId: captures[0] }, currentUser()))

const listInstructorSessions = ({ params }) => {
  const user = requireRole('admin', 'instructor')
  return sessionsEnvelope(filteredSessions(params, user))
}

const listStudentSessions = ({ params }) => {
  const user = requireUser()
  return sessionsEnvelope(filteredSessions(params, user))
}

const listAllSessions = ({ params }) =>
  sessionsEnvelope(filteredSessions(params, requireRole('admin')))

const createSession = ({ body }) => {
  const user = requireRole('admin', 'instructor')
  const session = {
    _id: nextId('session'),
    title: stringValue(body.title, 'New live session'),
    description: stringValue(body.description),
    courseId: body.courseId,
    instructorId: body.instructorId || user._id,
    studentIds: Array.isArray(body.studentIds) ? body.studentIds : [],
    scheduledAt:
      body.scheduledAt || body.scheduledDate || new Date(Date.now() + 86400000).toISOString(),
    duration: Number(body.duration) || 60,
    status: stringValue(body.status, 'scheduled'),
    maxParticipants: Number(body.maxParticipants) || 50,
    zoomJoinUrl: '#demo-meeting',
    zoomStartUrl: '#demo-host',
    meetingUrl: '#demo-meeting',
    recordingUrl: '#demo-recording',
    createdAt: new Date().toISOString(),
  }
  upsertItem('liveSessions', session)
  return enrichSession(session)
}

const sessionById = ({ captures }) => enrichSession(byId('liveSessions', captures[0]))

const updateSession = ({ captures, body }) => {
  requireRole('admin', 'instructor')
  const patch = { ...body }
  delete patch.sessionId
  if (patch.scheduledDate && !patch.scheduledAt) patch.scheduledAt = patch.scheduledDate
  return enrichSession(patchItem('liveSessions', captures[0], patch))
}

const deleteSession = ({ captures }) => {
  requireRole('admin', 'instructor')
  removeById('liveSessions', captures[0])
  return { message: 'Session deleted.' }
}

const joinSession = ({ captures }) => {
  const session = patchItem('liveSessions', captures[0], {
    status: 'live',
    joinedAt: new Date().toISOString(),
  })
  return {
    zoomJoinUrl: session.zoomJoinUrl || '#demo-meeting',
    meetingUrl: session.meetingUrl || '#demo-meeting',
    session: enrichSession(session),
  }
}

const startSession = ({ captures }) => {
  const session = patchItem('liveSessions', captures[0], {
    status: 'live',
    startedAt: new Date().toISOString(),
  })
  return {
    zoomStartUrl: session.zoomStartUrl || '#demo-host',
    zoomJoinUrl: session.zoomJoinUrl || '#demo-meeting',
    session: enrichSession(session),
  }
}

const endSession = ({ captures }) => {
  const session = patchItem('liveSessions', captures[0], {
    status: 'completed',
    endedAt: new Date().toISOString(),
  })
  return enrichSession(session)
}

const leaveSession = ({ captures }) =>
  patchItem('liveSessions', captures[0], { leftAt: new Date().toISOString() })

const cancelSession = ({ captures }) =>
  enrichSession(patchItem('liveSessions', captures[0], { status: 'cancelled' }))

const uploadRecording = ({ captures, body }) => {
  const recordingData = body.recordingData || body
  return enrichSession(
    patchItem('liveSessions', captures[0], {
      recordingUrl: recordingData.recordingUrl || '#demo-recording',
      recordingPassword: recordingData.recordingPassword || 'demo',
      isRecordingPublic: isTrue(recordingData.isRecordingPublic),
      status: 'completed',
    }),
  )
}

// ---------------------------------------------------------------------------
// Grades, certificates, notifications, messages
// ---------------------------------------------------------------------------

const studentGrades = () => {
  const user = requireUser()
  const grades = all('grades')
    .filter((item) => item.studentId === user._id)
    .map(enrichGrade)
  return {
    courseGrades: grades,
    grades,
    overallGPA: grades.length
      ? Number(
          (
            grades.reduce((sum, item) => sum + (item.summary?.finalPercentage || 0), 0) /
            grades.length
          ).toFixed(2),
        )
      : 0,
    totalCourses: grades.length,
  }
}

const studentCourseGrades = ({ captures }) => {
  const user = requireUser()
  return (
    all('grades').find(
      (item) => item.studentId === user._id && item.courseId === captures[0],
    ) || null
  )
}

const courseGrades = ({ captures }) => {
  const grades = all('grades')
    .filter((item) => item.courseId === captures[0])
    .map(enrichGrade)
  return {
    studentGrades: grades,
    grades,
    statistics: {
      average: grades.length
        ? Math.round(
            grades.reduce((sum, item) => sum + (item.summary?.finalPercentage || 0), 0) /
              grades.length,
          )
        : 0,
      totalStudents: grades.length,
    },
  }
}

const courseTests = ({ captures }) => {
  const tests = ensureInteraction(captures[0]).tests || []
  return {
    tests,
    progressTests: tests.filter((item) => item.type === 'progress'),
    finalTests: tests.filter((item) => item.type !== 'progress'),
  }
}

const createFinalGrade = ({ body }) => {
  requireRole('admin', 'instructor')
  const percentage = Number(body.percentage) || 0
  const grade = {
    _id: nextId('grade'),
    studentId: body.studentId,
    courseId: body.courseId,
    finalGrade: {
      finalGrade: {
        percentage,
        letter: percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D',
      },
      gradedAt: new Date().toISOString(),
    },
    testGrades: [],
    summary: { testAverage: percentage, finalPercentage: percentage },
    comments: stringValue(body.comments),
    feedback: stringValue(body.feedback),
  }
  upsertItem('grades', grade)
  return enrichGrade(grade)
}

const createTestGrade = ({ body }) => {
  requireRole('admin', 'instructor')
  const earned = Number(body.earnedPoints) || 0
  const total = Number(body.totalPoints) || 100
  const percentage = Math.round((earned / total) * 100)
  let grade = all('grades').find(
    (item) => item.studentId === body.studentId && item.courseId === body.courseId,
  )
  if (!grade) {
    grade = {
      _id: nextId('grade'),
      studentId: body.studentId,
      courseId: body.courseId,
      finalGrade: { finalGrade: { percentage, letter: 'B' }, gradedAt: new Date().toISOString() },
      testGrades: [],
      summary: { testAverage: percentage, finalPercentage: percentage },
    }
  }
  grade.testGrades = [
    ...(grade.testGrades || []).filter((item) => item.testId !== body.testId),
    {
      testId: body.testId,
      testGrade: {
        weight: total,
        percentage,
        earnedPoints: earned,
        totalPoints: total,
        comments: body.comments,
        feedback: body.feedback,
      },
      gradedAt: new Date().toISOString(),
    },
  ]
  upsertItem('grades', grade)
  return enrichGrade(grade)
}

const deleteGrade = ({ captures }) => {
  requireRole('admin', 'instructor')
  removeById('grades', captures[0])
  return { message: 'Grade deleted.' }
}

const studentCertificates = () => {
  const user = requireUser()
  return {
    certificates: all('certificates')
      .filter((item) => item.studentId === user._id)
      .map((item) => {
        const course = byId('courses', item.courseId)
        const instructorId =
          item.course?.instructorId ||
          item.instructorId ||
          course?.instructorId ||
          course?.instructor?._id
        return {
          ...clone(item),
          status: 'issued',
          issuedDate: item.issuedAt || item.issuedDate,
          instructor:
            summary(byId('users', instructorId)) ||
            item.course?.instructor ||
            course?.instructor ||
            null,
          downloadCount: item.downloadCount || 0,
        }
      }),
  }
}

const courseCertificates = ({ captures }) => ({
  certificates: all('certificates').filter((item) => item.courseId === captures[0]),
})

const courseCertificateStudents = ({ captures }) => {
  const course = byId('courses', captures[0])
  const ids = course?.enrolledStudents || []
  const students = ids.map((id) => {
    const user = byId('users', id)
    const certificate = all('certificates').find(
      (item) => item.courseId === captures[0] && item.studentId === id,
    )
    return user
      ? { ...summary(user), hasCertificate: Boolean(certificate), certificateId: certificate?._id }
      : null
  })
  return { students: students.filter(Boolean) }
}

const uploadCertificate = ({ body }) => {
  requireRole('admin', 'instructor')
  const file = body.formData?.certificate || body.certificate || {
    filename: 'certificate.pdf',
    url: '#demo-certificate',
  }
  const certificate = {
    _id: nextId('cert'),
    studentId: stringValue(body.studentId || body.formData?.studentId),
    courseId: stringValue(body.courseId || body.formData?.courseId),
    certificateUrl: file.url || '#demo-certificate',
    issuedAt: new Date().toISOString(),
  }
  upsertItem('certificates', certificate)
  return certificate
}

const deleteCertificate = ({ captures }) => {
  requireRole('admin', 'instructor')
  removeById('certificates', captures[0])
  return { message: 'Certificate deleted.' }
}

const downloadCertificate = ({ captures }) => ({
  url: `/api/certificates/${captures[0]}/download`,
  downloadUrl: `/api/certificates/${captures[0]}/download`,
})

const notifications = ({ params }) => {
  const user = requireUser()
  let items = all('notifications').filter((item) => item.userId === user._id)
  if (params.type) items = items.filter((item) => item.type === params.type)
  if (params.isRead !== undefined) {
    items = items.filter((item) => isTrue(item.isRead) === isTrue(params.isRead))
  }
  return notificationView(
    [...items].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))),
  )
}

const unreadCount = () => {
  const user = requireUser()
  return {
    unreadCount: all('notifications').filter(
      (item) => item.userId === user._id && !item.isRead,
    ).length,
  }
}

const markNotificationRead = ({ captures }) =>
  patchItem('notifications', captures[0], { isRead: true })

const markAllNotificationsRead = () => {
  const user = requireUser()
  const next = all('notifications').map((item) =>
    item.userId === user._id ? { ...item, isRead: true } : item,
  )
  writeCollection('notifications', next)
  return { message: 'All notifications marked as read.' }
}

const deleteNotification = ({ captures }) => {
  removeById('notifications', captures[0])
  return { message: 'Notification deleted.' }
}

const viewUser = (id) => summary(byId('users', id))

const conversations = () => {
  const user = requireUser()
  const messages = all('messages').filter(
    (item) => item.senderId === user._id || item.receiverId === user._id,
  )
  const groups = new Map()
  messages.forEach((message) => {
    const otherId =
      message.senderId === user._id ? message.receiverId : message.senderId
    const key = `${otherId}:${message.courseId || ''}`
    if (!groups.has(key)) {
      groups.set(key, {
        _id: key,
        otherUser: viewUser(otherId),
        course: byId('courses', message.courseId) || null,
        messages: [],
        lastMessage: null,
        unreadCount: 0,
      })
    }
    const group = groups.get(key)
    group.messages.push(message)
    group.lastMessage = message
    if (message.receiverId === user._id && !message.isRead) group.unreadCount += 1
  })
  return [...groups.values()].map((group) => ({
    ...group,
    course: group.course ? [enrichCourse(group.course)] : [],
    messages: group.messages.sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt))),
  }))
}

const messageInstructors = () => {
  requireUser()
  return all('users')
    .filter((item) => item.role === 'instructor')
    .map((item) => ({
      ...publicUser(item),
      courses: coursesForInstructor(item._id).map(enrichCourse),
    }))
}

const conversation = ({ captures }) => {
  const user = requireUser()
  return all('messages')
    .filter(
      (item) =>
        (item.senderId === user._id && item.receiverId === captures[0]) ||
        (item.receiverId === user._id && item.senderId === captures[0]),
    )
    .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)))
}

const sendMessage = ({ body }) => {
  const user = requireUser()
  const message = {
    _id: nextId('msg'),
    senderId: user._id,
    receiverId: body.receiverId,
    courseId: body.courseId || '',
    subject: stringValue(body.subject, 'Message'),
    content: stringValue(body.content),
    messageType: stringValue(body.messageType, 'course_related'),
    priority: stringValue(body.priority, 'normal'),
    isRead: false,
    createdAt: new Date().toISOString(),
  }
  upsertItem('messages', message)
  return message
}

const markMessageRead = ({ captures }) =>
  patchItem('messages', captures[0], { isRead: true })

const deleteMessage = ({ captures }) => {
  removeById('messages', captures[0])
  return { message: 'Message deleted.' }
}

const messagesUnreadCount = () => {
  const user = requireUser()
  return {
    unreadCount: all('messages').filter(
      (item) => item.receiverId === user._id && !item.isRead,
    ).length,
  }
}

const searchMessages = ({ params }) => {
  const user = requireUser()
  const query = stringValue(params.q).toLowerCase()
  return all('messages')
    .filter(
      (item) =>
        (item.senderId === user._id || item.receiverId === user._id) &&
        (!query || stringValue(item.content).toLowerCase().includes(query)),
    )
    .filter((item) => !params.courseId || item.courseId === params.courseId)
}

// ---------------------------------------------------------------------------
// Payments, billing, payouts, refunds
// ---------------------------------------------------------------------------

const initiatePayment = ({ body }) => {
  const user = requireUser()
  const course = byId('courses', body.courseId)
  const amount = Number(body.amount) || course?.price || 0
  const payment = {
    _id: nextId('pay'),
    userId: user._id,
    courseId: body.courseId,
    amount,
    finalAmount: amount,
    status: 'pending',
    method: stringValue(body.method, 'direct_transfer'),
    transactionId: `DEMO-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  upsertItem('payments', payment)
  return {
    ...clone(payment),
    paymentId: payment._id,
    course: course ? enrichCourse(course) : null,
    paymentDetails: bankDetails().paymentDetails,
  }
}

const submitDirectTransfer = ({ captures, body }) => {
  const payment = patchItem('payments', captures[0], {
    status: 'pending',
    method: 'direct_transfer',
    receipt: body.receipt || null,
    note: stringValue(body.note),
  })
  if (payment.courseId) {
    const user = requireUser()
    upsertItem('enrollmentRequests', {
      _id: nextId('er'),
      userId: user._id,
      user: summary(user),
      courseId: payment.courseId,
      status: 'pending',
      note: 'Direct bank transfer payment submitted.',
      paymentMethod: 'direct_transfer',
      adminNotes: [],
      createdAt: new Date().toISOString(),
    })
  }
  return enrichPayment(payment)
}

const myPayments = () => {
  const user = requireUser()
  return all('payments').filter((item) => item.userId === user._id).map(enrichPayment)
}

const paymentById = ({ captures }) => enrichPayment(byId('payments', captures[0]))

const paymentReceipt = ({ captures }) => ({
  _id: captures[0],
  receiptUrl: '#demo-receipt',
})

const csrfToken = () => ({ csrfToken: 'demo-csrf-token' })

const paymentStats = () => {
  const payments = all('payments')
  return {
    totalRevenue: payments.reduce((sum, item) => sum + (item.finalAmount || 0), 0),
    totalPayments: payments.length,
    totalAdminFees: Math.round(payments.length * 4),
    totalInstructorPayments: Math.round(payments.length * 60),
    recentPayments: payments.slice(0, 10).map(enrichPayment),
    paymentMethodStats: { 'credit card': 2, paypal: 1, 'bank transfer': 2 },
  }
}

const paymentReports = () => ({
  ...paymentStats(),
  settings: { paymentSettings: readSetting('adminSettings', {}) },
})

const paymentBreakdown = ({ captures }) => {
  const payments = all('payments').filter((item) => item.courseId === captures[0])
  return {
    courseId: captures[0],
    total: payments.reduce((sum, item) => sum + (item.finalAmount || 0), 0),
    payments: payments.map(enrichPayment),
  }
}

const pendingTransfers = () =>
  all('payments').filter((item) => item.status === 'pending').map(enrichPayment)

const approvePayment = ({ captures, body }) =>
  enrichPayment(
    patchItem('payments', captures[0], {
      status: body.approved === false ? 'rejected' : 'paid',
      adminNote: stringValue(body.adminNote),
    }),
  )

const instructorApprovePayment = ({ captures, body }) =>
  enrichPayment(patchItem('payments', captures[0], { instructorNote: stringValue(body.note) }))

const createPayment = ({ body }) => {
  const payment = {
    _id: nextId('pay'),
    userId: body.userId || currentUser()?._id,
    courseId: body.courseId,
    amount: Number(body.amount) || 0,
    finalAmount: Number(body.amount) || 0,
    status: stringValue(body.status, 'paid'),
    method: stringValue(body.method, 'direct'),
    createdAt: new Date().toISOString(),
  }
  upsertItem('payments', payment)
  return enrichPayment(payment)
}

const userBills = () => {
  const user = requireUser()
  const payments = all('payments')
    .filter((item) => item.userId === user._id)
    .map(enrichPayment)
  return { bills: payments, payments }
}

const payFromCredits = ({ body }) => {
  const user = requireUser()
  const account = billingFor(user._id)
  const amount = Number(body.amount) || 0
  if ((account.balance || 0) < amount) {
    throw httpError(400, 'Not enough demo credit balance.')
  }
  upsertItem('billingAccounts', { ...account, balance: account.balance - amount })
  upsertItem('billingTransactions', {
    _id: nextId('txn'),
    userId: user._id,
    type: 'debit',
    amount,
    description: stringValue(body.description, 'Paid from credit balance'),
    status: 'completed',
    createdAt: new Date().toISOString(),
  })
  return { success: true, balance: account.balance - amount }
}

const billingAccount = () =>
  customEnvelope(
    ok(buildBillingData(requireUser()._id), 'Billing account loaded.', {
      billingAccount: billingFor(requireUser()._id),
      config: { creditLimit: 1000, annualFee: 0 },
    }),
  )

const billingTransactions = ({ params }) => {
  const user = requireUser()
  const transactions = all('billingTransactions')
    .filter((item) => item.userId === user._id)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
  const paged = paginate(transactions, params)
  return {
    ...paged.meta,
    transactions: paged.data,
    recentTransactions: paged.data,
    data: { transactions: paged.data, ...paged.meta },
  }
}

const giftCardBalance = () => {
  const user = requireUser()
  return all('giftCards')
    .filter((item) => !item.userId || item.userId === user._id)
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
}

const billingAdminDashboard = () => {
  requireRole('admin')
  const transactions = all('billingTransactions')
  return {
    adminAccount: billingFor(DEMO_ADMIN_ID),
    recentTransactions: transactions.slice(0, 10),
    earnings: paymentStats(),
    summary: {
      totalRevenue: paymentStats().totalRevenue,
      totalCommission: transactions.length * 5,
      totalInstructorAmount: transactions.length * 50,
      totalSales: all('payments').length,
    },
  }
}

const billingAdminAccount = () => {
  requireRole('admin')
  const account = billingFor(DEMO_ADMIN_ID)
  return { ...account, adminAccount: account, data: account }
}

const billingSummary = (role) => {
  const user = requireUser()
  const data = buildBillingData(user._id)
  if (role === 'admin') return billingAdminDashboard().summary
  if (role === 'instructor') {
    return {
      ...data.summary,
      totalCommissionEarned: data.totalEarnings,
      pendingCommissions: data.pendingAmount,
      annualFees: data.annualFees,
      courseSales: data.coursePurchases,
    }
  }
  return {
    ...data.summary,
    totalSpent: data.coursePurchases.reduce((sum, item) => sum + (item.purchaseAmount || 0), 0),
    coursePurchases: data.coursePurchases,
  }
}

const billingInitiate = ({ body }) => ({
  paymentId: nextId('billing-pay'),
  amount: Number(body.amount) || 0,
  method: stringValue(body.method, 'direct'),
  status: 'pending',
})

const billingPay = ({ body }) => {
  const user = requireUser()
  const account = billingFor(user._id)
  const amount = Number(body.amount) || 0
  upsertItem('billingAccounts', { ...account, balance: (account.balance || 0) + amount })
  upsertItem('billingTransactions', {
    _id: nextId('txn'),
    userId: user._id,
    type: 'credit',
    amount,
    description: stringValue(body.description, 'Billing top-up'),
    status: 'completed',
    createdAt: new Date().toISOString(),
  })
  return { success: true, balance: (account.balance || 0) + amount }
}

const billingDirectTransfer = ({ captures, body }) =>
  enrichPayment(
    patchItem('payments', captures[0], {
      status: 'pending',
      method: 'direct_transfer',
      receiptData: body.receiptData || null,
    }),
  )

const billingNotifications = () => notificationView(all('notifications').filter((item) => item.userId === currentUser()?._id))

const giftCards = ({ params }) => {
  let items = all('giftCards')
  if (params.giftCardType) {
    items = items.filter((item) => item.giftCardType === params.giftCardType)
  }
  if (params.isActive !== undefined) {
    items = items.filter((item) => isTrue(item.isActive) === isTrue(params.isActive))
  }
  return items
}

const createGiftCard = ({ body }) => {
  requireRole('admin')
  const card = {
    _id: nextId('gift'),
    code: stringValue(body.code, `MENTORA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`),
    amount: Number(body.amount) || 0,
    giftCardType: stringValue(body.giftCardType, 'credit'),
    isActive: body.isActive !== false,
    userId: stringValue(body.userId),
    createdAt: new Date().toISOString(),
  }
  upsertItem('giftCards', card)
  return card
}

const updateGiftCard = ({ captures, body }) => {
  requireRole('admin')
  return patchItem('giftCards', captures[0], body)
}

const deleteGiftCard = ({ captures }) => {
  requireRole('admin')
  removeById('giftCards', captures[0])
  return { message: 'Gift card deleted.' }
}

const claimGiftCard = ({ captures }) => {
  const user = requireUser()
  const card = byId('giftCards', captures[0])
  if (!card) throw httpError(404, 'Gift card not found.')
  const next = { ...card, userId: user._id, isActive: true }
  upsertItem('giftCards', next)
  const account = billingFor(user._id)
  upsertItem('billingAccounts', {
    ...account,
    balance: (account.balance || 0) + (card.amount || 0),
  })
  return next
}

const payoutRequests = () => all('payoutRequests')

const myPayoutRequests = () => {
  const user = requireUser()
  return all('payoutRequests').filter((item) => item.instructorId === user._id)
}

const createPayoutRequest = ({ body }) => {
  const user = requireUser()
  const request = {
    _id: nextId('payout'),
    instructorId: body.instructorId || user._id,
    amount: Number(body.amount) || 0,
    status: 'pending',
    method: stringValue(body.method, 'Bank transfer'),
    createdAt: new Date().toISOString(),
  }
  upsertItem('payoutRequests', request)
  return request
}

const payoutStats = () => {
  const requests = all('payoutRequests')
  return {
    totalRequests: requests.length,
    pendingRequests: requests.filter((item) => item.status === 'pending').length,
    approvedRequests: requests.filter((item) => item.status === 'approved').length,
    completedRequests: requests.filter((item) => item.status === 'completed').length,
    totalAmount: requests.reduce((sum, item) => sum + (item.amount || 0), 0),
  }
}

const payoutByStatus = ({ captures }) =>
  all('payoutRequests').filter((item) => item.status === captures[0])

const approvePayout = ({ captures, body }) => {
  requireRole('admin')
  return patchItem('payoutRequests', captures[0], {
    status: 'approved',
    approvedAmount: Number(body.approvedAmount) || undefined,
    adminNotes: stringValue(body.adminNotes),
  })
}

const rejectPayout = ({ captures, body }) => {
  requireRole('admin')
  return patchItem('payoutRequests', captures[0], {
    status: 'rejected',
    adminNotes: stringValue(body.adminNotes),
  })
}

const processPayout = ({ captures, body }) => {
  requireRole('admin')
  return patchItem('payoutRequests', captures[0], {
    status: 'completed',
    transactionReference: stringValue(body.transactionReference),
    adminNotes: stringValue(body.adminNotes),
  })
}

const cancelPayout = ({ captures }) =>
  patchItem('payoutRequests', captures[0], { status: 'cancelled' })

const processInstructorPayout = ({ body }) => {
  requireRole('admin')
  const request = {
    _id: nextId('payout'),
    instructorId: stringValue(body.instructorId),
    amount: Number(body.amount) || 0,
    status: 'completed',
    method: 'Bank transfer',
    transactionReference: stringValue(body.transactionReference),
    notes: stringValue(body.notes),
    createdAt: new Date().toISOString(),
  }
  upsertItem('payoutRequests', request)
  return request
}

const refundView = (items) => ({
  refunds: items,
  requests: items,
  stats: {
    pending: items.filter((item) => item.status === 'pending').length,
    approved: items.filter((item) => item.status === 'approved').length,
    rejected: items.filter((item) => item.status === 'rejected').length,
    totalRefunded: items
      .filter((item) => item.status === 'approved')
      .reduce((sum, item) => sum + (item.amount || item.requestedAmount || 0), 0),
  },
})

const studentRefunds = () => {
  const user = requireUser()
  return refundView(all('refunds').filter((item) => item.userId === user._id))
}

const instructorRefunds = () => {
  const user = requireUser()
  return refundView(all('refunds').filter((item) => item.userId === user._id))
}

const adminRefunds = ({ params }) => {
  requireRole('admin')
  let items = all('refunds')
  if (params.status) items = items.filter((item) => item.status === params.status)
  if (params.refundType) items = items.filter((item) => item.type === params.refundType)
  if (params.requesterType) {
    items = items.filter((item) => {
      const requester = byId('users', item.userId)
      return requester?.role === params.requesterType || item.type === params.requesterType
    })
  }
  return refundView(items)
}

const createStudentRefund = ({ body }) => {
  const user = requireUser()
  const refund = {
    _id: nextId('refund'),
    userId: user._id,
    user: summary(user),
    type: 'course',
    courseId: stringValue(body.courseId),
    paymentId: stringValue(body.paymentId),
    amount: Number(body.requestedAmount) || 0,
    requestedAmount: Number(body.requestedAmount) || 0,
    originalAmount: Number(body.originalAmount) || Number(body.requestedAmount) || 0,
    reason: stringValue(body.reason),
    description: stringValue(body.description),
    status: 'pending',
    relatedCourse: byId('courses', body.courseId) || null,
    requesterType: 'student',
    requesterName: user.name,
    refundType: 'course',
    createdAt: new Date().toISOString(),
  }
  upsertItem('refunds', refund)
  return refund
}

const createInstructorRefund = ({ body }) => {
  const user = requireUser()
  const refund = {
    _id: nextId('refund'),
    userId: user._id,
    user: summary(user),
    type: 'admin_fee',
    refundType: 'admin_fee',
    requesterType: 'instructor',
    requesterName: user.name,
    amount: Number(body.requestedAmount) || 0,
    requestedAmount: Number(body.requestedAmount) || 0,
    originalAmount: Number(body.requestedAmount) || 0,
    reason: stringValue(body.reason),
    description: stringValue(body.description),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  upsertItem('refunds', refund)
  return refund
}

const updateRefund = ({ captures, body }) => {
  requireRole('admin')
  return patchItem('refunds', captures[0], {
    status: body.status || (body.adminNotes ? 'approved' : undefined),
    adminNotes: body.adminNotes
      ? addNote(byId('refunds', captures[0])?.adminNotes, body.adminNotes, 'refund-note')
      : undefined,
  })
}

const cancelRefund = ({ captures }) =>
  patchItem('refunds', captures[0], { status: 'cancelled' })

const refundStats = ({ params }) => adminRefunds({ params }).stats

const refundById = ({ captures }) => byId('refunds', captures[0])

// ---------------------------------------------------------------------------
// Settings, reports, video, mail, password, bulk delete
// ---------------------------------------------------------------------------

const defaultPaymentSettings = {
  instructorAnnualFee: 0,
  studentAdminFee: 0,
  globalDeductionPercentage: 0,
  stripeEnabled: true,
  paypalEnabled: true,
  directTransferEnabled: true,
  minimumPaymentAmount: 1,
  currency: 'USD',
  autoEnrollOnCardPayment: true,
  autoEnrollOnPaypalPayment: true,
  requireAdminApprovalForDirectTransfer: true,
}

const withPaymentSettings = (settings) => ({
  ...settings,
  paymentSettings: { ...defaultPaymentSettings, ...(settings.paymentSettings || {}) },
})

const getAdminSettings = () => {
  requireRole('admin')
  return withPaymentSettings(readSetting('adminSettings', {}))
}

const updateAdminSettings = ({ body }) => {
  requireRole('admin')
  const next = withPaymentSettings({ ...readSetting('adminSettings', {}), ...body })
  writeSetting('adminSettings', next)
  return next
}

const updatePaymentSettings = ({ body }) => {
  requireRole('admin')
  const settings = withPaymentSettings(readSetting('adminSettings', {}))
  const next = {
    ...settings,
    paymentSettings: { ...settings.paymentSettings, ...body },
    payment: { ...(settings.payment || {}), ...body },
  }
  writeSetting('adminSettings', next)
  return next.paymentSettings
}

const resetPaymentSettings = () => {
  requireRole('admin')
  const settings = readSetting('adminSettings', {})
  const next = {
    ...settings,
    paymentSettings: { ...defaultPaymentSettings },
    payment: {
      stripeEnabled: true,
      paypalEnabled: true,
      bankTransferEnabled: true,
      testMode: true,
      currency: 'USD',
      platformFeePercent: 15,
    },
  }
  writeSetting('adminSettings', next)
  return next.paymentSettings
}

const paymentStatsForSettings = () => ({
  totalProcessed: all('payments').length,
  successful: all('payments').filter((item) => item.status === 'paid').length,
  failed: 0,
  revenue: paymentStats().totalRevenue,
})

const testGateway = ({ body }) => ({
  gateway: stringValue(body.gateway, 'stripe'),
  connected: true,
  message: 'Demo gateway connection successful.',
})

const sendMail = ({ body }) => ({
  message: 'Thanks for contacting Mentora. This is a demo, so no email was sent.',
  data: { ...body, message: 'Message captured in the browser only.' },
})

const sendPasswordLink = () => ({
  message: 'Demo password reset link generated.',
  data: { token: 'demo-reset-token' },
})

const resetPasswordWithToken = ({ captures, body }) => {
  const user = byId('users', captures[0])
  if (!user) throw httpError(404, 'User not found.')
  saveUser({ ...user, password: stringValue(body.password, 'demo1234') })
  return { message: 'Password reset.' }
}

const streamVideo = ({ captures }) => ({
  streamingUrl: '#demo-video',
  urls: { auto: '#demo-video', 720: '#demo-video', 1080: '#demo-video' },
  lessonId: captures[0],
  quality: 'auto',
})

const verifyVideoAccess = () => ({ valid: true })

const videoMetadata = ({ captures }) => {
  const lesson = byId('lessons', captures[0])
  return {
    lessonId: captures[0],
    title: lesson?.title || 'Demo lesson',
    duration: lesson?.duration || '20 min',
    availableQualities: ['auto', '720', '1080'],
  }
}

const videoDebug = ({ captures }) => ({ lessonId: captures[0], ok: true })

const bulkStatistics = () => {
  const counts = {
    comments: all('courseInteractions').reduce((sum, item) => sum + (item.comments?.length || 0), 0),
    tests: all('courseInteractions').reduce((sum, item) => sum + (item.tests?.length || 0), 0),
    notifications: all('notifications').length,
    messages: all('messages').length,
    liveSessions: all('liveSessions').length,
    certificates: all('certificates').length,
    enrollmentRequests: all('enrollmentRequests').length,
    payments: all('payments').length,
    billingTransactions: all('billingTransactions').length,
    giftCards: all('giftCards').length,
    adminFeePayments: all('refunds').filter((item) => item.type === 'admin_fee').length,
  }
  return {
    counts,
    safeModels: counts,
    total: Object.values(counts).reduce((sum, value) => sum + value, 0),
  }
}

const bulkDeleteFrom = (collection, predicate) => {
  const items = all(collection)
  const remaining = items.filter((item) => !predicate(item))
  const deletedCount = items.length - remaining.length
  writeCollection(collection, remaining)
  return { deletedCount, remaining: remaining.length }
}

const bulkDelete = (collection, key) => ({ body }) => {
  requireRole('admin')
  const ids = Array.isArray(body.ids) ? body.ids : body[key] || []
  return bulkDeleteFrom(collection, (item) => ids.includes(item._id))
}

const bulkDeleteComments = ({ body }) => {
  requireRole('admin')
  const ids = Array.isArray(body.ids) ? body.ids : body.commentIds || []
  let deletedCount = 0
  const interactions = all('courseInteractions').map((interaction) => {
    const comments = interaction.comments || []
    const remaining = comments.filter((comment) => !ids.includes(comment._id))
    deletedCount += comments.length - remaining.length
    if (remaining.length === comments.length) return interaction
    return { ...interaction, comments: remaining }
  })
  writeCollection('courseInteractions', interactions)
  return {
    deletedCount,
    remaining: interactions.reduce(
      (total, interaction) => total + (interaction.comments || []).length,
      0,
    ),
  }
}

const bulkDeleteNuclear = ({ body }) => {
  requireRole('admin')
  if (body.confirmPassword !== 'demo1234') {
    throw httpError(400, 'Confirm password does not match the demo password.')
  }
  return {
    deletedCount: all('notifications').length + all('messages').length,
    message: 'Demo-only data cleared.',
  }
}

const levelsDashboard = () => {
  const levels = all('levels')
  return {
    levels,
    totalLevels: levels.length,
    activeLevels: levels.filter((item) => item.isActive).length,
  }
}

const wishlistForUser = () => {
  const user = requireUser()
  return all('wishlist')
    .filter((item) => item.userId === user._id)
    .map((item) => {
      const course = byId('courses', item.courseId)
      return { ...clone(item), course: course ? enrichCourse(course) : null }
    })
}

const addToWishlist = ({ body }) => {
  const user = requireUser()
  const courseId = stringValue(body.courseId)
  const existing = all('wishlist').find(
    (item) => item.userId === user._id && item.courseId === courseId,
  )
  if (existing) return { ...existing, course: enrichCourse(byId('courses', courseId)) }
  const item = {
    _id: nextId('wish'),
    userId: user._id,
    courseId,
    createdAt: new Date().toISOString(),
  }
  upsertItem('wishlist', item)
  return { ...item, course: enrichCourse(byId('courses', courseId)) }
}

const removeFromWishlist = ({ captures }) => {
  const user = requireUser()
  const item = all('wishlist').find(
    (entry) => entry.userId === user._id && entry.courseId === captures[0],
  )
  if (item) removeById('wishlist', item._id)
  return { message: 'Removed from wishlist.' }
}

export const routes = [
  // Auth
  route('POST', /^auth\/register$/, register),
  route('POST', /^auth\/login$/, login),
  route('POST', /^auth\/logout$/, logout),
  route('POST', /^auth\/refresh$/, refresh),
  route('PUT', /^auth\/payment-details$/, updateOwnProfile),
  route('PUT', /^auth\/change-password$/, changePassword),
  route('POST', /^auth\/forgot-password$/, sendPasswordLink),
  route('POST', /^auth\/reset-password$/, resetPasswordWithToken),
  route('PUT', /^auth\/profile$/, updateOwnProfile),
  route('GET', /^auth\/me$/, () => publicUser(requireUser())),

  // Users, reports, settings
  route('GET', /^admin\/users$/, listUsers),
  route('PATCH', /^admin\/users\/([^/]+)\/active-state$/, ({ captures, body }) =>
    saveUser({ ...byId('users', captures[0]), isActive: isTrue(body.isActive) }),
  ),
  route('PATCH', /^admin\/users\/([^/]+)\/verification-state$/, ({ captures, body }) =>
    saveUser({ ...byId('users', captures[0]), isVerified: isTrue(body.isVerified) }),
  ),
  route('GET', /^admin\/reports$/, adminReports),
  route('GET', /^admin\/instructors-with-billing$/, instructorsWithBilling),
  route('GET', /^users\/stats$/, userStats),
  route('GET', /^users\/profile$/, () => publicUser(requireUser())),
  route('PUT', /^users\/profile$/, updateOwnProfile),
  route('GET', /^users\/admin\/bank-details$/, bankDetails),
  route('GET', /^users\/instructor\/([^/]+)\/students$/, instructorStudents),
  route('GET', /^users\/instructor\/([^/]+)\/reports$/, instructorReports),
  route('GET', /^users\/([^/]+)\/payment-details$/, ({ captures }) =>
    byId('users', captures[0])?.paymentDetails || bankDetails().paymentDetails,
  ),
  route('PUT', /^users\/([^/]+)\/payment-details$/, ({ captures, body }) =>
    saveUser({
      ...byId('users', captures[0]),
      paymentDetails: { ...(byId('users', captures[0])?.paymentDetails || {}), ...body },
    }),
  ),
  route('GET', /^users$/, listUsers),
  route('POST', /^users$/, createUser),
  route('GET', /^users\/([^/]+)$/, getUser),
  route('PUT', /^users\/([^/]+)$/, updateUser),
  route('DELETE', /^users\/([^/]+)$/, deleteUser),

  // Categories
  route('GET', /^categories$/, listCategories),
  route('POST', /^categories$/, createCategory),
  route('GET', /^categories\/([^/]+)$/, categoryById),
  route('PUT', /^categories\/([^/]+)$/, updateCategory),
  route('DELETE', /^categories\/([^/]+)$/, deleteCategory),

  // Courses
  route('GET', /^courses\/all-courses$/, allCourses),
  route('GET', /^courses\/user\/enrolled$/, enrolledCourses),
  route('GET', /^courses\/instructor\/([^/]+)$/, instructorCourses),
  route('GET', /^courses\/([^/]+)\/students$/, courseStudents),
  route('POST', /^courses\/([^/]+)\/enroll$/, enrollInCourse),
  route('POST', /^courses\/([^/]+)\/progress$/, updateProgress),
  route('POST', /^courses\/([^/]+)\/rate$/, rateCourse),
  route('POST', /^courses\/([^/]+)\/like$/, likeCourse),
  route('PATCH', /^courses\/([^/]+)\/status$/, updateCourseStatus),
  route('GET', /^courses$/, listCourses),
  route('POST', /^courses$/, createCourse),
  route('GET', /^courses\/([^/]+)$/, courseById),
  route('PUT', /^courses\/([^/]+)$/, updateCourse),
  route('DELETE', /^courses\/([^/]+)$/, deleteCourse),

  // Wishlist
  route('GET', /^wishlist$/, wishlistForUser),
  route('POST', /^wishlist$/, addToWishlist),
  route('DELETE', /^wishlist\/([^/]+)$/, removeFromWishlist),

  // Lessons
  route('GET', /^lessons$/, listLessons),
  route('POST', /^lessons\/([^/]+)$/, createLesson),
  route('GET', /^lessons\/([^/]+)$/, getLesson),
  route('PUT', /^lessons\/([^/]+)$/, updateLesson),
  route('DELETE', /^lessons\/([^/]+)$/, deleteLesson),

  // Enrollment requests
  route('GET', /^enrollment-requests\/user$/, userEnrollmentRequests),
  route('GET', /^enrollment-requests\/instructor$/, instructorEnrollmentRequests),
  route('GET', /^enrollment-requests$/, listEnrollmentRequests),
  route('POST', /^enrollment-requests$/, createEnrollmentRequest),
  route('GET', /^enrollment-requests\/([^/]+)\/receipt$/, enrollmentReceipt),
  route('POST', /^enrollment-requests\/([^/]+)\/notes$/, addEnrollmentNote),
  route('PATCH', /^enrollment-requests\/([^/]+)\/notes\/([^/]+)$/, editEnrollmentNote),
  route('PUT', /^enrollment-requests\/([^/]+)\/notes\/([^/]+)$/, editEnrollmentNote),
  route('DELETE', /^enrollment-requests\/([^/]+)\/notes\/([^/]+)$/, deleteEnrollmentNote),
  route('PATCH', /^enrollment-requests\/([^/]+)$/, updateEnrollmentRequest),
  route('DELETE', /^enrollment-requests\/([^/]+)$/, deleteEnrollmentRequest),

  // Instructor requests
  route('GET', /^instructor-requests\/user$/, userInstructorRequest),
  route('GET', /^instructor-requests$/, listInstructorRequests),
  route('POST', /^instructor-requests$/, createInstructorRequest),
  route('POST', /^instructor-requests\/([^/]+)\/note$/, addInstructorNote),
  route('PATCH', /^instructor-requests\/([^/]+)\/notes\/([^/]+)$/, editInstructorNote),
  route('PUT', /^instructor-requests\/([^/]+)\/notes\/([^/]+)$/, editInstructorNote),
  route('DELETE', /^instructor-requests\/([^/]+)\/notes\/([^/]+)$/, deleteInstructorNote),
  route('PATCH', /^instructor-requests\/([^/]+)$/, updateInstructorRequest),
  route('DELETE', /^instructor-requests\/([^/]+)$/, deleteInstructorRequest),

  // Course interactions
  route('GET', /^course-interactions\/([^/]+)$/, getInteractions),
  route('POST', /^course-interactions\/([^/]+)\/comments$/, addComment),
  route('PUT', /^course-interactions\/([^/]+)\/comments\/([^/]+)$/, editComment),
  route('DELETE', /^course-interactions\/([^/]+)\/comments\/([^/]+)$/, deleteComment),
  route('POST', /^course-interactions\/([^/]+)\/tests$/, addTest),
  route('POST', /^course-interactions\/([^/]+)\/tests\/([^/]+)\/submit$/, submitTestAnswer),
  route('POST', /^course-interactions\/([^/]+)\/tests\/([^/]+)\/answer-key$/, uploadAnswerKey),
  route('GET', /^course-interactions\/([^/]+)\/tests\/([^/]+)\/answer-key\/download$/, downloadAnswerKey),
  route('DELETE', /^course-interactions\/([^/]+)\/tests\/([^/]+)\/submissions\/([^/]+)$/, deleteTestAnswer),
  route('PUT', /^course-interactions\/([^/]+)\/tests\/([^/]+)\/submissions\/([^/]+)\/grade$/, gradeTestSubmission),
  route('PUT', /^course-interactions\/([^/]+)\/tests\/([^/]+)$/, updateTest),
  route('DELETE', /^course-interactions\/([^/]+)\/tests\/([^/]+)$/, deleteTest),
  route('POST', /^course-interactions\/([^/]+)\/attachments$/, addAttachment),
  route('PUT', /^course-interactions\/([^/]+)\/attachments\/([^/]+)$/, editAttachment),
  route('DELETE', /^course-interactions\/([^/]+)\/attachments\/([^/]+)$/, deleteAttachment),

  // Live sessions
  route('GET', /^live-sessions\/admin\/all$/, listAllSessions),
  route('GET', /^live-sessions\/course\/([^/]+)$/, listCourseSessions),
  route('GET', /^live-sessions\/instructor$/, listInstructorSessions),
  route('GET', /^live-sessions\/student$/, listStudentSessions),
  route('POST', /^live-sessions$/, createSession),
  route('POST', /^live-sessions\/([^/]+)\/join$/, joinSession),
  route('POST', /^live-sessions\/([^/]+)\/leave$/, leaveSession),
  route('POST', /^live-sessions\/([^/]+)\/start$/, startSession),
  route('POST', /^live-sessions\/([^/]+)\/end$/, endSession),
  route('POST', /^live-sessions\/([^/]+)\/recording$/, uploadRecording),
  route('POST', /^live-sessions\/([^/]+)\/cancel$/, cancelSession),
  route('GET', /^live-sessions\/([^/]+)$/, sessionById),
  route('PUT', /^live-sessions\/([^/]+)$/, updateSession),
  route('DELETE', /^live-sessions\/([^/]+)$/, deleteSession),

  // Grades
  route('GET', /^grades\/student$/, studentGrades),
  route('GET', /^grades\/student\/([^/]+)$/, studentCourseGrades),
  route('GET', /^grades\/course\/([^/]+)\/tests$/, courseTests),
  route('GET', /^grades\/course\/([^/]+)$/, courseGrades),
  route('POST', /^grades\/final$/, createFinalGrade),
  route('POST', /^grades\/test$/, createTestGrade),
  route('GET', /^grades\/([^/]+)$/, ({ captures }) => byId('grades', captures[0])),
  route('DELETE', /^grades\/([^/]+)$/, deleteGrade),

  // Certificates
  route('GET', /^certificates\/student$/, studentCertificates),
  route('GET', /^certificates\/course\/([^/]+)\/students$/, courseCertificateStudents),
  route('GET', /^certificates\/course\/([^/]+)$/, courseCertificates),
  route('POST', /^certificates\/upload$/, uploadCertificate),
  route('GET', /^certificates\/([^/]+)\/download$/, downloadCertificate),
  route('DELETE', /^certificates\/([^/]+)$/, deleteCertificate),

  // Notifications
  route('GET', /^notifications\/unread-count$/, unreadCount),
  route('PUT', /^notifications\/mark-all-read$/, markAllNotificationsRead),
  route('GET', /^notifications$/, notifications),
  route('PUT', /^notifications\/([^/]+)\/read$/, markNotificationRead),
  route('DELETE', /^notifications\/([^/]+)$/, deleteNotification),

  // Messages
  route('GET', /^messages\/conversations$/, conversations),
  route('GET', /^messages\/instructors$/, messageInstructors),
  route('GET', /^messages\/unread-count$/, messagesUnreadCount),
  route('GET', /^messages\/search$/, searchMessages),
  route('GET', /^messages\/conversation\/([^/]+)$/, conversation),
  route('POST', /^messages$/, sendMessage),
  route('PUT', /^messages\/([^/]+)\/read$/, markMessageRead),
  route('DELETE', /^messages\/([^/]+)$/, deleteMessage),

  // Payments
  route('GET', /^payments\/csrf-token$/, csrfToken),
  route('GET', /^payments\/my-payments$/, myPayments),
  route('GET', /^payments\/stats$/, paymentStats),
  route('GET', /^payments\/reports$/, paymentReports),
  route('GET', /^payments\/breakdown\/([^/]+)$/, paymentBreakdown),
  route('GET', /^payments\/instructor\/pending-transfers$/, pendingTransfers),
  route('GET', /^payments\/admin\/pending-transfers$/, pendingTransfers),
  route('POST', /^payments\/initiate$/, initiatePayment),
  route('POST', /^payments\/direct-transfer\/([^/]+)$/, submitDirectTransfer),
  route('POST', /^payments\/([^/]+)\/instructor-approve$/, instructorApprovePayment),
  route('POST', /^payments\/([^/]+)\/approve$/, approvePayment),
  route('GET', /^payments\/user\/bills$/, userBills),
  route('POST', /^billing\/pay-from-credits$/, payFromCredits),
  route('GET', /^payments\/([^/]+)\/receipt$/, paymentReceipt),
  route('POST', /^payments$/, createPayment),
  route('GET', /^payments\/([^/]+)$/, paymentById),

  // Billing
  route('GET', /^billing\/account$/, billingAccount),
  route('GET', /^billing\/transactions$/, billingTransactions),
  route('GET', /^billing\/gift-card-balance$/, giftCardBalance),
  route('POST', /^billing\/initiate$/, billingInitiate),
  route('POST', /^billing\/stripe\/confirm$/, ({ body }) => ({ paymentIntentId: body.paymentIntentId, success: true })),
  route('POST', /^billing\/pay$/, billingPay),
  route('POST', /^billing\/direct-transfer\/([^/]+)$/, billingDirectTransfer),
  route('POST', /^billing\/create-payment-intent$/, ({ body }) => ({
    clientSecret: `demo_secret_${Date.now()}`,
    amount: Number(body.amount) || 0,
  })),
  route('GET', /^billing\/admin\/pending-transfers$/, pendingTransfers),
  route('POST', /^billing\/admin\/approve-transfer\/([^/]+)$/, approvePayment),
  route('POST', /^billing\/admin\/charge$/, billingPay),
  route('POST', /^billing\/admin\/process-annual$/, () => ({ message: 'Annual billing processed in demo mode.' })),
  route('POST', /^billing\/admin\/process-instructor-payout$/, processInstructorPayout),
  route('GET', /^billing\/admin\/summary$/, () => billingSummary('admin')),
  route('GET', /^billing\/admin\/dashboard$/, billingAdminDashboard),
  route('GET', /^billing\/admin\/account$/, billingAdminAccount),
  route('GET', /^billing\/summary\/admin$/, () => billingSummary('admin')),
  route('GET', /^billing\/summary\/student$/, () => billingSummary('student')),
  route('GET', /^billing\/summary\/instructor$/, () => billingSummary('instructor')),
  route('GET', /^billing\/preferences$/, () => readSetting('billingPreferences', { currency: 'USD' })),
  route('POST', /^billing\/preferences$/, ({ body }) => {
    writeSetting('billingPreferences', body)
    return body
  }),
  route('GET', /^billing\/payment-methods$/, () => []),
  route('POST', /^billing\/payment-methods$/, ({ body }) => body),
  route('DELETE', /^payment-methods\/([^/]+)$/, () => ({ message: 'Payment method removed.' })),
  route('GET', /^billing\/notifications$/, billingNotifications),
  route('PUT', /^billing\/notifications\/([^/]+)\/read$/, markNotificationRead),
  route('GET', /^billing\/admin\/gift-cards$/, giftCards),
  route('POST', /^billing\/admin\/gift-card$/, createGiftCard),
  route('PUT', /^billing\/admin\/gift-card\/([^/]+)$/, updateGiftCard),
  route('DELETE', /^billing\/admin\/gift-card\/([^/]+)$/, deleteGiftCard),
  route('POST', /^billing\/claim-gift-card\/([^/]+)$/, claimGiftCard),

  // Payouts
  route('POST', /^payouts\/request$/, createPayoutRequest),
  route('GET', /^payouts\/my-requests$/, myPayoutRequests),
  route('POST', /^payouts\/cancel\/([^/]+)$/, cancelPayout),
  route('GET', /^payouts\/admin\/pending$/, () => all('payoutRequests').filter((item) => item.status === 'pending')),
  route('GET', /^payouts\/admin\/requests\/([^/]+)$/, payoutByStatus),
  route('GET', /^payouts\/admin\/stats$/, payoutStats),
  route('POST', /^payouts\/admin\/approve\/([^/]+)$/, approvePayout),
  route('POST', /^payouts\/admin\/reject\/([^/]+)$/, rejectPayout),
  route('POST', /^payouts\/process\/([^/]+)$/, processPayout),
  route('GET', /^payouts$/, payoutRequests),

  // Refunds
  route('GET', /^refunds\/student\/my-refunds$/, studentRefunds),
  route('POST', /^refunds\/student$/, createStudentRefund),
  route('POST', /^refunds\/instructor\/admin-fee-refund$/, createInstructorRefund),
  route('GET', /^refunds\/instructor\/requests$/, instructorRefunds),
  route('GET', /^refunds\/instructor\/my-refunds$/, instructorRefunds),
  route('GET', /^refunds\/admin\/all$/, adminRefunds),
  route('GET', /^refunds\/admin\/pending$/, ({ params }) =>
    adminRefunds({ params: { ...params, status: 'pending' } }),
  ),
  route('GET', /^refunds\/admin\/statistics$/, refundStats),
  route('GET', /^refunds\/admin\/stats$/, refundStats),
  route('PATCH', /^refunds\/admin\/([^/]+)\/approve$/, updateRefund),
  route('PATCH', /^refunds\/admin\/([^/]+)\/reject$/, updateRefund),
  route('POST', /^refunds\/([^/]+)\/cancel$/, cancelRefund),
  route('GET', /^refunds\/([^/]+)$/, refundById),

  // Settings, reports, video, mail, password, bulk delete
  route('GET', /^admin\/settings$/, getAdminSettings),
  route('PUT', /^admin\/settings$/, updateAdminSettings),
  route('PUT', /^admin\/settings\/payment$/, updatePaymentSettings),
  route('POST', /^admin\/settings\/payment\/reset$/, resetPaymentSettings),
  route('GET', /^admin\/settings\/payment-stats$/, paymentStatsForSettings),
  route('POST', /^admin\/settings\/test-gateway$/, testGateway),
  route('POST', /^email\/contact$/, sendMail),
  route('POST', /^password\/password-link$/, sendPasswordLink),
  route('POST', /^password\/reset-password\/([^/]+)\/([^/]+)$/, resetPasswordWithToken),
  route('POST', /^videos\/stream\/([^/]+)$/, streamVideo),
  route('POST', /^videos\/verify$/, verifyVideoAccess),
  route('GET', /^videos\/metadata\/([^/]+)$/, videoMetadata),
  route('GET', /^videos\/debug\/([^/]+)$/, videoDebug),
  route('GET', /^levels\/dashboard$/, levelsDashboard),
  route('GET', /^admin\/bulk-delete\/statistics$/, bulkStatistics),
  route('DELETE', /^admin\/bulk-delete\/comments$/, bulkDeleteComments),
  route('DELETE', /^admin\/bulk-delete\/tests$/, bulkDelete('courseInteractions', 'testIds')),
  route('DELETE', /^admin\/bulk-delete\/notifications$/, bulkDelete('notifications', 'ids')),
  route('DELETE', /^admin\/bulk-delete\/messages$/, bulkDelete('messages', 'ids')),
  route('DELETE', /^admin\/bulk-delete\/live-sessions$/, bulkDelete('liveSessions', 'ids')),
  route('DELETE', /^admin\/bulk-delete\/certificates$/, bulkDelete('certificates', 'ids')),
  route('DELETE', /^admin\/bulk-delete\/enrollment-requests$/, bulkDelete('enrollmentRequests', 'ids')),
  route('DELETE', /^admin\/bulk-delete\/payments$/, bulkDelete('payments', 'ids')),
  route(
    'DELETE',
    /^admin\/bulk-delete\/billing-transactions$/,
    bulkDelete('billingTransactions', 'ids'),
  ),
  route('DELETE', /^admin\/bulk-delete\/gift-cards$/, bulkDelete('giftCards', 'ids')),
  route('DELETE', /^admin\/bulk-delete\/admin-fee-payments$/, bulkDelete('refunds', 'ids')),
  route('DELETE', /^admin\/bulk-delete\/nuclear$/, bulkDeleteNuclear),
]
