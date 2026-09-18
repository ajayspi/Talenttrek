/**
 * The four core Talent Trek services. Single source of truth for the home
 * bento grid, the nav mega-dropdown, the services overview, the footer and
 * the four /services/[slug] detail pages.
 */

export type ServiceIcon =
  | "mic"
  | "chat"
  | "drive"
  | "agent"
  | "square"
  | "crm"
  | "database"
  | "phone"
  | "calendar"
  | "globe";

export interface ServiceFaq {
  q: string;
  /** Answer (legacy key). */
  a?: string;
  /** Answer (newer key used by the newer service entries). */
  body?: string;
}

/** Normalised FAQ answer text, regardless of which key was authored. */
export function faqAnswer(faq: ServiceFaq): string {
  return faq.a ?? faq.body ?? "";
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
  {
    slug: "square-integration",
    name: "Square Integration",
    tagline: "POS, CRM and Voice AI in one.",
    short:
      "Combine Square's smart operations with Talent Trek's CRM and Voice AI — manage POS, appointments, marketing and messaging from one place.",
    icon: "square",
    tags: ["POS", "Appointments", "Marketing"],
    problem: {
      title: "Your restaurant tools don't talk to each other",
      body: "Square handles POS but your CRM, booking and marketing tools are separate islands. Square Integration unifies them with Voice AI.",
      points: ["POS data trapped in silos", "Manual appointment booking", "Disconnected marketing campaigns", "No unified guest profile view"],
    },
    features: [
      { title: "All-in-One POS", body: "Dine-in, takeout and delivery support with item modifiers, split checks, contactless payments and staff tracking." },
      { title: "Smart Appointment Scheduling", body: "Voice AI turns conversations into table reservations with real-time waitlists and automated reminders." },
      { title: "Marketing Campaigns", body: "Email and SMS templates, loyalty promos, birthday offers and smart guest segmentation with ROI tracking." },
      { title: "Dashboard and Analytics", body: "Shift-based sales reports, menu insights, table turnover trends and lifetime value data in one view." },
      { title: "App Marketplace", body: "POS and KDS extensions, HR, accounting, kitchen automation and delivery platform integrations." },
      { title: "Voice AI Unification", body: "Voice AI connects and powers the entire stack — orders, bookings and enquiries handled conversationally." },
    ],
    howItWorks: [
      { title: "Connect", body: "Link your Square account and map your existing tools to the integration layer." },
      { title: "Configure", body: "Set up appointment rules, marketing automations and Voice AI conversational flows." },
      { title: "Launch", body: "Go live with unified POS, booking and voice ordering working together." },
      { title: "Optimise", body: "Refine campaigns and voice flows based on real performance data." },
    ],
    useCases: [
      { industry: "Restaurants", title: "Full-service dining", body: "Unified POS, reservation and marketing for busy restaurants handling dine-in, takeout and events." },
      { industry: "Cafés", title: "Quick service", body: "Fast POS with voice ordering and automated loyalty rewards for high-volume cafés." },
      { industry: "Hospitality groups", title: "Multi-venue", body: "Centralised control across multiple locations with unified guest profiles and marketing." },
    ],
    faq: [
      { q: "Do I already need Square?", a: "Yes — this service connects and extends your existing Square POS with CRM and Voice AI capabilities." },
      { q: "How long does integration take?", a: "Typical setup is 2-4 weeks depending on the complexity of your existing tools and workflows." },
      { q: "Can I keep my existing CRM?", a: "We integrate with your existing systems where possible, adding Voice AI and unifying the data layer." },
    ],
  },
  {
    slug: "custom-crm-services",
    name: "Custom CRM Services",
    tagline: "CRM built around your workflow.",
    short:
      "Every restaurant operates differently. We build custom CRM systems that match your unique processes, brand tone and guest engagement strategies.",
    icon: "crm",
    tags: ["Custom CRM", "Voice-Enabled", "Data-Driven"],
    problem: {
      title: "One-size-fits-all CRM doesn't fit restaurants",
      body: "Off-the-shelf CRMs force your workflow into their structure. We build systems the other way around — your processes, brand and guest engagement strategies come first.",
      points: ["Generic CRM doesn't match workflows", "No voice integration", "Dashboards that don't drive decisions", "Security concerns with cloud platforms"],
    },
    features: [
      { title: "AI-Powered, Voice-Enabled", body: "Every custom CRM is built ready for voice — integrating seamlessly with Talent Trek Voice AI." },
      { title: "Data-Driven Decisions", body: "Custom dashboards identifying top staff, loyalty-driving menu items and guest trends." },
      { title: "Enterprise-Grade Security", body: "Industry-standard security scaling from 1 location to 100+." },
      { title: "Brand-Tone Matching", body: "CRM communicates in your brand's voice across all guest touchpoints." },
      { title: "Custom Workflows", body: "Built around your unique booking, ordering and engagement processes." },
      { title: "Scalable Architecture", body: "Grows with your business without re-platforming or data migration." },
    ],
    howItWorks: [
      { title: "Discover", body: "Map your current workflows, brand tone and guest engagement strategies." },
      { title: "Design", body: "Custom CRM architecture designed around your specific needs." },
      { title: "Build", body: "Develop and integrate with existing tools and Voice AI." },
      { title: "Launch", body: "Deployed with training, documentation and ongoing support." },
    ],
    useCases: [
      { industry: "Fine Dining", title: "High-touch guest journeys", body: "Detailed profiles, preference tracking and personalised communications." },
      { industry: "Fast Casual", title: "Speed and loyalty", body: "Loyalty programs, repeat visits and operational efficiency." },
      { industry: "Multi-location", title: "Centralised control", body: "Unified CRM with centralised reporting and local flexibility." },
    ],
    faq: [
      { q: "How is this different from off-the-shelf?", a: "Built specifically for your workflows, brand and processes — not a generic template." },
      { q: "Can it integrate with my POS?", a: "Yes — Square, Clover, Lightspeed and other major POS systems." },
      { q: "How long does a custom build take?", a: "Typically 4-8 weeks with iterative delivery throughout." },
    ],
  },
  {
    slug: "crm-management",
    name: "CRM Management",
    tagline: "Grow loyalty. Personalise every guest.",
    short:
      "Build deeper guest connections, drive repeat visits and streamline service — powered by AI and real-time insights built for hospitality.",
    icon: "database",
    tags: ["Guest Profiles", "Loyalty", "Real-Time Insights"],
    problem: {
      title: "Relationships matter as much as recipes",
      body: "In hospitality, guest relationships drive repeat visits. Our CRM captures preferences, predicts loyalty behaviour and gives real-time insights to personalise every interaction.",
      points: ["Guest preferences scattered across systems", "No predictive loyalty insights", "Disconnected communication channels", "Manual data entry eating staff time"],
    },
    features: [
      { title: "AI-Powered Guest Profiles", body: "Automatically capture diner preferences, order history, allergies and feedback into detailed profiles." },
      { title: "Predictive Loyalty Engine", body: "AI identifies high-value guests and triggers offers, rewards and reminders to keep them coming back." },
      { title: "Voice and Multichannel", body: "Voice ordering, reservations, kiosk inputs and delivery platforms synced into one guest timeline." },
      { title: "Real-Time Insights", body: "Revenue per guest, loyalty behaviour, table turnover and staff performance in one dashboard." },
      { title: "Safe and Scalable", body: "Enterprise-grade security for single cafés through to 100+ outlet groups." },
      { title: "Automated Campaigns", body: "Triggered emails and SMS based on guest behaviour, preferences and visit history." },
    ],
    howItWorks: [
      { title: "Connect", body: "Integrate POS, reservation and communication platforms." },
      { title: "Capture", body: "Guest data automatically captured and organised into rich profiles." },
      { title: "Activate", body: "Loyalty campaigns, personalised offers and automated reminders go live." },
      { title: "Optimise", body: "Real-time insights refine campaigns and guest engagement strategies." },
    ],
    useCases: [
      { industry: "Restaurants", title: "Repeat visit growth", body: "Personalised offers based on visit history and preferences." },
      { industry: "Cafés", title: "Regular recognition", body: "Remembering orders, names and preferences for every regular." },
      { industry: "Hospitality groups", title: "Cross-venue loyalty", body: "Unified loyalty program across multiple venues." },
    ],
    faq: [
      { q: "What data does the CRM capture?", a: "Order history, preferences, allergies, feedback, visit frequency, spend patterns and communication preferences." },
      { q: "How does the loyalty engine work?", a: "AI identifies high-value guests and automates personalised offers to drive repeat visits." },
      { q: "Is guest data secure?", a: "Enterprise-grade security compliant with Australian data protection standards." },
    ],
  },
  {
    slug: "ai-phone-receptionist",
    name: "AI Phone Receptionist",
    tagline: "Never miss a call again.",
    short:
      "A professional AI receptionist that answers, qualifies and routes calls 24/7 — for professional services, healthcare, trades and real estate across Australia.",
    icon: "phone",
    tags: ["Call Answering", "Lead Qualification", "After-Hours"],
    problem: {
      title: "Every missed call is a missed opportunity",
      body: "Professional services, healthcare and trades still rely on humans to answer phones. After hours, during peak times, or when staff are busy — calls go unanswered. Our AI receptionist answers on the first ring, qualifies callers and routes them intelligently.",
      points: ["After-hours calls going to voicemail", "Staff pulled away from clients", "Inconsistent caller experiences", "Leads lost during peak times"],
    },
    features: [
      { title: "Natural Australian Voice", body: "A warm, professional Australian accent that represents your brand — not a robotic menu tree." },
      { title: "24/7 Call Answering", body: "Never miss a call — day, night, weekends and public holidays." },
      { title: "Intelligent Call Routing", body: "Calls qualified and routed to the right person with full context." },
      { title: "Lead Qualification", body: "Captures caller details, enquiry type and urgency for your team." },
      { title: "Appointment Booking", body: "Books appointments directly into your calendar during the call." },
      { title: "Custom Scripts", body: "Receptionist trained on your services, pricing FAQs and brand voice." },
    ],
    howItWorks: [
      { title: "Configure", body: "Set up your receptionist with services, team structure and call handling rules." },
      { title: "Train", body: "AI learns your brand voice, common questions and escalation procedures." },
      { title: "Go Live", body: "Receptionist answers calls — optional supervised period before full autonomy." },
      { title: "Refine", body: "Ongoing tuning based on call recordings and team feedback." },
    ],
    useCases: [
      { industry: "Healthcare", title: "Patient enquiries", body: "Appointment booking, prescription reminders and after-hours triage." },
      { industry: "Real Estate", title: "Property enquiries", body: "Tenant applications, inspection bookings and vendor enquiries." },
      { industry: "Trades", title: "Job booking", body: "Emergency call-outs, quote requests and job scheduling." },
    ],
    faq: [
      { q: "Will callers know it's an AI?", a: "You choose — introduce by name and role, or keep transparent as an AI assistant." },
      { q: "How does after-hours work?", a: "Calls answer 24/7 with your after-hours message or live handling, with SMS alerts for urgent matters." },
      { q: "Can it transfer to a human?", a: "Yes — complex calls warm-transfer to your team with full context so the caller never repeats themselves." },
    ],
  },
  {
    slug: "ai-appointment-booking",
    name: "AI Appointment Booking",
    tagline: "Book 24/7. Never double-book.",
    short:
      "AI-powered appointment scheduling that lets clients book, reschedule and cancel by voice or chat — with smart reminders and calendar sync.",
    icon: "calendar",
    tags: ["Scheduling", "Reminders", "Calendar Sync"],
    problem: {
      title: "Phone tag wastes everyone's time",
      body: "Clients call to book, staff answer and manually enter details, then reminders get forgotten. Our AI appointment booking system lets clients book by voice or chat 24/7, with automatic reminders and two-way calendar sync.",
      points: ["Phone tag for simple bookings", "Manual data entry errors", "Missed reminders causing no-shows", "Double-bookings from miscommunication"],
    },
    features: [
      { title: "Voice and Chat Booking", body: "Clients book via phone call or chat — whichever they prefer, 24/7." },
      { title: "Two-Way Calendar Sync", body: "Syncs with Google Calendar, Outlook or Apple Calendar in real time." },
      { title: "Smart Reminders", body: "Automated SMS and email reminders reduce no-shows by up to 40%." },
      { title: "Self-Service Portal", body: "Clients can reschedule or cancel without calling your office." },
      { title: "Waitlist Management", body: "Automatically offers cancelled slots to waitlisted clients." },
      { title: "Multi-Staff Support", body: "Routes to the right practitioner based on service type and availability." },
    ],
    howItWorks: [
      { title: "Connect", body: "Link your calendar and define services, durations and availability rules." },
      { title: "Configure", body: "Set up reminder schedules, waitlist rules and booking policies." },
      { title: "Launch", body: "Clients book by phone or chat — with optional staff approval workflows." },
      { title: "Optimise", body: "Track no-show rates, booking volume and peak times." },
    ],
    useCases: [
      { industry: "Healthcare", title: "Patient appointments", body: "Booking, reminders and follow-ups for GPs, dentists and specialists." },
      { industry: "Beauty and Wellness", title: "Salon and spa", body: "Self-service booking with automated reminders for hair, beauty and spa." },
      { industry: "Professional Services", title: "Consultations", body: "Client intake, scheduling and document reminders for legal and financial firms." },
    ],
    faq: [
      { q: "What calendars does it support?", a: "Google Calendar, Microsoft Outlook/365 and Apple Calendar — with real-time two-way sync." },
      { q: "Can clients reschedule themselves?", a: "Yes — clients receive a link to reschedule or cancel without calling your office." },
      { q: "How much does it reduce no-shows?", a: "Automated reminders typically reduce no-shows by 30-40% within the first month." },
    ],
  },
  {
    slug: "multilingual-ai-assistant",
    name: "Multilingual AI Assistant",
    tagline: "Speak every language your customers do.",
    short:
      "AI voice and chat assistants that speak Mandarin, Cantonese, Hindi, Vietnamese, Arabic and more — built for Australia's diverse communities.",
    icon: "globe",
    tags: ["Multilingual", "Voice", "Chat", "24/7"],
    problem: {
      title: "English-only AI excludes your customers",
      body: "Over 30% of Australians speak a language other than English at home. Your AI assistant should speak their language — not force them into English. We build multilingual assistants for voice and chat in 10+ languages.",
      points: ["English-only assistants exclude non-English speakers", "Multilingual staff expensive and hard to find", "Inconsistent service across languages", "Missed opportunity in diverse communities"],
    },
    features: [
      { title: "10+ Languages", body: "Mandarin, Cantonese, Hindi, Vietnamese, Arabic, Korean, Japanese, Spanish, Italian and more." },
      { title: "Native Accents", body: "Natural-sounding speech in each language — not machine-translated monotone." },
      { title: "Automatic Language Detection", body: "Detects the caller's language and switches seamlessly mid-conversation." },
      { title: "Voice and Chat", body: "Full multilingual support across both voice calls and chat interfaces." },
      { title: "Cultural Context", body: "Beyond translation — understands cultural norms, date formats and local conventions." },
      { title: "Easy Expansion", body: "New languages can be added in weeks, not months." },
    ],
    howItWorks: [
      { title: "Select Languages", body: "Choose which languages your customers need, with priority ordering." },
      { title: "Train", body: "Train the assistant on your services, terminology and brand voice in each language." },
      { title: "Launch", body: "Multilingual assistant handles voice and chat in all selected languages." },
      { title: "Expand", body: "Add new languages as your customer base grows — without rebuilding." },
    ],
    useCases: [
      { industry: "Healthcare", title: "Multilingual patient support", body: "Intake, appointment booking and after-hours support in the community's language." },
      { industry: "Retail", title: "Multilingual customer service", body: "Product enquiries, order support and returns in the customer's preferred language." },
      { industry: "Hospitality", title: "Multilingual guest experience", body: "Bookings, room service and concierge in Mandarin, Hindi, Arabic and more." },
    ],
    faq: [
      { q: "Which languages are supported?", a: "Mandarin, Cantonese, Hindi, Vietnamese, Arabic, Korean, Japanese, Spanish, Italian and more on request." },
      { q: "How accurate is the language detection?", a: "Over 95% accuracy for the top 10 languages, with seamless fallback to your preferred default." },
      { q: "Can it handle code-switching?", a: "Yes — detects when a caller switches languages and adapts in real time." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
