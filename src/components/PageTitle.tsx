import { cn } from "@/lib/utils";

export function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={cn("text-[32px] font-bold", className)} {...props} />;
}
