// demoSeed — deterministic seed data for the browser-only Mentora demo.
// Date markers are resolved when the seed is loaded so relative dates stay fresh.

const DAY_MS = 24 * 60 * 60 * 1000;

const isoDays = (days) => new Date(Date.now() + days * DAY_MS).toISOString();

const userSummary = (user) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
});

const category = (id, name) => ({
  _id: id,
  id,
  name,
  description: `${name} courses`,
  isActive: true,
  order: Number(id.replace(/\D/g, "")) || 1,
});

const course = ({
  id,
  title,
  description,
  categoryId,
  categoryName,
  instructorId,
  instructorName,
  price,
  level,
  students,
  rating,
  likes,
  duration,
  lessonsCount,
}) => ({
  _id: id,
  id,
  title,
  description,
  categoryId,
  category: category(categoryId, categoryName),
  instructorId,
  instructor: {
    _id: instructorId,
    id: instructorId,
    name: instructorName,
    avatar: "/avatar.png",
  },
  price,
  originalPrice: Math.round(price * 1.25),
  level,
  status: "published",
  duration,
  lessonsCount,
  enrolledCount: students,
  students,
  averageRating: rating,
  rating,
  likesCount: likes,
  ratingInfo: {
    averageRating: rating,
    ratingsCount: Math.max(12, Math.round(students / 3)),
    likesCount: likes,
    liked: false,
  },
  enrolledStudents: [],
  imageUrl: "",
  thumbnail: "",
  whatYouWillLearn: [
    `Build a strong foundation in ${title.toLowerCase()}`,
    "Work through practical, portfolio-ready examples",
    "Understand concepts through guided exercises",
  ],
  requirements: ["No prior experience required", "A modern web browser"],
  createdAt: "{{isoDays:-45}}",
  updatedAt: "{{isoDays:-2}}",
});

const lesson = (id, courseId, title, order, duration) => ({
  _id: id,
  id,
  courseId,
  title,
  description: `${title} — demo lesson.`,
  videoUrl: "",
  videoTitle: title,
  duration,
  order,
  isPublished: true,
  isPreview: order === 1,
  createdAt: "{{isoDays:-40}}",
});

const enrollment = (id, userId, courseId, progress) => ({
  _id: id,
  id,
  userId,
  courseId,
  progress,
  completedLessons: Math.floor(progress / 25),
  enrolledAt: "{{isoDays:-20}}",
  status: "active",
});

const notification = (id, userId, type, title, message, days, isRead = false) => ({
  _id: id,
  id,
  userId,
  type,
  title,
  message,
  isRead,
  color: type === "payment" ? "green" : type === "message" ? "purple" : "blue",
  createdAt: `{{isoDays:${days}}}`,
});

