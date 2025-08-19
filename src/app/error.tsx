"use client";

import { useEffect } from "react";
import { PageDescription } from "@/components/PageDescription";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center h-full justify-center gap-10 px-2">
      <CircleX size={120} />

      <div className="flex flex-col gap-2 text-center">
        <PageTitle>An unexpected error occurred.</PageTitle>
        <PageDescription>
          {"We're sorry, but something went wrong. Please try again later."}
        </PageDescription>
      </div>

      <Button variant="secondary" onClick={() => reset()}>
        Go Back
      </Button>
    </div>
  );
}
