"use client";

import { useEffect } from "react";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="flex flex-col items-center h-full justify-center gap-10 px-2">
      <CircleX size={120} />

      <PageHeader
        className="text-center"
        title="An unexpected error occurred."
        description="We're sorry, but something went wrong. Please try again later."
      />

      <Button variant="secondary" onClick={() => reset()}>
        Go Back
      </Button>
    </div>
  );
}
