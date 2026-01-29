const mongoose = require("mongoose");
const Deal = require("./models/Deal");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/startupperks",
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const sampleDeals = [
  {
    title: "AWS Activate - $100,000 in Cloud Credits",
    description:
      "Get up to $100,000 in AWS credits for 2 years, plus technical support and training resources to scale your startup on AWS.",
    company: "Amazon Web Services",
    category: "Cloud",
    discount: "$100,000 credits",
    value: 100000,
    accessLevel: "Unlocked",
    isFeatured: true,
    benefits: [
      "Up to $100,000 in AWS credits",
      "2 years of credits",
      "Technical support",
      "Training resources",
      "Priority support",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Figma Organization Plan - 2 years free",
    description:
      "Get Figma's Organization plan free for 2 years. Unlimited projects, advanced design systems, and team libraries.",
    company: "Figma",
    category: "Design",
    discount: "2 years free",
    value: 15000,
    accessLevel: "Locked",
    isFeatured: true,
    benefits: [
      "Unlimited projects",
      "Advanced design systems",
      "Team libraries",
      "Priority support",
      "Custom integrations",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Notion for Startups - Free Team Plan",
    description:
      "Get 6 months of Notion's Team plan free, with unlimited team members, advanced permissions, and priority support.",
    company: "Notion",
    category: "Productivity",
    discount: "6 months free",
    value: 3000,
    accessLevel: "Unlocked",
    isFeatured: true,
    benefits: [
      "6 months free",
      "Unlimited team members",
      "Advanced permissions",
      "Priority support",
      "Custom templates",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Segment Startup Program - Free Analytics",
    description:
      "Access Segment's powerful customer data platform free for 2 years. Collect, unify, and activate your customer data.",
    company: "Segment",
    category: "Analytics",
    discount: "2 years free",
    value: 24000,
    accessLevel: "Locked",
    isFeatured: false,
    benefits: [
      "2 years free access",
      "Unlimited sources",
      "Data warehouse",
      "API access",
      "Analytics suite",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Mixpanel Startup Program - 12 months free",
    description:
      "Access Mixpanel's Growth plan free for 12 months. Track behavior, build funnels, and make data-driven decisions.",
    company: "Mixpanel",
    category: "Analytics",
    discount: "12 months free",
    value: 50000,
    accessLevel: "Locked",
    isFeatured: false,
    benefits: [
      "12 months free",
      "Track all events",
      "Custom funnels",
      "Data export",
      "Premium support",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "HubSpot for Startups - Free CRM",
    description:
      "Get HubSpot's full CRM platform free for the first 2 years. Manage sales, marketing, and customer service.",
    company: "HubSpot",
    category: "Marketing",
    discount: "$100+ value/month",
    value: 24000,
    accessLevel: "Unlocked",
    isFeatured: true,
    benefits: [
      "2 years free",
      "Sales hub",
      "Marketing hub",
      "Service hub",
      "Automation",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Stripe for Startups - Processing credits",
    description:
      "Get up to $10,000 in processing credits plus networking opportunities with other startups and investors.",
    company: "Stripe",
    category: "Development",
    discount: "Up to $10,000 credits",
    value: 10000,
    accessLevel: "Unlocked",
    isFeatured: false,
    benefits: [
      "Processing credits",
      "Extended payment terms",
      "Dedicated support",
      "Networking events",
      "Priority API access",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "SendGrid for Startups - Free email sending",
    description:
      "Send up to 40,000 emails in the first month, then 200 emails per day free. Scale your email infrastructure.",
    company: "SendGrid",
    category: "Development",
    discount: "40,000 free emails + 200/day",
    value: 5000,
    accessLevel: "Unlocked",
    isFeatured: false,
    benefits: [
      "40,000 free emails",
      "200 emails/day free",
      "Deliverability suite",
      "API access",
      "24/7 support",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Slack for Startups - Free workspace",
    description:
      "Get a free Slack workspace with unlimited messages, integrations, and collaboration tools.",
    company: "Slack",
    category: "Productivity",
    discount: "Free workspace",
    value: 8000,
    accessLevel: "Unlocked",
    isFeatured: false,
    benefits: [
      "Unlimited messages",
      "1000+ integrations",
      "Workflow automation",
      "Advanced security",
      "Admin controls",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Google Cloud Startup Program",
    description:
      "Up to $200,000 in cloud credits, plus free technical support and access to Google Cloud resources.",
    company: "Google Cloud",
    category: "Cloud",
    discount: "$200,000 credits",
    value: 200000,
    accessLevel: "Locked",
    isFeatured: true,
    benefits: [
      "Up to $200,000 credits",
      "Technical support",
      "Training courses",
      "Networking events",
      "Priority support",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Airtable for Startups - Free Pro plan",
    description:
      "Get Airtable Pro plan free for 12 months. Build powerful databases and automate workflows.",
    company: "Airtable",
    category: "Productivity",
    discount: "12 months free",
    value: 15000,
    accessLevel: "Unlocked",
    isFeatured: false,
    benefits: [
      "12 months free",
      "Pro features",
      "Automation",
      "Advanced sharing",
      "API access",
    ],
    expiryDate: new Date("2026-12-31"),
  },
  {
    title: "Grammarly for Business - Free team plan",
    description:
      "Get Grammarly for Business free for 6 months. Advanced writing assistance for your entire team.",
    company: "Grammarly",
    category: "Productivity",
    discount: "6 months free",
    value: 8000,
    accessLevel: "Unlocked",
    isFeatured: false,
    benefits: [
      "6 months free",
      "Team workspace",
      "Advanced checks",
      "Tone detection",
      "Plagiarism check",
    ],
    expiryDate: new Date("2026-12-31"),
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing deals
    await Deal.deleteMany({});
    console.log("Cleared existing deals");

    // Insert sample deals
    const inserted = await Deal.insertMany(sampleDeals);
    console.log(`Successfully inserted ${inserted.length} deals`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
