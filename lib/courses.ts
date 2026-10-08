/*
  OceanCrest AI course library: the single source of truth for every course.
  Every page (catalog, course pages, home, diagnostic) reads from this file.

  To add a course: copy one entry, give it a unique id, and set track + category.
  Placeholders in [brackets] are still to be decided. Mindset titles are drafts (draft: true)
  until the mindset team confirms them.
*/

export type TrackId = "technical" | "mindset";
export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Palette = "hero" | "technical" | "mindset" | "dusk";

export interface Track { name: string; lead: string; leadTitle: string; photo: string }
export interface Category { id: string; track: TrackId; name: string; note: string }
export interface Course {
  id: string;
  title: string;
  track: TrackId;
  category: string;
  level: Level;
  type: "course" | "template";
  blurb: string;
  /** Take this one first. */
  prereq?: boolean;
  /** Working title, not confirmed yet. */
  draft?: boolean;
  featured?: boolean;
}
export interface ProgramStage { name: string; line: string; facts: string; modules: string[] }
export interface ProgramModule { t: string; d?: string; f?: string }
export interface Program {
  id: string;
  title: string;
  /** Position approximate: the title is a working title. */
  pa?: boolean;
  soon?: boolean;
  audience: string;
  summary: string;
  facts: string;
  palette: Palette;
  stages?: ProgramStage[];
  modules?: ProgramModule[];
}

export const TRACKS: Record<TrackId, Track> = {
  "technical": {
    "name": "Technical skills",
    "lead": "Ben Eydlin",
    "leadTitle": "Head of Growth & Learning",
    "photo": "/assets/img/team/square/ben-eydlin-v2.jpg"
  },
  "mindset": {
    "name": "Mindset & culture",
    "lead": "Cheryl Rykowski",
    "leadTitle": "Cultural AI Strategy Lead",
    "photo": "/assets/img/team/square/cheryl-rykowski.jpg"
  }
};

export const CATEGORIES: Category[] = [
  {
    "id": "foundations",
    "track": "technical",
    "name": "Foundations",
    "note": "Start here. The basics every employee needs."
  },
  {
    "id": "build",
    "track": "technical",
    "name": "Build something",
    "note": "Leave with a working tool, assistant or automation."
  },
  {
    "id": "department",
    "track": "technical",
    "name": "By department",
    "note": "AI applied to the work a specific team does."
  },
  {
    "id": "skills",
    "track": "technical",
    "name": "Specific skills",
    "note": "Short courses on one tool or task."
  },
  {
    "id": "templates",
    "track": "technical",
    "name": "Templates",
    "note": "Ready-to-use files with AI prompts built in."
  },
  {
    "id": "m-foundations",
    "track": "mindset",
    "name": "Foundations",
    "note": "How to think about AI at work."
  },
  {
    "id": "m-leading",
    "track": "mindset",
    "name": "Leading with AI",
    "note": "For owners and managers bringing AI to a team."
  },
  {
    "id": "m-culture",
    "track": "mindset",
    "name": "Culture & change",
    "note": "Habits, norms and trust across the company."
  }
];

