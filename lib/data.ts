// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Bosh sahifa", href: "#hero"      },
  { label: "Men haqimda", href: "#haqimda"   },
  { label: "Xizmatlar",   href: "#nimalar"   },
  { label: "Loyihalar",   href: "#loyihalar" },
  { label: "Aloqa",       href: "#aloqa"     },
];

// ─── Marquee ──────────────────────────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  "Python", "Django", "Next.js", "TypeScript", "React",
  "OpenAI", "LangChain", "Telegram Bot", "PostgreSQL",
  "Redis", "Docker", "Tailwind CSS", "Framer Motion",
  "REST API", "Celery", "FastAPI", "aiogram", "AWS",
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    number: "01",
    title: "Web Ilovalar",
    desc: "Next.js va React asosida yuqori tezlikdagi, SEO-optimallashtirilgan zamonaviy web ilovalar.",
    tags: ["Next.js", "TypeScript", "REST API"],
    icon: "Globe",
  },
  {
    number: "02",
    title: "AI Avtomatika",
    desc: "OpenAI, LangChain va maxsus ML modellari orqali biznes jarayonlarini avtomatlashtirish.",
    tags: ["OpenAI", "LangChain", "Python"],
    icon: "Brain",
  },
  {
    number: "03",
    title: "Backend & API",
    desc: "Django REST Framework, FastAPI bilan kuchli, xavfsiz va kengaytiriluvchi API arxitekturalari.",
    tags: ["Django", "FastAPI", "PostgreSQL"],
    icon: "Server",
  },
  {
    number: "04",
    title: "Telegram Botlar",
    desc: "Biznes uchun aqlli Telegram botlar va Mini App'lar — to'lov tizimi bilan integratsiya.",
    tags: ["Telegram API", "aiogram", "Redis"],
    icon: "MessageSquare",
  },
  {
    number: "05",
    title: "EduTech Yechimlar",
    desc: "Ta'lim platformalari, LMS tizimlar va interaktiv o'quv muhitlari.",
    tags: ["LMS", "Video", "Analytics"],
    icon: "GraduationCap",
  },
  {
    number: "06",
    title: "Dashboard & Analytics",
    desc: "Real vaqt ma'lumotlar panellari, biznes hisobotlari va monitoring tizimlari.",
    tags: ["Charts", "Real-time", "Export"],
    icon: "BarChart3",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "eduflow",
    number: "01",
    title: "EduFlow LMS",
    category: "EduTech",
    year: "2024",
    desc: "O'quvchilar va o'qituvchilar uchun to'liq LMS platforma — video darslar, testlar va sertifikat tizimi.",
    tags: ["Next.js", "Django", "PostgreSQL", "AWS"],
    accent: "#2563EB",
    status: "Live",
  },
  {
    id: "greentrack",
    number: "02",
    title: "GreenTrack",
    category: "GreenTech",
    year: "2024",
    desc: "Sanoat korxonalari uchun real vaqt energiya monitoringi va karbon izi hisoblash tizimi.",
    tags: ["Python", "FastAPI", "React", "IoT"],
    accent: "#10B981",
    status: "Live",
  },
  {
    id: "shopbot",
    number: "03",
    title: "ShopBot Pro",
    category: "E-commerce",
    year: "2023",
    desc: "Telegram orqali to'liq e-commerce — mahsulot katalogi, savat, Payme/Click to'lov integratsiyasi.",
    tags: ["aiogram", "Django", "Redis", "Payme"],
    accent: "#8B5CF6",
    status: "Live",
  },
  {
    id: "autoflow",
    number: "04",
    title: "AutoFlow CRM",
    category: "SaaS",
    year: "2024",
    desc: "Kichik biznes uchun AI-asosli CRM — mijoz segmentatsiyasi, avtomatik email va prognoz tahlili.",
    tags: ["OpenAI", "Django", "Next.js", "Celery"],
    accent: "#F59E0B",
    status: "Beta",
  },
] as const;

// ─── Process Steps ────────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    desc: "Biznes maqsadlari, texnik talablar va foydalanuvchi stsenariylari tahlili.",
  },
  {
    number: "02",
    title: "Architecture",
    desc: "Tizim arxitekturasi, ma'lumotlar modeli va texnologiyalar to'plami loyihalash.",
  },
  {
    number: "03",
    title: "Build",
    desc: "Iterativ agile-sprintlar bilan frontend, backend va AI integratsiyasi.",
  },
  {
    number: "04",
    title: "Deploy",
    desc: "CI/CD pipeline, monitoring va production muhiti sozlash.",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { value: 30,  suffix: "+", label: "Loyiha",      sub: "muvaffaqiyatli yetkazilgan" },
  { value: 3,   suffix: "+", label: "Yil tajriba", sub: "Python & Django ecosystem"  },
  { value: 3,   suffix: "",  label: "Soha",        sub: "EduTech · GreenTech · E-com" },
  { value: 100, suffix: "%", label: "Sifat",       sub: "har bir deliverable uchun"  },
];

// ─── Expertise Stack ──────────────────────────────────────────────────────────
export const STACK = [
  { label: "Python / Django",  desc: "Backend & API",  num: "01", level: 95 },
  { label: "AI / OpenAI",      desc: "Avtomatika",     num: "02", level: 88 },
  { label: "Next.js / React",  desc: "Frontend",       num: "03", level: 85 },
  { label: "Telegram Bot API", desc: "Bot & mini-app", num: "04", level: 92 },
];

