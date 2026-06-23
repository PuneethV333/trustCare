// prisma/seed.js
import { prisma } from "../src/config/prisma.ts";

const INDIAN_NAMES = [
  "Priya Sharma",
  "Anjali Verma",
  "Sunita Devi",
  "Rekha Kumari",
  "Meena Patel",
  "Kavitha Nair",
  "Lakshmi Reddy",
  "Pushpa Yadav",
  "Savitri Joshi",
  "Radha Mishra",
];

const USER_NAMES = [
  "Arjun Mehta",
  "Sneha Iyer",
  "Rohit Gupta",
  "Divya Nair",
  "Vikram Singh",
];

const CITIES = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai", "Pune"];

const AREAS = {
  Mumbai: ["Andheri", "Bandra", "Powai", "Juhu", "Malad"],
  Bangalore: [
    "Koramangala",
    "Indiranagar",
    "HSR Layout",
    "Whitefield",
    "BTM Layout",
  ],
  Delhi: ["Lajpat Nagar", "Dwarka", "Rohini", "Saket", "Vasant Kunj"],
  Hyderabad: [
    "Banjara Hills",
    "Madhapur",
    "Gachibowli",
    "Kondapur",
    "Begumpet",
  ],
  Chennai: ["Anna Nagar", "T Nagar", "Adyar", "Velachery", "OMR"],
  Pune: ["Koregaon Park", "Baner", "Hinjewadi", "Kothrud", "Aundh"],
};

const SKILLS_POOL = [
  "Cooking",
  "Cleaning",
  "Laundry",
  "Childcare",
  "Elderly care",
  "Cooking South Indian",
  "Cooking North Indian",
  "Dishwashing",
  "Mopping",
  "Dusting",
  "Grocery shopping",
  "Pet care",
  "Ironing",
];

const TYPES = ["maid", "nanny", "babysitter"];

const COMMENTS = [
  "Very reliable and hardworking.",
  "Excellent work, highly recommended!",
  "Always on time and very thorough.",
  "Great with kids, very patient.",
  "Cooking is amazing, house is always spotless.",
  "Very trustworthy and professional.",
  "Does a fantastic job every time.",
  "Friendly and efficient.",
  "Would highly recommend to anyone.",
  "Outstanding service, very satisfied.",
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomSubset = (arr, min, max) => {
  const count = randomInt(min, max);
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
};
const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.review.deleteMany();
  await prisma.maidProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Cleared existing data");

  for (let i = 0; i < USER_NAMES.length; i++) {
    const name = USER_NAMES[i];
    await prisma.user.create({
      data: {
        name,
        email: `user${i + 1}@trustcare.in`,
        phoneNumber: `9${randomInt(100000000, 999999999)}`,
        firebaseUid: `fake-user-uid-${i + 1}`,
        profilePic: avatarUrl(name),
        role: "USER",
      },
    });
    console.log(`👤 Created user: ${name}`);
  }

  for (let i = 0; i < INDIAN_NAMES.length; i++) {
    const name = INDIAN_NAMES[i];
    const city = randomFrom(CITIES);
    const area = randomFrom(AREAS[city]);
    const type = randomFrom(TYPES);
    const skills = randomSubset(SKILLS_POOL, 3, 6);
    const experience = randomInt(1, 12);
    const reviewCount = randomInt(2, 5);

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

    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
    });

    const reviewData = Array.from({ length: reviewCount }, () => ({
      rating: randomInt(3, 5),
      comment: randomFrom(COMMENTS),
      userId: randomFrom(users).id,
    }));

    const avgRating =
      reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length;

    await prisma.maidProfile.create({
      data: {
        userId: helperUser.id,
        type,
        bio: `Experienced ${type} with ${experience} years of work across ${city}. Skilled in ${skills.slice(0, 2).join(" and ")}.`,
        experience,
        city,
        area,
        skill: skills,
        costPerHour: `₹${randomInt(80, 250)}`,
        averageRating: parseFloat(avgRating.toFixed(1)),
        totalReviews: reviewCount,
        isVerified: Math.random() > 0.3,
        profileCompletion: randomInt(70, 100),
        reviews: { create: reviewData },
      },
    });

    console.log(
      `🧹 Created ${type}: ${name} (${area}, ${city}) — ⭐ ${avgRating.toFixed(1)}`,
    );
  }

  console.log("\n✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