export const COURSES: Course[] = [
  {
    "id": "ai-fundamentals",
    "title": "AI Fundamentals for Work",
    "track": "technical",
    "category": "foundations",
    "level": "Beginner",
    "type": "course",
    "prereq": true,
    "blurb": "Prompting, picking the right tool, what AI is good and bad at, and how to check its work."
  },
  {
    "id": "ai-assistant",
    "title": "Your AI Assistant",
    "track": "technical",
    "category": "foundations",
    "level": "Beginner",
    "type": "course",
    "blurb": "Set up ChatGPT, Claude or Copilot with custom instructions, projects and saved context so it knows your business and your role."
  },
  {
    "id": "ai-safety",
    "title": "AI Safety & Data Rules",
    "track": "technical",
    "category": "foundations",
    "level": "Beginner",
    "type": "course",
    "blurb": "What you can and can't paste into AI, client confidentiality, and how to write a simple company AI policy."
  },
  {
    "id": "connectors",
    "title": "Working with Connectors",
    "track": "technical",
    "category": "foundations",
    "level": "Beginner",
    "type": "course",
    "blurb": "Link AI to the tools you already use, like email, calendar, Drive and your CRM, so it works with real information."
  },
  {
    "id": "ai-c-suite",
    "title": "Build Your AI C-Suite",
    "track": "technical",
    "category": "build",
    "level": "Intermediate",
    "type": "course",
    "featured": true,
    "blurb": "Set up AI advisors for finance, marketing and operations, each with its own instructions and knowledge of your business."
  },
  {
    "id": "custom-gpts",
    "title": "Custom GPTs & Assistants",
    "track": "technical",
    "category": "build",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Build an internal assistant that answers questions from your own handbook, pricing sheet or policies."
  },
  {
    "id": "no-code-automation",
    "title": "No-Code Automation",
    "track": "technical",
    "category": "build",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Connect your apps with tools like Zapier, Make or n8n so routine work runs on its own."
  },
  {
    "id": "ai-agents",
    "title": "AI Agents for Small Business",
    "track": "technical",
    "category": "build",
    "level": "Advanced",
    "type": "course",
    "blurb": "Agents that handle multi-step work like research, inbox triage and scheduling, with a person approving key steps."
  },
  {
    "id": "copilot",
    "title": "Building with Copilot",
    "track": "technical",
    "category": "build",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Use Microsoft Copilot across Word, Excel, Outlook and Teams, and build simple agents in Copilot Studio."
  },
  {
    "id": "image-video",
    "title": "Image and Video Generation",
    "track": "technical",
    "category": "build",
    "level": "Beginner",
    "type": "course",
    "blurb": "Create on-brand images, product shots, social graphics and short videos."
  },
  {
    "id": "sales",
    "title": "AI for Sales",
    "track": "technical",
    "category": "department",
    "level": "Beginner",
    "type": "course",
    "blurb": "Prospect research, personalized outreach, call prep and proposal drafts."
  },
  {
    "id": "marketing",
    "title": "AI for Marketing",
    "track": "technical",
    "category": "department",
    "level": "Beginner",
    "type": "course",
    "blurb": "Content calendars, social posts, ad copy, SEO, and turning one piece of content into ten."
  },
  {
    "id": "finance",
    "title": "AI for Finance & Accounting",
    "track": "technical",
    "category": "department",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Reconciliations, report summaries, forecasting help and spreadsheet work."
  },
  {
    "id": "ops-hr",
    "title": "AI for Operations & HR",
    "track": "technical",
    "category": "department",
    "level": "Beginner",
    "type": "course",
    "blurb": "SOPs, onboarding documents, job posts, and meeting notes turned into action items."
  },
  {
    "id": "customer-service",
    "title": "AI for Customer Service",
    "track": "technical",
    "category": "department",
    "level": "Beginner",
    "type": "course",
    "blurb": "Reply drafts, FAQ assistants, ticket sorting and tone checks."
  },
  {
    "id": "data-analysis",
    "title": "AI for Data Analysis",
    "track": "technical",
    "category": "department",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Clean data, find patterns and build charts without writing code."
  },
  {
    "id": "negotiations",
    "title": "AI for Negotiations",
    "track": "technical",
    "category": "department",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Prepare for a negotiation, research the other side and rehearse it with AI role-play."
  },
  {
    "id": "research",
    "title": "AI for Research",
    "track": "technical",
    "category": "department",
    "level": "Beginner",
    "type": "course",
    "blurb": "Find, compare and summarize information fast, and check sources before you rely on them."
  },
  {
    "id": "project-managers",
    "title": "AI for Project Managers",
    "track": "technical",
    "category": "department",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Project plans, status updates, risk lists and meeting follow-ups."
  },
  {
    "id": "problem-solving",
    "title": "AI Problem Solving",
    "track": "technical",
    "category": "department",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Use AI as a thinking partner to break down problems, weigh options and stress-test decisions."
  },
  {
    "id": "writing",
    "title": "AI for Writing",
    "track": "technical",
    "category": "department",
    "level": "Beginner",
    "type": "course",
    "blurb": "Write clearer emails, reports and posts in your own voice, faster."
  },
  {
    "id": "pr",
    "title": "AI for PR",
    "track": "technical",
    "category": "department",
    "level": "Beginner",
    "type": "course",
    "blurb": "Press releases, media lists, pitch emails and responding when news breaks."
  },
  {
    "id": "excel-sheets",
    "title": "AI in Excel & Google Sheets",
    "track": "technical",
    "category": "skills",
    "level": "Beginner",
    "type": "course",
    "blurb": "Formulas, cleaning data, and dashboards built from messy exports."
  },
  {
    "id": "docs-decks",
    "title": "AI for Docs, Decks & Writing",
    "track": "technical",
    "category": "skills",
    "level": "Beginner",
    "type": "course",
    "blurb": "Proposals, reports and presentations in a fraction of the time."
  },
  {
    "id": "meeting-inbox",
    "title": "AI Meeting & Inbox Mastery",
    "track": "technical",
    "category": "skills",
    "level": "Beginner",
    "type": "course",
    "blurb": "Meeting note-takers, email drafting and getting your inbox under control."
  },
  {
    "id": "research-analysis",
    "title": "AI Research & Analysis",
    "track": "technical",
    "category": "skills",
    "level": "Intermediate",
    "type": "course",
    "blurb": "Competitor research, market sizing and summarizing long reports, with fact-checking built in."
  },
  {
    "id": "pitch-deck",
    "title": "Pitch Deck Template",
    "track": "technical",
    "category": "templates",
    "level": "Beginner",
    "type": "template",
    "blurb": "A ready-to-use pitch deck with an AI prompt for every slide."
  },
  {
    "id": "m-without-fear",
    "title": "AI Without the Fear",
    "track": "mindset",
    "category": "m-foundations",
    "level": "Beginner",
    "type": "course",
    "prereq": true,
    "draft": true,
    "blurb": "What AI is, what it is not, and why it is a tool for your people, not a replacement for them."
  },
  {
    "id": "m-your-job",
    "title": "What AI Means for Your Job",
    "track": "mindset",
    "category": "m-foundations",
    "level": "Beginner",
    "type": "course",
    "draft": true,
    "blurb": "[Description to come from the mindset team.]"
  },
  {
    "id": "m-human-first",
    "title": "Human First, AI Next",
    "track": "mindset",
    "category": "m-foundations",
    "level": "Beginner",
    "type": "course",
    "draft": true,
    "blurb": "[Description to come from the mindset team.]"
  },
  {
    "id": "m-leading-team",
    "title": "Leading an AI-Ready Team",
    "track": "mindset",
    "category": "m-leading",
    "level": "Intermediate",
    "type": "course",
    "draft": true,
    "blurb": "[Description to come from the mindset team.]"
  },
  {
    "id": "m-making-case",
    "title": "Making the Case for AI",
    "track": "mindset",
    "category": "m-leading",
    "level": "Intermediate",
    "type": "course",
    "draft": true,
    "blurb": "[Description to come from the mindset team.]"
  },
  {
    "id": "m-measuring",
    "title": "Measuring What AI Changes",
    "track": "mindset",
    "category": "m-leading",
    "level": "Intermediate",
    "type": "course",
    "draft": true,
    "blurb": "[Description to come from the mindset team.]"
  },
  {
    "id": "m-culture",
    "title": "Building an AI Culture",
    "track": "mindset",
    "category": "m-culture",
    "level": "Beginner",
    "type": "course",
    "draft": true,
    "blurb": "[Description to come from the mindset team.]"
  },
  {
    "id": "m-responsible",
    "title": "Responsible and Ethical AI Use",
    "track": "mindset",
    "category": "m-culture",
    "level": "Beginner",
    "type": "course",
    "draft": true,
    "blurb": "[Description to come from the mindset team.]"
  },
  {
    "id": "m-clients",
    "title": "Talking to Clients About AI",
    "track": "mindset",
    "category": "m-culture",
    "level": "Intermediate",
    "type": "course",
    "draft": true,
    "blurb": "[Description to come from the mindset team.]"
  }
];

