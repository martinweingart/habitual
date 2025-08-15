import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.development.local",
});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  casing: "snake_case",
  introspect: { casing: "preserve" },
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
