// prisma/seed.js
import { prisma } from "../src/config/prisma.ts";

const INDIAN_NAMES = [
  "Priya Sharma", "Anjali Verma", "Sunita Devi", "Rekha Kumari",
  "Meena Patel", "Kavitha Nair", "Lakshmi Reddy", "Pushpa Yadav",
  "Savitri Joshi", "Radha Mishra",
];

const USER_NAMES = [
  "Arjun Mehta", "Sneha Iyer", "Rohit Gupta", "Divya Nair", "Vikram Singh",
];

const CITIES = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai", "Pune"];

const AREAS = {
  Mumbai: ["Andheri", "Bandra", "Powai", "Juhu", "Malad"],
  Bangalore: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "BTM Layout"],
  Delhi: ["Lajpat Nagar", "Dwarka", "Rohini", "Saket", "Vasant Kunj"],
  Hyderabad: ["Banjara Hills", "Madhapur", "Gachibowli", "Kondapur", "Begumpet"],
  Chennai: ["Anna Nagar", "T Nagar", "Adyar", "Velachery", "OMR"],
  Pune: ["Koregaon Park", "Baner", "Hinjewadi", "Kothrud", "Aundh"],
};

const SKILLS_POOL = [
  "Cooking", "Cleaning", "Laundry", "Childcare", "Elderly care",
  "Cooking South Indian", "Cooking North Indian", "Dishwashing",
  "Mopping", "Dusting", "Grocery shopping", "Pet care", "Ironing",
];

const TYPES = ["maid", "nanny", "babysitter"];

const COMMENTS = [
  "Very reliable and hardworking.", "Excellent work, highly recommended!",
  "Always on time and very thorough.", "Great with kids, very patient.",
  "Cooking is amazing, house is always spotless.", "Very trustworthy and professional.",
  "Does a fantastic job every time.", "Friendly and efficient.",
  "Would highly recommend to anyone.", "Outstanding service, very satisfied.",
];

// Plan templates per plan type
const PLAN_TEMPLATES = {
  hourly: { duration: 4, dailyWorkingHours: 4 },
  monthly: { duration: 30, dailyWorkingHours: 4 },
  yearly: { duration: 365, dailyWorkingHours: 4 },
};

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomSubset = (arr, min, max) => {
  const count = randomInt(min, max);
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
};
const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

/** Build 2–3 plan records for a given helper's hourly rate (as an int, e.g. 150) */
function buildPlans(baseRate) {
  const planTypes = randomSubset(["hourly", "monthly", "yearly"], 2, 3);
  return planTypes.map((planType) => {
    const tmpl = PLAN_TEMPLATES[planType];
    const cost =
      planType === "hourly"
        ? baseRate                            // ₹150 / session
        : planType === "monthly"
        ? baseRate * tmpl.dailyWorkingHours * tmpl.duration   // daily hrs × days
        : baseRate * tmpl.dailyWorkingHours * 300;            // yearly — slight discount vs 365

    return {
      type: planType,
      cost: Math.round(cost),
      duration: tmpl.duration,
      dailyWorkingHours: tmpl.dailyWorkingHours,
      noOfSubs: 0, // will increment as subscriptions are created
    };
  });
}

async function main() {
  console.log("🌱 Seeding database...");

  // Clear in dependency order
  await prisma.subscription.deleteMany();
  await prisma.review.deleteMany();
  await prisma.plans.deleteMany();
  await prisma.maidProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Cleared existing data\n");

  // ── Users ──────────────────────────────────────────────────────────────────
  const createdUsers = [];
  for (let i = 0; i < USER_NAMES.length; i++) {
    const name = USER_NAMES[i];
    const user = await prisma.user.create({
      data: {
        name,
        email: `user${i + 1}@trustcare.in`,
        phoneNumber: `9${randomInt(100000000, 999999999)}`,
        firebaseUid: `fake-user-uid-${i + 1}`,
        profilePic: avatarUrl(name),
        role: "USER",
      },
    });
    createdUsers.push(user);
    console.log(`👤 Created user: ${name}`);
  }

  // ── Helpers + Plans + Reviews ──────────────────────────────────────────────
  const allPlans = []; // collect for subscription step

  for (let i = 0; i < INDIAN_NAMES.length; i++) {
    const name = INDIAN_NAMES[i];
    const city = randomFrom(CITIES);
    const area = randomFrom(AREAS[city]);
    const helperType = randomFrom(TYPES);
    const skills = randomSubset(SKILLS_POOL, 3, 6);
    const experience = randomInt(1, 12);
    const reviewCount = randomInt(2, 5);
    const baseRate = randomInt(80, 250);

    const helperUser = await prisma.user.create({
      data: {
        name,
        email: `helper${i + 1}@trustcare.in`,
        phoneNumber: `8${randomInt(100000000, 999999999)}`,
        firebaseUid: `fake-helper-uid-${i + 1}`,
        profilePic: avatarUrl(name),
        role: "HELPER",
      },
    });

    const reviewData = Array.from({ length: reviewCount }, () => ({
      rating: randomInt(3, 5),
      comment: randomFrom(COMMENTS),
      userId: randomFrom(createdUsers).id,
    }));

    const avgRating =
      reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length;

    const planInputs = buildPlans(baseRate);

    const profile = await prisma.maidProfile.create({
      data: {
        userId: helperUser.id,
        type: helperType,
        bio: `Experienced ${helperType} with ${experience} years of work across ${city}. Skilled in ${skills.slice(0, 2).join(" and ")}.`,
        experience,
        city,
        area,
        skill: skills,
        costPerHour: `${baseRate}`,
        averageRating: parseFloat(avgRating.toFixed(1)),
        totalReviews: reviewCount,
        isVerified: Math.random() > 0.3,
        profileCompletion: randomInt(70, 100),
        reviews: { create: reviewData },
        plans: { create: planInputs },       // ← plans nested here
      },
      include: { plans: true },
    });

    allPlans.push(...profile.plans);

    console.log(
      `🧹 Created ${helperType}: ${name} (${area}, ${city}) — ⭐ ${avgRating.toFixed(1)} | ${profile.plans.length} plans`
    );
  }

  // ── Subscriptions ──────────────────────────────────────────────────────────
  console.log("\n📋 Creating subscriptions...");

  for (const user of createdUsers) {
    // Each user subscribes to 1–3 random plans
    const chosenPlans = randomSubset(allPlans, 1, 3);

    for (const plan of chosenPlans) {
      await prisma.subscription.create({
        data: {
          userId: user.id,
          planId: plan.id,
          active: Math.random() > 0.2, // 80% active
          startDate: new Date(
            Date.now() - randomInt(0, 60) * 24 * 60 * 60 * 1000 // started 0–60 days ago
          ),
        },
      });

      // Keep noOfSubs in sync
      await prisma.plans.update({
        where: { id: plan.id },
        data: { noOfSubs: { increment: 1 } },
      });
    }

    console.log(`🔗 ${user.name} subscribed to ${chosenPlans.length} plan(s)`);
  }

  console.log("\n✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());