"use server";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import {
  createSession,
  deleteSession,
  getCurrentUser,
  updateSession,
} from "@/lib/session";

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

    const checkUpdateSession = await updateSession();

    if (!checkUpdateSession) {
      await createSession({ id: user.id, name: user.name });
    }

    redirect("/habits");
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
      .returning();

    if (!newUser) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    await createSession({ id: newUser.id, name: newUser.name });
    redirect("/habits");
  }
}

export async function logout() {
  await deleteSession();
  redirect("/");
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
