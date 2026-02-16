export const siteConfig = {
  name: "DMCMY",
  title: "Malaysia's Premier DMC Directory",
  description: "Connect with Malaysia's top Destination Management Companies for corporate events, MICE, and luxury travel experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dmcmy.com",
  contactEmail: "hello@dmcmy.com",
  currency: "RM",

  // NEVER hardcode year - always dynamic
  currentYear: new Date().getFullYear(),

  pricing: {
    premium: {
      monthly: 99,
      currency: "MYR",
      features: [
        "Priority listing placement",
        "Premium badge & gold border",
        "Receive broadcast leads",
        "Enhanced profile with logo & gallery",
        "Lead analytics dashboard",
        "Featured on homepage"
      ]
    }
  },

  makeWebhookUrl: process.env.MAKE_WEBHOOK_URL
} as const;

// 16 Malaysian states
export const malaysianStates = [
  { name: "Kuala Lumpur", slug: "kuala-lumpur", code: "KUL" },
  { name: "Selangor", slug: "selangor", code: "SEL" },
  { name: "Penang", slug: "penang", code: "PNG" },
  { name: "Johor", slug: "johor", code: "JHR" },
  { name: "Melaka", slug: "melaka", code: "MLK" },
  { name: "Pahang", slug: "pahang", code: "PHG" },
  { name: "Perak", slug: "perak", code: "PRK" },
  { name: "Kedah", slug: "kedah", code: "KDH" },
  { name: "Sabah", slug: "sabah", code: "SBH" },
  { name: "Sarawak", slug: "sarawak", code: "SWK" },
  { name: "Terengganu", slug: "terengganu", code: "TRG" },
  { name: "Kelantan", slug: "kelantan", code: "KTN" },
  { name: "Negeri Sembilan", slug: "negeri-sembilan", code: "NSN" },
  { name: "Perlis", slug: "perlis", code: "PLS" },
  { name: "Putrajaya", slug: "putrajaya", code: "PJY" },
  { name: "Labuan", slug: "labuan", code: "LBN" }
] as const;

// 12 Service categories
export const serviceCategories = [
  { name: "Corporate Retreats & Team Building", slug: "corporate-retreats", icon: "users" },
  { name: "MICE (Meetings, Incentives, Conferences, Exhibitions)", slug: "mice", icon: "presentation" },
  { name: "Incentive Travel Programs", slug: "incentive-travel", icon: "award" },
  { name: "Corporate Travel Management", slug: "corporate-travel", icon: "briefcase" },
  { name: "Luxury & VIP Travel", slug: "luxury-travel", icon: "star" },
  { name: "Cruise Packages", slug: "cruise", icon: "ship" },
  { name: "Cultural & Heritage Tours", slug: "cultural-tours", icon: "landmark" },
  { name: "Adventure & Eco Tourism", slug: "adventure-tourism", icon: "compass" },
  { name: "Wedding & Event Planning", slug: "wedding-planning", icon: "heart" },
  { name: "Airport Transfers & Ground Transportation", slug: "transportation", icon: "car" },
  { name: "Gala Dinner & Award Ceremonies", slug: "gala-dinner", icon: "trophy" },
  { name: "Convention & Conference Management", slug: "conference-management", icon: "calendar" }
] as const;

// 16 Popular destinations
export const destinations = [
  { name: "Langkawi", slug: "langkawi" },
  { name: "Penang", slug: "penang" },
  { name: "Sabah (Kota Kinabalu / Kundasang)", slug: "sabah" },
  { name: "Sarawak (Kuching)", slug: "sarawak" },
  { name: "Johor Bahru / Desaru", slug: "johor-bahru" },
  { name: "Cameron Highlands", slug: "cameron-highlands" },
  { name: "Melaka", slug: "melaka" },
  { name: "Kuala Lumpur", slug: "kuala-lumpur" },
  { name: "Genting Highlands", slug: "genting-highlands" },
  { name: "Tioman Island", slug: "tioman" },
  { name: "Redang Island", slug: "redang" },
  { name: "Perhentian Islands", slug: "perhentian" },
  { name: "Pangkor Laut", slug: "pangkor-laut" },
  { name: "Port Dickson", slug: "port-dickson" },
  { name: "Ipoh", slug: "ipoh" },
  { name: "Taman Negara", slug: "taman-negara" }
] as const;

export const priceTiers = ["budget", "mid-range", "premium", "luxury"] as const;

export const eventTypes = [
  "Corporate Retreat",
  "MICE Event",
  "Incentive Trip",
  "Conference",
  "Gala Dinner",
  "Team Building Trip",
  "Other"
] as const;

export const budgetRanges = [
  "Below RM20,000",
  "RM20,000 - RM50,000",
  "RM50,000 - RM100,000",
  "RM100,000 - RM200,000",
  "RM200,000 - RM500,000",
  "Above RM500,000"
] as const;
