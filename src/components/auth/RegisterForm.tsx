"use client";

import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/actions";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const result = await register(values);
    setLoading(false);

    if (result.message) {
      toast.error(result.message);
    }
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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

        <Button className="self-end" type="submit" disabled={loading}>
          {loading && <Loader2Icon className="animate-spin" />}
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
