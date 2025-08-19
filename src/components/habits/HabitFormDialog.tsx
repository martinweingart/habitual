import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Habit, HabitFormValue } from "@/types";
import { useEffect } from "react";

type HabitFormDialogProps = Pick<AlertDialogProps, "open" | "onOpenChange"> & {
  habit?: Habit;
  onSave: (habit: HabitFormValue) => void;
};

const habitFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      error: "A title is required",
    })
    .max(120),
  description: z.string().min(1, {
    error: "A description is required",
  }),
});

export function HabitFormDialog(props: HabitFormDialogProps) {
  const form = useForm<z.infer<typeof habitFormSchema>>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      title: props.habit?.title || "",
      description: props.habit?.description || "",
    },
  });

  useEffect(() => {
    form.reset({
      title: props.habit?.title || "",
      description: props.habit?.description || "",
    });
  }, [props.habit, form]);

  const onSubmit = (values: z.infer<typeof habitFormSchema>) => {
    props.onSave(values);
    form.reset();
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new habit</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe your habit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                {props.habit ? "Save Changes" : "Create Habit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
