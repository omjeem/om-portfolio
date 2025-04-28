"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card-bg border border-card-border rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="mb-6 text-muted-foreground">
          We encountered an error while loading this page. Please try again or contact support if the problem persists.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => reset()} variant="primary">
            Try again
          </Button>
          <Button onClick={() => window.location.href = "/"} variant="outline">
            Go to home
          </Button>
        </div>
        {/* {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-sm rounded text-left overflow-auto">
            <p className="font-bold">Error details:</p>
            <pre className="mt-2">{error.message}</pre>
          </div>
        )} */}
      </div>
    </div>
  );
} 