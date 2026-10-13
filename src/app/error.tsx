"use client";

import { useEffect } from "react";
import { SA } from "@/lib/theme";
import { BtnButton, Btn } from "@/components/system/Btn";

/* A runtime error, said plainly, with a retry and a way home. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="min-h-[100dvh] grid place-items-center px-5" style={{ background: SA.bg2, color: SA.ink }}>
      <div className="max-w-[560px] text-center">
        <p className="font-mono-g t-meta" style={{ color: SA.faint }}>
          Error{error.digest ? ` · ${error.digest}` : ""}
        </p>
        <h1 className="mt-4 font-display t-h2">Something went wrong on our side.</h1>
        <p className="mt-4 font-sans-g t-body" style={{ color: SA.sub }}>
          Try again. If it keeps happening, tell us what you were doing and we will fix it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BtnButton onClick={reset} size="lg">
            Try again
          </BtnButton>
          <Btn href="/" variant="secondary" size="lg">
            Go home
          </Btn>
        </div>
      </div>
    </main>
  );
}