export const EXPERTISE_AREAS = [
  { title: "Full-Stack",   tags: ["Django", "Next.js", "PostgreSQL", "REST"] },
  { title: "AI & ML",      tags: ["OpenAI", "LangChain", "Embeddings", "RAG"] },
  { title: "Automation",   tags: ["Celery", "aiogram", "Webhooks", "CI/CD"] },
  { title: "EduTech",      tags: ["LMS", "Video", "Gamification", "Analytics"] },
];

// ─── Lab Items ────────────────────────────────────────────────────────────────
export const LAB_ITEMS = [
  {
    number: "L01",
    title: "AI Document Parser",
    desc: "PDF va Word hujjatlardan ma'lumot chiqaruvchi LLM-asosli vosita.",
    tech: ["Python", "LangChain", "OpenAI"],
    status: "stable" as const,
  },
  {
    number: "L02",
    title: "Smart Scheduler Bot",
    desc: "NLP orqali tabiiy til buyruqlarini tushunadigan Telegram jadval boti.",
    tech: ["aiogram", "spaCy", "Redis"],
    status: "stable" as const,
  },
  {
    number: "L03",
    title: "Price Prediction API",
    desc: "E-commerce uchun ML-asosli narx prognoz qilish REST API.",
    tech: ["FastAPI", "scikit-learn", "Docker"],
    status: "stable" as const,
  },
  {
    number: "L04",
    title: "Real-time Dashboard",
    desc: "WebSocket orqali jonli ma'lumotlar vizualizatsiya paneli.",
    tech: ["Next.js", "WebSocket", "D3.js"],
    status: "experimental" as const,
  },
  {
    number: "L05",
    title: "Code Review Bot",
    desc: "GitHub PR uchun AI-asosli avtomatik kod tekshirish boti.",
    tech: ["GitHub API", "GPT-4", "Python"],
    status: "beta" as const,
  },
  {
    number: "L06",
    title: "SEO Analyzer",
    desc: "Sayt sahifalarini SEO ball bilan baholovchi vosita.",
    tech: ["FastAPI", "BeautifulSoup", "OpenAI"],
    status: "beta" as const,
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: "eduflow",
    badge: "EduTech",
    title: "EduFlow",
    tagline: "Ta'lim platformasi",
    desc: "Maktablar va kurslar uchun tayyor LMS — darslar, testlar, sertifikatlar va analitika.",
    features: [
      "Video hosting va streaming",
      "Interaktiv test moduli",
      "Sertifikat generatsiya",
      "O'qituvchi/o'quvchi paneli",
    ],
    accent: "#2563EB",
    status: "Live",
    year: "2024",
  },
  {
    id: "greentrack",
    badge: "GreenTech",
    title: "GreenTrack",
    tagline: "Energiya monitoringi",
    desc: "Sanoat korxonalari uchun real vaqt energiya iste'moli kuzatish va tahlil tizimi.",
    features: [
      "IoT sensor integratsiya",
      "Real vaqt grafik",
      "Karbon izi hisoblagich",
      "PDF hisobotlar",
    ],
    accent: "#10B981",
    status: "Live",
    year: "2024",
  },
  {
    id: "autoflow",
    badge: "SaaS CRM",
    title: "AutoFlow CRM",
    tagline: "Aqlli CRM",
    desc: "Kichik biznes uchun AI yordamida mijoz boshqaruvi va savdo avtomatikasi.",
    features: [
      "AI mijoz segmentatsiya",
      "Avtomatik email kampaniya",
      "Savdo prognozi",
      "Telegram integratsiya",
    ],
    accent: "#F59E0B",
    status: "Beta",
    year: "2024",
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    id: "ai-django-production",
    badge: "AI Engineering",
    title: "Django va OpenAI: Produksiyaga tayyor AI integratsiya",
    excerpt:
      "Real loyihada LLM integratsiyasida uchraydigan asosiy muammolar va yechimi — rate limiting, xarajat optimizatsiya va xato qayta ishlash.",
    date: "2024-12-15",
    readTime: "8 daqiqa",
    accent: "#2563EB",
  },
  {
    id: "nextjs-app-router",
    badge: "Frontend",
    title: "Next.js App Router: Server Components bilan ishlash strategiyasi",
    excerpt:
      "Client va Server Components orasidagi to'g'ri chegara qayerda? Amaliy misollar orqali arxitektura qarorlari.",
    date: "2024-11-28",
    readTime: "6 daqiqa",
    accent: "#38BDF8",
  },
  {
    id: "telegram-bot-case",
    badge: "Automation",
    title: "Telegram Bot real case: 10,000+ foydalanuvchi bilan ishlash",
    excerpt:
      "aiogram v3, Redis caching va webhook arxitekturasi yordamida yuqori yukli bot qurish tajribasi.",
    date: "2024-11-10",
    readTime: "10 daqiqa",
    accent: "#8B5CF6",
  },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/akramjonovich",         icon: "Github"   },
  { label: "Telegram", href: "https://t.me/Lazzyproger",                 icon: "Send"     },
  { label: "LinkedIn", href: "https://linkedin.com/in/akramjonovich",    icon: "Linkedin" },
];
