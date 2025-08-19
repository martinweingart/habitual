"use server";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = LoginData & {
  name: string;
};

export async function login({ email, password }: LoginData) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return { message: "Invalid credentials" };
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { message: "Invalid credentials" };
    }
  }
}

export async function register({ name, email, password }: RegisterData) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (user) {
    return { message: "User already exists" };
  } else {
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id });

    if (!newUser) {
      return {
        message: "An error occurred while creating your account.",
      };
    }
  }
}
