import { db } from ".";
import { habits, users } from "./schema";

const MOCK_HABITS: { title: string; description: string }[] = [
  {
    title: "Drink 8 glasses of water",
    description:
      "Stay hydrated by drinking at least 8 glasses of water throughout the day.",
  },
  {
    title: "Exercise for 30 minutes",
    description:
      "Engage in any physical activity or workout for at least 30 minutes.",
  },
  {
    title: "Read for 20 minutes",
    description:
      "Spend 20 minutes reading a book, article, or any material of your choice.",
  },
  {
    title: "Meditate",
    description:
      "Practice mindfulness or meditation for a few minutes to reduce stress.",
  },
  {
    title: "Wake up before 7 AM",
    description: "Start your day early by waking up before 7 in the morning.",
  },
  {
    title: "Write in a journal",
    description:
      "Reflect on your day and jot down your thoughts or experiences in a journal.",
  },
  {
    title: "Take a daily walk",
    description: "Go for a walk outside to get fresh air and light exercise.",
  },
  {
    title: "Eat 5 servings of fruits/vegetables",
    description:
      "Include at least 5 servings of fruits and vegetables in your meals.",
  },
  {
    title: "Practice gratitude",
    description:
      "List things you are grateful for each day to foster a positive mindset.",
  },
  {
    title: "Go to bed before 11 PM",
    description:
      "Ensure you get enough rest by going to bed before 11 at night.",
  },
];

async function main() {
  const user: typeof users.$inferInsert = {
    name: "Martín Weingart",
    email: "martinweingart@test.com",
  };

  const insertedUser = await db.insert(users).values(user).returning();

  await db.insert(habits).values(
    MOCK_HABITS.map((h) => ({
      userId: insertedUser[0].id,
      ...h,
    }))
  );
}

main();
