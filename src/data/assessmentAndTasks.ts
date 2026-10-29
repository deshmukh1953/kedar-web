import { AssessmentQuestion, TaskItem } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "In Node.js event-driven architecture, what handles asynchronous I/O operations under the hood?",
    options: ["V8 Execution Thread", "libuv Thread Pool", "Chrome DevTools Protocol", "Kernel Sync Loop"],
    correctIndex: 1,
    explanation: "libuv provides the cross-platform event loop and manages asynchronous worker threads for file/network I/O."
  },
  {
    id: 2,
    question: "When scaling REST APIs with rate limiting, why is Redis atomic INCR preferred over in-memory JavaScript Maps?",
    options: ["Redis compiles directly into C++", "In-memory maps leak memory and reset upon multi-node restarts or horizontal scaling", "Redis requires no network connection", "In-memory maps do not support integers"],
    correctIndex: 1,
    explanation: "Distributed multi-instance servers share a single Redis cluster state, preventing localized memory leaks and bypassing rate limits."
  },
  {
    id: 3,
    question: "Which HTTP status code should be returned when a client exceeds their API rate quota?",
    options: ["401 Unauthorized", "403 Forbidden", "429 Too Many Requests", "503 Service Unavailable"],
    correctIndex: 2,
    explanation: "HTTP 429 Too Many Requests indicates the user has sent too many requests in a given amount of time."
  },
  {
    id: 4,
    question: "What is the primary purpose of a database transaction isolation level 'SERIALIZABLE'?",
    options: ["To maximize queries per second", "To completely prevent dirty reads, non-repeatable reads, and phantom reads", "To compress database disk space", "To encrypt tables with AES-256"],
    correctIndex: 1,
    explanation: "SERIALIZABLE is the highest isolation level, executing transactions sequentially to prevent all concurrency anomalies."
  },
  {
    id: 5,
    question: "In React 18, what hook is used to defer non-urgent state updates and keep the input responsive?",
    options: ["useDeferredValue / useTransition", "useMemo", "useCallback", "useLayoutEffect"],
    correctIndex: 0,
    explanation: "useTransition and useDeferredValue let you mark state updates as non-urgent transitions in React concurrent mode."
  },
  {
    id: 6,
    question: "How does JWT authentication maintain statelessness across microservices?",
    options: ["By saving every token inside server RAM", "By cryptographic signature verification without needing a central session database lookup", "By querying the browser cookies on the backend", "By storing plain passwords in headers"],
    correctIndex: 1,
    explanation: "The payload and signature can be verified cryptographically by any service holding the shared secret or public key."
  },
  {
    id: 7,
    question: "What is the key advantage of Docker multi-stage builds?",
    options: ["Allows running multiple OS kernels in one container", "Separates build-time dependencies from the final lightweight production image", "Auto-pushes images to DockerHub without credentials", "Eliminates need for Dockerfile"],
    correctIndex: 1,
    explanation: "Multi-stage builds leave behind compilers and dev tools, resulting in tiny, secure production runtime containers."
  },
  {
    id: 8,
    question: "In Git, what is the best practice to keep a feature branch updated with main before raising a PR?",
    options: ["git push --force origin main", "git checkout -b main; git reset --hard", "git fetch origin && git rebase origin/main (or git merge)", "Delete local repository and clone fresh"],
    correctIndex: 2,
    explanation: "Rebasing onto origin/main ensures linear history and lets you resolve conflicts locally prior to code review."
  },
  {
    id: 9,
    question: "Which database index structure is commonly used by PostgreSQL for equality and range comparisons?",
    options: ["B-Tree Index", "Hash Index only", "Bitmap only", "Bloom Filter"],
    correctIndex: 0,
    explanation: "B-Tree is the default, highly balanced index structure suitable for <, <=, =, >=, and > query clauses."
  },
  {
    id: 10,
    question: "What does the 'S' in SOLID design principles represent?",
    options: ["Scalable Architecture", "Single Responsibility Principle", "System Optimization", "Serverless Deployment"],
    correctIndex: 1,
    explanation: "Single Responsibility Principle states that a class or module should have one, and only one, reason to change."
  },
  {
    id: 11,
    question: "In Kubernetes, which object ensures that a specified number of pod replicas are running at all times?",
    options: ["Ingress Controller", "ReplicaSet / Deployment", "ConfigMap", "ClusterRoleBinding"],
    correctIndex: 1,
    explanation: "Deployments manage ReplicaSets, which continually reconcile current state with the desired replica count."
  },
  {
    id: 12,
    question: "What prevents Cross-Site Scripting (XSS) when rendering user input in modern React applications?",
    options: ["Automatic HTML escaping by JSX by default", "CSS flexbox layouts", "Running Node.js in strict mode", "Using TypeScript instead of JavaScript"],
    correctIndex: 0,
    explanation: "JSX escapes values embedded in expressions before rendering them, mitigating XSS injections unless dangerouslySetInnerHTML is used."
  },
  {
    id: 13,
    question: "What is an idempotent HTTP method in API design?",
    options: ["A method that always throws an error", "A method where making multiple identical requests has the same intended effect as a single request (e.g. GET, PUT, DELETE)", "A method that cannot be cached", "A method with no payload"],
    correctIndex: 1,
    explanation: "GET, HEAD, PUT, and DELETE are idempotent because repeated identical executions leave server resource state unchanged."
  },
  {
    id: 14,
    question: "Why should database connection pooling be used in production backend services?",
    options: ["To avoid the high TCP handshake and authentication overhead of opening new DB connections for each request", "To encrypt network traffic", "To replace SQL queries with GraphQL", "To store DB rows in memory"],
    correctIndex: 0,
    explanation: "Reusing active pooled connections minimizes resource exhaustion and dramatically reduces query latency."
  },
  {
    id: 15,
    question: "In modern CI/CD, what is the role of automated pull request status checks?",
    options: ["To block merges if linting, unit tests, or security scanning fails", "To publish the website to production before review", "To email customers about new features", "To delete old Git commits"],
    correctIndex: 0,
    explanation: "Branch protection rules require all CI status checks (unit tests, coverage, security scans) to succeed before trainer sign-off."
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    number: 1,
    title: 'Git Architecture & Production REST API Foundation',
    designation: 'Full-Stack Developer',
    duration: 1,
    modality: 'individual',
    description: 'Set up strict ESLint/Prettier, initialize express or fastify with structured domain directories, and implement JWT-authenticated health & user endpoints.',
    requirements: [
      'GitHub repository with README and branch protection strategy',
      'Passing unit tests (minimum 80% coverage)',
      'Screenshot of Postman / ThunderClient API response and passing terminal tests',
      'Include exact commit SHA and GitHub link in submission'
    ],
    mandatory: true,
    status: 'unlocked'
  },
  {
    id: 'task-2',
    number: 2,
    title: 'PostgreSQL Relational Schema & Redis Sliding-Window Rate Limiter',
    designation: 'Full-Stack Developer',
    duration: 1,
    modality: 'individual',
    description: 'Design normalized SQL migrations with indexes, and build a high-throughput Redis rate-limiting middleware that prevents API abuse under load.',
    requirements: [
      'Redis atomic INCR and EXPIRE sliding window implementation',
      'Prisma or Drizzle migrations with compound indexes',
      'Screenshot of Redis CLI monitor / terminal showing TTL countdown',
      'GitHub PR link with test suite execution'
    ],
    mandatory: true,
    status: 'locked'
  },
  {
    id: 'task-3',
    number: 3,
    title: 'Full-Stack Cloud Architecture & Final Capstone Defense',
    designation: 'Full-Stack Developer',
    duration: 1,
    modality: 'individual',
    description: 'Dockerize the application using multi-stage builds, deploy to cloud PaaS/Kubernetes, set up GitHub Actions CI/CD, and present architectural defense.',
    requirements: [
      'Live deployed production URL with SSL certificate',
      'Dockerfile with multi-stage build under 120MB',
      'Screenshot of GitHub Actions CI/CD green pipeline and cloud container dashboard',
      'GitHub repository link with architecture diagram in README'
    ],
    mandatory: true,
    status: 'locked'
  }
];
