/**
 * The four core Talent Trek services. Single source of truth for the home
 * bento grid, the nav mega-dropdown, the services overview, the footer and
 * the four /services/[slug] detail pages.
 */

export type ServiceIcon = "mic" | "chat" | "drive" | "agent";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServiceUseCase {
  industry: string;
  title: string;
  body: string;
}

export interface ServiceFeature {
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  short: string;
  icon: ServiceIcon;
  tags: string[];
  problem: { title: string; body: string; points: string[] };
  features: ServiceFeature[];
  howItWorks: ServiceStep[];
  useCases: ServiceUseCase[];
  faq: ServiceFaq[];
}

export const SERVICES: Service[] = [
  {
    slug: "voice-commerce",
    name: "Voice Commerce",
    tagline: "Talk, pay, done.",
    short:
      "Conversational ordering, payment and support over voice — for delivery, pickup and high-volume call centres.",
    icon: "mic",
    tags: ["Takeaway ordering", "Payments", "Call deflection"],
    problem: {
      title: "Every unanswered call is revenue walking out the door",
      body: "Front-of-house teams juggle phones mid-service, and after hours callers hit voicemail. Voice Commerce answers on the first ring, takes the order or booking, takes payment, and confirms — in natural Australian English, at any hour.",
      points: [
        "Missed calls during peak service windows",
        "After-hours orders lost to voicemail",
        "Staff pulled off the floor to answer phones",
        "Long hold times pushing regulars to competitors",
      ],
    },
    features: [
      {
        title: "Natural Australian voices",
        body: "Warm, locally-accented speech that regulars feel comfortable talking to — no robotic menu trees.",
      },
      {
        title: "Orders and payments",
        body: "Takes the order, upsells sensibly, and takes card payment over the phone with receipts by SMS or email.",
      },
      {
        title: "Real-time POS sync",
        body: "Orders land straight in your POS or kitchen display — no re-keying, no double-handling.",
      },
      {
        title: "Smart call routing",
        body: "Complex or sensitive calls hand off to your team with full context attached.",
      },
      {
        title: "Accessible by design",
        body: "A lifeline for customers who can't or won't use apps — voice remains the most inclusive channel.",
      },
      {
        title: "Live analytics",
        body: "Call volume, containment rate, average order value and peak windows — visible from day one.",
      },
    ],
    howItWorks: [
      {
        title: "Connect",
        body: "Point your existing number (or a new one) at the platform and link your POS or booking system.",
      },
      {
        title: "Train",
        body: "We tune the assistant to your menu, prices, hours and house phrases — approved by you before go-live.",
      },
      {
        title: "Launch",
        body: "Go live for a soft-launch window with human backup, then switch on fully autonomous answering.",
      },
      {
        title: "Learn",
        body: "Monthly reviews of transcripts and outcomes keep the assistant sharp as your menu changes.",
      },
    ],
    useCases: [
      {
        industry: "Hospitality",
        title: "The reservation line that never sleeps",
        body: "Guests book, amend or cancel tables at 10pm on a Sunday — and the team walks into a clean booking sheet on Monday.",
      },
      {
        industry: "Retail",
        title: "Phone orders without the hold music",
        body: "Click-and-collect queries, stock checks and phone orders handled on the spot, with payment taken in the call.",
      },
      {
        industry: "Food & Beverage",
        title: "Delivery and pickup, fully automated",
        body: "Peak-hour order spikes overflow to voice instead of dropping — average order value holds because the AI upsells consistently.",
      },
    ],
    faq: [
      {
        q: "Will customers know they're talking to an AI?",
        a: "We're upfront by design — the assistant introduces itself naturally and offers a human hand-off at any point. Most callers simply care that the task gets done fast.",
      },
      {
        q: "Can it really take payments over the phone?",
        a: "Yes. Card payments are processed through your payment gateway with tokenised, PCI-aware handling — no card numbers are stored on our platform.",
      },
      {
        q: "What happens when it doesn't understand a caller?",
        a: "It asks a clarifying question first, and if the conversation still can't be resolved it transfers to your team with the transcript and caller details attached.",
      },
      {
        q: "Does it work with our POS or booking system?",
        a: "We integrate with the major POS, booking and delivery platforms, plus custom APIs. If your system has an interface, we can usually connect it.",
      },
      {
        q: "How long does a deployment take?",
        a: "Most voice commerce deployments go live within 4–6 weeks, including menu training, payment setup and a supervised soft launch.",
      },
    ],
  },
  {
    slug: "chat-ai-automotive",
    name: "Chat AI Automotive",
    tagline: "Books work, not just chats.",
    short:
      "Service bookings, parts enquiries and showroom chats — automated across phone, web and SMS.",
    icon: "chat",
    tags: ["Service booking", "Parts lookup", "Web chat"],
    problem: {
      title: "Your service department is losing bookings it never hears about",
      body: "After-hours browsers become tomorrow's competitors' bookings. Chat AI Automotive answers every web chat, SMS and enquiry the moment it arrives — quoting, booking and qualifying so your advisors start the day with a full schedule.",
      points: [
        "Website enquiries going cold overnight and on weekends",
        "Advisors tied up on repetitive booking calls",
        "Parts price queries taking days to answer",
        "No follow-up on quotes that stall",
      ],
    },
    features: [
      {
        title: "24/7 service booking",
        body: "Books services and repairs straight into your scheduler with rego lookup and correct labour times.",
      },
      {
        title: "Parts and labour quotes",
        body: "Answers 'how much for…' questions instantly from your parts catalogue and pricing rules.",
      },
      {
        title: "SMS follow-ups",
        body: "Automatic reminders, quote chases and booking confirmations that read like a human wrote them.",
      },
      {
        title: "DMS integration",
        body: "Syncs with your dealer management system so customer and vehicle records stay in one place.",
      },
      {
        title: "After-hours lead capture",
        body: "Every after-hours enquiry is qualified, logged and queued for your team's morning briefing.",
      },
      {
        title: "Test-drive scheduling",
        body: "Books test drives against real loan-car and staff availability — no double-ups.",
      },
    ],
    howItWorks: [
      {
        title: "Map",
        body: "We map your booking rules, labour rates, parts catalogue and the questions your customers actually ask.",
      },
      {
        title: "Connect",
        body: "The assistant is wired to your DMS, calendar and SMS platform with scoped, audited access.",
      },
      {
        title: "Launch",
        body: "Web chat, SMS and (optionally) phone go live with supervised learning on your real enquiries.",
      },
      {
        title: "Grow",
        body: "Monthly tuning based on transcripts, booking outcomes and emerging intents keeps conversion climbing.",
      },
    ],
    useCases: [
      {
        industry: "Dealership service",
        title: "Mornings start booked, not behind",
        body: "Overnight enquiries wake up as confirmed bookings in your scheduler, with rego, contact details and symptoms captured.",
      },
      {
        industry: "Parts department",
        title: "Quotes in seconds, not days",
        body: "Trade and retail parts queries get instant answers from your catalogue — and a logged lead when it's a special order.",
      },
      {
        industry: "Independent workshop",
        title: "Big-department polish on a small-team budget",
        body: "One mechanic and one service advisor run like a five-person front counter, because the routine never reaches a human.",
      },
    ],
    faq: [
      {
        q: "Which systems does it integrate with?",
        a: "Major DMS and workshop scheduling platforms plus custom APIs — bookings, customer records and quotes stay in your system of record.",
      },
      {
        q: "Will it give wrong prices or book wrong times?",
        a: "It only quotes from your approved pricing rules and books against your real availability. Anything outside the rules is escalated to your team.",
      },
      {
        q: "Does it work on SMS as well as web chat?",
        a: "Yes — web chat, SMS and Messenger share one brain, so a conversation can start on one channel and finish on another.",
      },
      {
        q: "What about privacy and customer data?",
        a: "Data stays scoped to what the assistant needs, access is audited, and we comply with the Australian Privacy Principles.",
      },
      {
        q: "How is this different from a basic website chatbot?",
        a: "It takes action — it checks real availability, quotes real prices, writes real bookings and follows up, instead of just answering FAQs.",
      },
    ],
  },
  {
    slug: "dynamic-drivethru",
    name: "Dynamic DriveThru",
    tagline: "The lane that sells.",
    short:
      "Menu-adaptive AI ordering for quick-service restaurants — faster lanes, smoother upsells, lower staff load.",
    icon: "drive",
    tags: ["Menu adaptive", "Upsell", "Throughput"],
    problem: {
      title: "The drive-thru is your busiest, most stressful revenue line",
      body: "Peak-hour lanes back up, headsets get dropped mid-order, and upsells depend on whoever's having the busiest shift. Dynamic DriveThru takes every order, every hour, at full menu accuracy — and never has a bad day.",
      points: [
        "Lane queues growing faster than staff can serve",
        "Order errors costing remakes and refunds",
        "Inconsistent upsells between shifts",
        "Headset fatigue and staff turnover",
      ],
    },
    features: [
      {
        title: "Menu-adaptive ordering",
        body: "Sold-out items, price changes and limited-time offers flow through instantly — the AI never sells what you can't make.",
      },
      {
        title: "Consistent, gentle upsells",
        body: "Every order gets the same polite meal-deal and extras prompts, matched to what's actually in the cart.",
      },
      {
        title: "All-conditions accuracy",
        body: "Tuned for lane noise, wind, idling engines and drive-through accents — barge-in and all.",
      },
      {
        title: "Multi-lane support",
        body: "Two lanes, one brain. Orders route to the right kitchen line with correct timing.",
      },
      {
        title: "POS and KDS integration",
        body: "Orders land in your POS and kitchen display exactly like a cashier entered them.",
      },
      {
        title: "Live lane analytics",
        body: "Service time, average basket, upsell rate and peak windows — per lane, per hour, per daypart.",
      },
    ],
    howItWorks: [
      {
        title: "Integrate",
        body: "We connect the platform to your POS, kitchen displays and menu board data feed.",
      },
      {
        title: "Calibrate",
        body: "The assistant learns your menu, combo rules and house phrasing, then takes test orders in a live lane.",
      },
      {
        title: "Launch",
        body: "Cut over lane by lane with staff backup on the headset, then hand the lane to the AI full-time.",
      },
      {
        title: "Optimise",
        body: "We review transcripts and lane metrics weekly for the first month, tuning prompts and upsell rules.",
      },
    ],
    useCases: [
      {
        industry: "QSR single lane",
        title: "Faster lane, fuller baskets",
        body: "Order-taking time drops and average basket rises because the AI offers the right add-on every single time.",
      },
      {
        industry: "Multi-lane flagship",
        title: "Two lanes, one standard",
        body: "Both lanes speak with one voice, route to the right line, and report side-by-side so you know which lane wins.",
      },
      {
        industry: "24-hour drive-thru",
        title: "Overnight without the night-staff cost",
        body: "The 1am menu is just as accurate as the 1pm menu — and the late-night regulars get the same polite service.",
      },
    ],
    faq: [
      {
        q: "What happens when a customer has a truly unusual order?",
        a: "The assistant asks clarifying questions; if the order is still outside the rules, it flags a staff member to finish the order on the headset.",
      },
      {
        q: "Does it cope with heavy accents and noisy lanes?",
        a: "Yes — the speech models are tuned for Australian conditions including lane noise, and accuracy is measured continuously against completed orders.",
      },
      {
        q: "Can it handle sold-out items and limited offers?",
        a: "Instantly. Menu changes, sold-outs and limited-time offers flow through from your POS or menu feed the moment they change.",
      },
      {
        q: "How does payment work in the lane?",
        a: "Payment stays exactly as it is today — cash at the window or card at the reader. The AI handles the ordering, not the tender.",
      },
      {
        q: "What does a rollout cost the operation during changeover?",
        a: "Lanes cut over one at a time with staff backup for a supervised window, so service continuity is protected through the transition.",
      },
    ],
  },
  {
    slug: "ai-agent",
    name: "AI Agent",
    tagline: "Acts, with guardrails.",
    short:
      "Autonomous agents that handle enquiries end to end — and hand off to humans only when it matters.",
    icon: "agent",
    tags: ["Enquiry triage", "Back-office", "Hand-off"],
    problem: {
      title: "Your team drowns in routine while the important work waits",
      body: "Repetitive enquiries, data entry and follow-ups consume the hours that growth needs. AI Agents take the routine end to end — safely, within guardrails you define — and hand off to humans with full context when judgement is required.",
      points: [
        "The same twenty questions answered every day",
        "Copy-paste admin between systems eating the week",
        "Follow-ups slipping because nobody owns them",
        "Fear of automation because nothing is auditable",
      ],
    },
    features: [
      {
        title: "Enquiry triage",
        body: "Classifies, answers and resolves routine enquiries across email, chat and voice — and logs everything.",
      },
      {
        title: "Actions with guardrails",
        body: "Books, updates, refunds or reschedules only within limits you set, with approval steps where you want them.",
      },
      {
        title: "Human hand-off",
        body: "Passes the full conversation and state to your team's tools — nobody ever asks a customer to repeat themselves.",
      },
      {
        title: "CRM and calendar actions",
        body: "Creates contacts, logs notes, sets follow-ups and books appointments as part of the conversation.",
      },
      {
        title: "Scoped permissions",
        body: "Least-privilege access to each system it touches, revocable per action, with nothing it can do outside scope.",
      },
      {
        title: "Full audit trail",
        body: "Every action, decision and hand-off is logged and searchable — accountability by default.",
      },
    ],
    howItWorks: [
      {
        title: "Scope",
        body: "We define exactly what the agent may do, which systems it touches and where humans stay in the loop.",
      },
      {
        title: "Connect",
        body: "Scoped, least-privilege integrations are wired to your CRM, calendar and service desk.",
      },
      {
        title: "Deploy",
        body: "The agent starts on a single, contained workflow and proves itself with real traffic and full logging.",
      },
      {
        title: "Expand",
        body: "As trust and metrics grow, we extend its scope one workflow at a time — never big-bang.",
      },
    ],
    useCases: [
      {
        industry: "Healthcare",
        title: "A front desk that never puts anyone on hold",
        body: "Appointments, reminders and general enquiries handled politely around the clock, with triage rules that escalate anything clinical.",
      },
      {
        industry: "Automotive",
        title: "After-hours coverage that books real work",
        body: "Night and weekend enquiries wake up as scheduled jobs and logged leads instead of missed opportunities.",
      },
      {
        industry: "Hospitality groups",
        title: "One inbox, every venue, zero pile-up",
        body: "Function enquiries, feedback and booking changes triaged across venues and answered in your group's tone of voice.",
      },
    ],
    faq: [
      {
        q: "What can an AI Agent actually do autonomously?",
        a: "That is decided by you — common first steps are booking, rescheduling, FAQ resolution and updating customer notes, always within defined limits.",
      },
      {
        q: "Is it safe to give an agent access to our systems?",
        a: "We use scoped, least-privilege integrations, action logs and approval workflows — the agent can only do what is explicitly allowed.",
      },
      {
        q: "Does it replace our staff?",
        a: "It replaces the repetitive workload, not the people — your team gets the judgement calls and the customer moments that matter.",
      },
      {
        q: "How does the hand-off to a human work?",
        a: "The agent passes the full conversation and state to your team's tools, so the customer never repeats themselves.",
      },
      {
        q: "How do we start small?",
        a: "Most deployments begin with one contained workflow — after-hours enquiries or booking confirmations — and expand on evidence.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