export function createSeedData() {
  const admin = {
    _id: "u-admin",
    id: "u-admin",
    name: "Alex Morgan",
    email: "admin@mentora.demo",
    role: "admin",
    password: "demo1234",
    avatar: "/avatar.png",
    isActive: true,
    isVerified: true,
    phone: "+1 555 0100",
    bio: "Platform administrator for the Mentora demo.",
    createdAt: "{{isoDays:-120}}",
  };

  const instructors = [
    {
      _id: "u-instructor-sarah",
      id: "u-instructor-sarah",
      name: "Dr. Sarah Hassan",
      email: "sarah@mentora.demo",
      role: "instructor",
      password: "demo1234",
      avatar: "/avatar.png",
      isActive: true,
      isVerified: true,
      phone: "+1 555 0101",
      bio: "Full-stack engineer and frontend instructor.",
      specialization: "Web Development",
      createdAt: "{{isoDays:-110}}",
    },
    {
      _id: "u-instructor-mark",
      id: "u-instructor-mark",
      name: "Prof. Mark Wilson",
      email: "mark@mentora.demo",
      role: "instructor",
      password: "demo1234",
      avatar: "/avatar.png",
      isActive: true,
      isVerified: true,
      phone: "+1 555 0102",
      bio: "Data scientist teaching practical AI workflows.",
      specialization: "Data & AI",
      createdAt: "{{isoDays:-100}}",
    },
  ];

  const students = [
    {
      _id: "u-student-lina",
      id: "u-student-lina",
      name: "Lina Ahmed",
      email: "lina@mentora.demo",
      role: "student",
      password: "demo1234",
      avatar: "/avatar.png",
      isActive: true,
      isVerified: true,
      phone: "+1 555 0201",
      bio: "Lifelong learner exploring web development.",
      createdAt: "{{isoDays:-60}}",
    },
    {
      _id: "u-student-omar",
      id: "u-student-omar",
      name: "Omar Khaled",
      email: "omar@mentora.demo",
      role: "student",
      password: "demo1234",
      avatar: "/avatar.png",
      isActive: true,
      isVerified: true,
      phone: "+1 555 0202",
      bio: "Building a career in data and automation.",
      createdAt: "{{isoDays:-50}}",
    },
    {
      _id: "u-student-nora",
      id: "u-student-nora",
      name: "Nora Saleh",
      email: "nora@mentora.demo",
      role: "student",
      password: "demo1234",
      avatar: "/avatar.png",
      isActive: true,
      isVerified: true,
      phone: "+1 555 0203",
      bio: "Designer learning how to ship digital products.",
      createdAt: "{{isoDays:-40}}",
    },
  ];

  const users = [admin, ...instructors, ...students];

  const categories = [
    category("cat-1", "Web Development"),
    category("cat-2", "Data & AI"),
    category("cat-3", "Design"),
    category("cat-4", "Business"),
  ];

  const courses = [
    course({
      id: "course-1",
      title: "Modern React from Scratch",
      description: "Learn React with hooks, routing, state management and production patterns.",
      categoryId: "cat-1",
      categoryName: "Web Development",
      instructorId: "u-instructor-sarah",
      instructorName: "Dr. Sarah Hassan",
      price: 79,
      level: "Beginner",
      students: 128,
      rating: 4.8,
      likes: 42,
      duration: "12 hours",
      lessonsCount: 6,
    }),
    course({
      id: "course-2",
      title: "Node.js API Design",
      description: "Design secure, maintainable REST APIs with Node, Express and MongoDB.",
      categoryId: "cat-1",
      categoryName: "Web Development",
      instructorId: "u-instructor-sarah",
      instructorName: "Dr. Sarah Hassan",
      price: 99,
      level: "Intermediate",
      students: 86,
      rating: 4.7,
      likes: 31,
      duration: "10 hours",
      lessonsCount: 6,
    }),
    course({
      id: "course-3",
      title: "Python for Data Analysis",
      description: "Turn raw datasets into clear insights with pandas and visualization.",
      categoryId: "cat-2",
      categoryName: "Data & AI",
      instructorId: "u-instructor-mark",
      instructorName: "Prof. Mark Wilson",
      price: 89,
      level: "Beginner",
      students: 154,
      rating: 4.9,
      likes: 58,
      duration: "14 hours",
      lessonsCount: 6,
    }),
    course({
      id: "course-4",
      title: "Applied Machine Learning",
      description: "Build, evaluate and explain practical machine learning models.",
      categoryId: "cat-2",
      categoryName: "Data & AI",
      instructorId: "u-instructor-mark",
      instructorName: "Prof. Mark Wilson",
      price: 129,
      level: "Advanced",
      students: 72,
      rating: 4.6,
      likes: 24,
      duration: "16 hours",
      lessonsCount: 6,
    }),
    course({
      id: "course-5",
      title: "Product Design Foundations",
      description: "A practical introduction to interface design, systems and prototypes.",
      categoryId: "cat-3",
      categoryName: "Design",
      instructorId: "u-instructor-sarah",
      instructorName: "Dr. Sarah Hassan",
      price: 69,
      level: "Beginner",
      students: 95,
      rating: 4.5,
      likes: 27,
      duration: "8 hours",
      lessonsCount: 6,
    }),
    course({
      id: "course-6",
      title: "Digital Product Strategy",
      description: "Connect customer problems to product decisions and measurable outcomes.",
      categoryId: "cat-4",
      categoryName: "Business",
      instructorId: "u-instructor-mark",
      instructorName: "Prof. Mark Wilson",
      price: 59,
      level: "Intermediate",
      students: 64,
      rating: 4.4,
      likes: 19,
      duration: "7 hours",
      lessonsCount: 6,
    }),
  ];

  courses[0].enrolledStudents = ["u-student-lina", "u-student-omar"];
  courses[1].enrolledStudents = ["u-student-lina"];
  courses[2].enrolledStudents = ["u-student-omar", "u-student-nora"];
  courses[4].enrolledStudents = ["u-student-nora"];

  const lessonTitles = [
    "Welcome and course overview",
    "Core concepts",
    "Building the first project",
    "Working with real data",
    "Common pitfalls and fixes",
    "Final project and next steps",
  ];

  const lessons = courses.flatMap((item, courseIndex) =>
    lessonTitles.map((title, index) =>
      lesson(
        `lesson-${courseIndex + 1}-${index + 1}`,
        item._id,
        title,
        index + 1,
        `${18 + index * 7} min`,
      ),
    ),
  );

  const enrollments = [
    enrollment("enroll-1", "u-student-lina", "course-1", 75),
    enrollment("enroll-2", "u-student-lina", "course-2", 30),
    enrollment("enroll-3", "u-student-omar", "course-1", 50),
    enrollment("enroll-4", "u-student-omar", "course-3", 90),
    enrollment("enroll-5", "u-student-nora", "course-3", 25),
    enrollment("enroll-6", "u-student-nora", "course-5", 60),
  ];

  const courseInteractions = courses.map((item, index) => ({
    _id: `interaction-${index + 1}`,
    courseId: item._id,
    comments: [
      {
        _id: `comment-${index + 1}`,
        user: userSummary(students[index % students.length]),
        content: "Great lesson — the examples made this click for me.",
        createdAt: "{{isoDays:-7}}",
        replies: [],
      },
    ],
    tests: [
      {
        _id: `test-${index + 1}`,
        title: `Knowledge check ${index + 1}`,
        description: "Short demo assessment.",
        dueDate: "{{isoDays:7}}",
        totalMarks: 100,
        questionFile: { filename: "questions.pdf", url: "#demo-questions" },
        answerKey: { filename: "answer-key.pdf", url: "#demo-answer-key" },
        submissions: [
          {
            _id: `submission-${index + 1}`,
            student: userSummary(students[index % students.length]),
            submittedAt: "{{isoDays:-3}}",
            answerFile: { filename: "answers.pdf", url: "#demo-answers" },
            grade: 88 - index,
            feedback: "Good work.",
            status: "graded",
          },
        ],
      },
    ],
    attachments: [
      {
        _id: `attachment-${index + 1}`,
        title: "Lesson slides",
        description: "Companion slides for this course.",
        file: { filename: "slides.pdf", url: "#demo-slides" },
        createdAt: "{{isoDays:-6}}",
      },
    ],
  }));

  const liveSessions = [
    {
      _id: "session-1",
      title: "React Hooks Q&A",
      courseId: "course-1",
      course: { _id: "course-1", title: "Modern React from Scratch" },
      instructorId: "u-instructor-sarah",
      instructor: userSummary(instructors[0]),
      studentIds: ["u-student-lina", "u-student-omar"],
      scheduledAt: "{{isoDays:2}}",
      duration: 60,
      status: "scheduled",
      zoomJoinUrl: "#demo-meeting",
      zoomStartUrl: "#demo-host",
      meetingUrl: "#demo-meeting",
      recordingUrl: "#demo-recording",
    },
    {
      _id: "session-2",
      title: "API Design Workshop",
      courseId: "course-2",
      course: { _id: "course-2", title: "Node.js API Design" },
      instructorId: "u-instructor-sarah",
      instructor: userSummary(instructors[0]),
      studentIds: ["u-student-lina"],
      scheduledAt: "{{isoDays:5}}",
      duration: 90,
      status: "scheduled",
      zoomJoinUrl: "#demo-meeting",
      zoomStartUrl: "#demo-host",
      meetingUrl: "#demo-meeting",
      recordingUrl: "#demo-recording",
    },
    {
      _id: "session-3",
      title: "Pandas Live Walkthrough",
      courseId: "course-3",
      course: { _id: "course-3", title: "Python for Data Analysis" },
      instructorId: "u-instructor-mark",
      instructor: userSummary(instructors[1]),
      studentIds: ["u-student-omar", "u-student-nora"],
      scheduledAt: "{{isoDays:1}}",
      duration: 60,
      status: "live",
      zoomJoinUrl: "#demo-meeting",
      zoomStartUrl: "#demo-host",
      meetingUrl: "#demo-meeting",
      recordingUrl: "#demo-recording",
    },
    {
      _id: "session-4",
      title: "ML Model Review",
      courseId: "course-4",
      course: { _id: "course-4", title: "Applied Machine Learning" },
      instructorId: "u-instructor-mark",
      instructor: userSummary(instructors[1]),
      studentIds: ["u-student-omar"],
      scheduledAt: "{{isoDays:-4}}",
      duration: 75,
      status: "completed",
      zoomJoinUrl: "#demo-meeting",
      zoomStartUrl: "#demo-host",
      meetingUrl: "#demo-meeting",
      recordingUrl: "#demo-recording",
    },
    {
      _id: "session-5",
      title: "Design Critique Clinic",
      courseId: "course-5",
      course: { _id: "course-5", title: "Product Design Foundations" },
      instructorId: "u-instructor-sarah",
      instructor: userSummary(instructors[0]),
      studentIds: ["u-student-nora"],
      scheduledAt: "{{isoDays:8}}",
      duration: 45,
      status: "scheduled",
      zoomJoinUrl: "#demo-meeting",
      zoomStartUrl: "#demo-host",
      meetingUrl: "#demo-meeting",
      recordingUrl: "#demo-recording",
    },
    {
      _id: "session-6",
      title: "Product Roadmap Lab",
      courseId: "course-6",
      course: { _id: "course-6", title: "Digital Product Strategy" },
      instructorId: "u-instructor-mark",
      instructor: userSummary(instructors[1]),
      studentIds: ["u-student-lina", "u-student-nora"],
      scheduledAt: "{{isoDays:-10}}",
      duration: 60,
      status: "completed",
      zoomJoinUrl: "#demo-meeting",
      zoomStartUrl: "#demo-host",
      meetingUrl: "#demo-meeting",
      recordingUrl: "#demo-recording",
    },
  ];

  const enrollmentRequests = [
    {
      _id: "er-1",
      userId: "u-student-lina",
      user: userSummary(students[0]),
      courseId: "course-3",
      course: courses[2],
      status: "pending",
      note: "I would love to join this cohort.",
      adminNotes: [],
      createdAt: "{{isoDays:-6}}",
    },
    {
      _id: "er-2",
      userId: "u-student-omar",
      user: userSummary(students[1]),
      courseId: "course-4",
      course: courses[3],
      status: "approved",
      note: "Ready to start.",
      adminNotes: [{ _id: "ern-1", note: "Approved for the demo.", createdAt: "{{isoDays:-4}}" }],
      createdAt: "{{isoDays:-8}}",
    },
    {
      _id: "er-3",
      userId: "u-student-nora",
      user: userSummary(students[2]),
      courseId: "course-2",
      course: courses[1],
      status: "rejected",
      note: "Requesting a backend course.",
      adminNotes: [],
      createdAt: "{{isoDays:-12}}",
    },
    {
      _id: "er-4",
      userId: "u-student-omar",
      user: userSummary(students[1]),
      courseId: "course-5",
      course: courses[4],
      status: "pending",
      note: "Design fundamentals look useful.",
      adminNotes: [],
      createdAt: "{{isoDays:-2}}",
    },
  ];

  const instructorRequests = [
    {
      _id: "ir-1",
      userId: "u-student-nora",
      user: userSummary(students[2]),
      name: "Nora Saleh",
      email: "nora@mentora.demo",
      bio: "Designer who wants to teach product design basics.",
      status: "pending",
      adminNotes: [],
      createdAt: "{{isoDays:-9}}",
    },
    {
      _id: "ir-2",
      userId: "u-student-omar",
      user: userSummary(students[1]),
      name: "Omar Khaled",
      email: "omar@mentora.demo",
      bio: "Data analyst interested in teaching Python.",
      status: "approved",
      adminNotes: [{ _id: "irn-1", note: "Welcome aboard.", createdAt: "{{isoDays:-5}}" }],
      createdAt: "{{isoDays:-15}}",
    },
    {
      _id: "ir-3",
      userId: "u-student-lina",
      user: userSummary(students[0]),
      name: "Lina Ahmed",
      email: "lina@mentora.demo",
      bio: "Frontend developer interested in mentoring.",
      status: "pending",
      adminNotes: [],
      createdAt: "{{isoDays:-3}}",
    },
  ];

  const notifications = [
    notification("notif-1", "u-admin", "course_enrollment", "New enrollment request", "Lina requested Python for Data Analysis.", -1),
    notification("notif-2", "u-admin", "system", "Weekly report ready", "Your platform summary is available.", -2, true),
    notification("notif-3", "u-instructor-sarah", "course_enrollment", "New student", "Omar joined Modern React from Scratch.", -1),
    notification("notif-4", "u-instructor-sarah", "live_session", "Session starting soon", "React Hooks Q&A is scheduled.", 2),
    notification("notif-5", "u-instructor-mark", "payment", "Payout approved", "A demo payout was approved.", -3, true),
    notification("notif-6", "u-student-lina", "payment", "Payment received", "Your payment for Modern React was recorded.", -4, true),
    notification("notif-7", "u-student-lina", "live_session", "Upcoming session", "React Hooks Q&A starts soon.", 2),
    notification("notif-8", "u-student-lina", "assignment_graded", "Assignment graded", "You scored 88 on Knowledge check 1.", -1),
    notification("notif-9", "u-student-omar", "course_enrollment", "Request approved", "You can now join Applied Machine Learning.", -4, true),
    notification("notif-10", "u-student-omar", "message", "New message", "Prof. Mark replied to your question.", -1),
    notification("notif-11", "u-student-nora", "course_update", "Course updated", "Product Design Foundations has new slides.", -2),
  ];

  const messages = [
    {
      _id: "msg-1",
      senderId: "u-student-lina",
      receiverId: "u-instructor-sarah",
      courseId: "course-1",
      subject: "Question about hooks",
      content: "Could you explain when to use useMemo?",
      isRead: true,
      createdAt: "{{isoDays:-5}}",
    },
    {
      _id: "msg-2",
      senderId: "u-instructor-sarah",
      receiverId: "u-student-lina",
      courseId: "course-1",
      subject: "Re: Question about hooks",
      content: "Use it only when a calculation is genuinely expensive.",
      isRead: false,
      createdAt: "{{isoDays:-4}}",
    },
    {
      _id: "msg-3",
      senderId: "u-student-omar",
      receiverId: "u-instructor-mark",
      courseId: "course-3",
      subject: "Dataset question",
      content: "Which dataset should I use for the final exercise?",
      isRead: false,
      createdAt: "{{isoDays:-2}}",
    },
    {
      _id: "msg-4",
      senderId: "u-student-nora",
      receiverId: "u-instructor-sarah",
      courseId: "course-5",
      subject: "Portfolio feedback",
      content: "Could I get feedback on my first prototype?",
      isRead: true,
      createdAt: "{{isoDays:-8}}",
    },
  ];

  const grades = [
    {
      _id: "grade-1",
      studentId: "u-student-lina",
      courseId: "course-1",
      finalGrade: { finalGrade: { percentage: 88, letter: "B+" }, gradedAt: "{{isoDays:-3}}" },
      testGrades: [{ testId: "test-1", percentage: 88, gradedAt: "{{isoDays:-3}}" }],
      summary: { testAverage: 88, finalPercentage: 88 },
    },
    {
      _id: "grade-2",
      studentId: "u-student-omar",
      courseId: "course-3",
      finalGrade: { finalGrade: { percentage: 93, letter: "A" }, gradedAt: "{{isoDays:-5}}" },
      testGrades: [{ testId: "test-3", percentage: 93, gradedAt: "{{isoDays:-5}}" }],
      summary: { testAverage: 93, finalPercentage: 93 },
    },
    {
      _id: "grade-3",
      studentId: "u-student-nora",
      courseId: "course-5",
      finalGrade: { finalGrade: { percentage: 78, letter: "C+",}, gradedAt: "{{isoDays:-2}}" },
      testGrades: [{ testId: "test-5", percentage: 78, gradedAt: "{{isoDays:-2}}" }],
      summary: { testAverage: 78, finalPercentage: 78 },
    },
  ];

  const certificates = [
    {
      _id: "cert-1",
      studentId: "u-student-lina",
      courseId: "course-1",
      course: { _id: "course-1", title: "Modern React from Scratch" },
      student: userSummary(students[0]),
      issuedAt: "{{isoDays:-3}}",
      certificateUrl: "#demo-certificate",
    },
    {
      _id: "cert-2",
      studentId: "u-student-omar",
      courseId: "course-3",
      course: { _id: "course-3", title: "Python for Data Analysis" },
      student: userSummary(students[1]),
      issuedAt: "{{isoDays:-5}}",
      certificateUrl: "#demo-certificate",
    },
  ];

  const payments = [
    {
      _id: "pay-1",
      userId: "u-student-lina",
      courseId: "course-1",
      course: { _id: "course-1", title: "Modern React from Scratch", instructor: userSummary(instructors[0]) },
      amount: 79,
      finalAmount: 79,
      status: "paid",
      method: "credit card",
      transactionId: "DEMO-1001",
      createdAt: "{{isoDays:-20}}",
    },
    {
      _id: "pay-2",
      userId: "u-student-lina",
      courseId: "course-2",
      course: { _id: "course-2", title: "Node.js API Design", instructor: userSummary(instructors[0]) },
      amount: 99,
      finalAmount: 99,
      status: "paid",
      method: "paypal",
      transactionId: "DEMO-1002",
      createdAt: "{{isoDays:-12}}",
    },
    {
      _id: "pay-3",
      userId: "u-student-omar",
      courseId: "course-1",
      course: { _id: "course-1", title: "Modern React from Scratch", instructor: userSummary(instructors[0]) },
      amount: 79,
      finalAmount: 79,
      status: "paid",
      method: "bank transfer",
      transactionId: "DEMO-1003",
      createdAt: "{{isoDays:-16}}",
    },
    {
      _id: "pay-4",
      userId: "u-student-omar",
      courseId: "course-3",
      course: { _id: "course-3", title: "Python for Data Analysis", instructor: userSummary(instructors[1]) },
      amount: 89,
      finalAmount: 89,
      status: "paid",
      method: "credit card",
      transactionId: "DEMO-1004",
      createdAt: "{{isoDays:-10}}",
    },
    {
      _id: "pay-5",
      userId: "u-student-nora",
      courseId: "course-5",
      course: { _id: "course-5", title: "Product Design Foundations", instructor: userSummary(instructors[0]) },
      amount: 69,
      finalAmount: 69,
      status: "pending",
      method: "bank transfer",
      transactionId: "DEMO-1005",
      createdAt: "{{isoDays:-1}}",
    },
  ];

  const billingAccounts = users.map((item, index) => ({
    _id: `billing-${item._id}`,
    userId: item._id,
    user: userSummary(item),
    balance: item.role === "student" ? 120 - index * 10 : 0,
    availableBalance: item.role === "instructor" ? 340 - index * 40 : 0,
    totalRevenue: item.role === "instructor" ? 1280 - index * 180 : 0,
    platformBalance: 4850,
    totalInstructorPayouts: 1240,
    totalStudentRefunds: 160,
    totalEarnings: item.role === "instructor" ? 1280 - index * 180 : 0,
    pendingAmount: item.role === "instructor" ? 85 : 0,
    currency: "USD",
  }));

  const billingTransactions = [
    { _id: "txn-1", userId: "u-student-lina", type: "credit", amount: 120, description: "Gift card credit", status: "completed", createdAt: "{{isoDays:-18}}" },
    { _id: "txn-2", userId: "u-student-lina", type: "debit", amount: 79, description: "Course payment", status: "completed", createdAt: "{{isoDays:-20}}" },
    { _id: "txn-3", userId: "u-student-omar", type: "debit", amount: 89, description: "Course payment", status: "completed", createdAt: "{{isoDays:-10}}" },
    { _id: "txn-4", userId: "u-instructor-sarah", type: "credit", amount: 420, description: "Instructor payout", status: "completed", createdAt: "{{isoDays:-7}}" },
    { _id: "txn-5", userId: "u-instructor-mark", type: "credit", amount: 310, description: "Instructor payout", status: "completed", createdAt: "{{isoDays:-6}}" },
    { _id: "txn-6", userId: "u-admin", type: "credit", amount: 79, description: "Platform commission", status: "completed", createdAt: "{{isoDays:-20}}" },
  ];

  const giftCards = [
    { _id: "gift-1", code: "MENTORA-25", amount: 25, giftCardType: "credit", isActive: true, userId: "u-student-lina", createdAt: "{{isoDays:-30}}" },
    { _id: "gift-2", code: "MENTORA-50", amount: 50, giftCardType: "credit", isActive: true, userId: "u-student-omar", createdAt: "{{isoDays:-25}}" },
    { _id: "gift-3", code: "MENTORA-100", amount: 100, giftCardType: "gift", isActive: true, userId: "", createdAt: "{{isoDays:-15}}" },
  ];

  const payoutRequests = [
    { _id: "payout-1", instructorId: "u-instructor-sarah", amount: 420, status: "pending", method: "Bank transfer", createdAt: "{{isoDays:-2}}" },
    { _id: "payout-2", instructorId: "u-instructor-mark", amount: 310, status: "approved", method: "Bank transfer", createdAt: "{{isoDays:-6}}" },
    { _id: "payout-3", instructorId: "u-instructor-sarah", amount: 180, status: "completed", method: "Bank transfer", createdAt: "{{isoDays:-20}}" },
  ];

  const refunds = [
    { _id: "refund-1", userId: "u-student-nora", user: userSummary(students[2]), type: "course", amount: 69, status: "pending", reason: "Course overlap", createdAt: "{{isoDays:-3}}" },
    { _id: "refund-2", userId: "u-instructor-mark", user: userSummary(instructors[1]), type: "admin_fee", amount: 30, status: "approved", reason: "Duplicate fee", createdAt: "{{isoDays:-8}}" },
    { _id: "refund-3", userId: "u-student-lina", user: userSummary(students[0]), type: "course", amount: 79, status: "rejected", reason: "Outside refund window", createdAt: "{{isoDays:-14}}" },
  ];

  const levels = [
    { _id: "level-1", name: "Beginner", order: 1, isActive: true, description: "Foundational courses", color: "green" },
    { _id: "level-2", name: "Intermediate", order: 2, isActive: true, description: "Applied practice", color: "blue" },
    { _id: "level-3", name: "Advanced", order: 3, isActive: true, description: "Deep specialization", color: "purple" },
    { _id: "level-4", name: "Expert", order: 4, isActive: false, description: "Coming soon", color: "gray" },
  ];

  const adminSettings = {
    platformName: "Mentora Courses",
    supportEmail: "support@mentora.demo",
    commissionRate: 15,
    currency: "USD",
    payment: {
      stripeEnabled: true,
      paypalEnabled: true,
      bankTransferEnabled: true,
      testMode: true,
      currency: "USD",
      platformFeePercent: 15,
    },
    paymentSettings: {
      instructorAnnualFee: 0,
      studentAdminFee: 0,
      globalDeductionPercentage: 0,
      stripeEnabled: true,
      paypalEnabled: true,
      directTransferEnabled: true,
      minimumPaymentAmount: 1,
      currency: "USD",
      autoEnrollOnCardPayment: true,
      autoEnrollOnPaypalPayment: true,
      requireAdminApprovalForDirectTransfer: true,
    },
    notifications: { email: true, inApp: true, push: false },
  };

  return {
    users,
    categories,
    courses,
    lessons,
    enrollments,
    wishlist: [
      { _id: 'wish-1', userId: 'u-student-lina', courseId: 'course-4', createdAt: '{{isoDays:-4}}' },
      { _id: 'wish-2', userId: 'u-student-nora', courseId: 'course-1', createdAt: '{{isoDays:-2}}' },
    ],
    cart: [{ _id: 'cart-1', userId: 'u-student-omar', courseId: 'course-2', addedAt: '{{isoDays:-1}}' }],
    progress: [
      { _id: 'progress-1', userId: 'u-student-lina', courseId: 'course-1', lessonId: 'lesson-1-1', completed: true, lastPosition: 0 },
      { _id: 'progress-2', userId: 'u-student-omar', courseId: 'course-3', lessonId: 'lesson-3-2', completed: true, lastPosition: 0 },
    ],
    courseInteractions,
    liveSessions,
    enrollmentRequests,
    instructorRequests,
    notifications,
    messages,
    grades,
    certificates,
    payments,
    billingAccounts,
    billingTransactions,
    giftCards,
    payoutRequests,
    refunds,
    levels,
    adminSettings,
  };
}

export function resolveDateMarkers(value) {
  if (typeof value === "string") {
    return value.replace(
      /\{\{(isoDays|dateDays):(-?\d+)\}\}/g,
      (_, kind, rawDays) => {
        const days = Number(rawDays);
        if (kind === "dateDays") {
          return new Date(Date.now() + days * DAY_MS).toLocaleDateString("en-US");
        }
        return isoDays(days);
      },
    );
  }

  if (Array.isArray(value)) {
    return value.map(resolveDateMarkers);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveDateMarkers(item)]),
    );
  }

  return value;
}
