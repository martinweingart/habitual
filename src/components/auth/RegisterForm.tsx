"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { register } from "@/lib/actions";

const formSchema = z.object({
  name: z
    .string({ error: "A name is required" })
    .min(1, { error: "A name is required" })
    .trim(),
  email: z
    .email({ error: "Invalid email address" })
    .min(1, { error: "An email is required" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Passwords must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters" })
    .regex(/[a-zA-Z]/, {
      message: "Passwords must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Passwords must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Passwords must contain at least one special character.",
    })
    .trim(),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await register(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="self-end" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}