export const courseById = (id: string): Course | undefined => COURSES.find((c) => c.id === id);
export const categoryById = (id: string): Category | undefined => CATEGORIES.find((c) => c.id === id);

/*
  PROGRAMS: the flagship courses already on the OceanCrest AI learning platform (from the live
  membership page, 2026-10). Module counts come from the platform; check ../OCAI-LMS before changing them.
  The certificate title is a working title (PA).
*/
export const PROGRAMS: Program[] = [
  {
    "id": "applied-ai",
    "title": "Applied AI — the OceanCrest Certificate",
    "pa": true,
    "audience": "The certificate track · everyone",
    "summary": "Foundations, practice and application, ending in something you built. Every module closes with a quiz.",
    "facts": "5 hours · 10 modules · 30 lessons",
    "palette": "technical",
    "stages": [
      {
        "name": "Foundations",
        "line": "Who you are before the tools show up.",
        "facts": "3 modules · 1 h 30",
        "modules": [
          "Leadership starts before you're told to.",
          "Reading the water: what AI actually is.",
          "How you think: judgment, fear, and resistance."
        ]
      },
      {
        "name": "Practice",
        "line": "The craft, hands on the keyboard.",
        "facts": "5 modules · 2 h 30",
        "modules": [
          "Prompting: talking to machines well.",
          "Mapping the work: inputs, triggers, decisions.",
          "Building your first automation.",
          "Your promise: brand, trust, and presence.",
          "Data, risk, and owning the outcome."
        ]
      },
      {
        "name": "Application",
        "line": "Prove it on something real.",
        "facts": "2 modules · 1 h 00",
        "modules": [
          "Diagnosis and proposal: consulting on your own operation.",
          "Capstone: build, deliver, and lead the conversation."
        ]
      }
    ]
  },
  {
    "id": "business-leaders",
    "title": "AI for Business Leaders",
    "audience": "For the leadership team",
    "summary": "What the technology actually does, how to lead an organization through adoption, and a 90-day plan you can defend to a board.",
    "facts": "15 hours · 6 modules · 25 lessons",
    "palette": "hero",
    "modules": [
      {
        "t": "The AI landscape.",
        "d": "What the technology actually is and isn't, the model landscape, why this arrived when it did, and reading the vendor market without the hype.",
        "f": "2 h 30 · 4 lessons"
      },
      {
        "t": "Leading through AI.",
        "d": "The leader's role in adoption, trust and policy going into the first all-hands, change management for skeptics, and talking to your board.",
        "f": "2 h 30 · 4 lessons"
      },
      {
        "t": "Tool literacy.",
        "d": "Prompting fundamentals for executives, working with documents and data, AI inside the stack you already own, and a lab building your first working workflow.",
        "f": "3 h · 5 lessons"
      },
      {
        "t": "Department playbooks.",
        "d": "HR and people ops, sales and marketing, finance and operations, then choosing your own first pilot.",
        "f": "2 h 30 · 4 lessons"
      },
      {
        "t": "Data, risk and governance.",
        "d": "Your data readiness baseline, privacy and vendor diligence, bias and human review, and a policy you can actually ship.",
        "f": "2 h · 4 lessons"
      },
      {
        "t": "The 90-day adoption plan.",
        "d": "Scoring your organization, picking pilots that pay, measuring what mattered, and a workshop that leaves with your own 90-day plan.",
        "f": "2 h 30 · 4 lessons"
      }
    ]
  },
  {
    "id": "making-waves",
    "title": "Making Waves — the Mastery Course",
    "audience": "For owners and their leadership teams",
    "summary": "Built from Chris Kuselias's field manual. Nothing is graded: each module ends in something you made.",
    "facts": "5 hours · 10 modules · 30 lessons · ungraded",
    "palette": "mindset",
    "modules": [
      {
        "t": "Know your outcome: clarity creates momentum."
      },
      {
        "t": "Master your mindset: the inner game and the emotional edge."
      },
      {
        "t": "From idea to impact: define it, design it, deliver it."
      },
      {
        "t": "Market mastery: demand, timing and being the only."
      },
      {
        "t": "The AI undertow: not a taker, but a partner."
      },
      {
        "t": "Become your own brand: identity, UVP and the pitch."
      },
      {
        "t": "Master your time and energy: the founder's advantage."
      },
      {
        "t": "Money, risk and leverage: directing your resources."
      },
      {
        "t": "Leadership: lead yourself, lead others, lead the mission."
      },
      {
        "t": "The final wave: your code, your plan, your legacy."
      }
    ]
  },
  {
    "id": "hr-teams",
    "title": "AI for HR Teams",
    "soon": true,
    "audience": "Coming soon · department track",
    "summary": "Recruiting workflows, fairly; policy, onboarding and the handbook; people analytics without overreach.",
    "facts": "6 hours · 3 modules",
    "palette": "dusk"
  },
  {
    "id": "sales-teams",
    "title": "AI for Sales Teams",
    "soon": true,
    "audience": "Coming soon · department track",
    "summary": "Prospecting and research at scale, personalization that doesn't feel automated, and pipeline hygiene.",
    "facts": "6 hours · 3 modules",
    "palette": "technical"
  }
];
