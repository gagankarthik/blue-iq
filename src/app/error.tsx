"use client";

import { useEffect } from "react";
import { BB } from "@/lib/theme";
import { WRAP } from "@/components/page/kit";
import { BtnButton, Btn } from "@/components/system/Btn";

/* A runtime error, said plainly and left-aligned in the column: what
   happened, then a retry and a way home. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="min-h-[100dvh] flex items-center" style={{ color: BB.ink }}>
      <div className={`${WRAP} w-full py-24`}>
        <p className="font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.ink3 }}>
          Error{error.digest ? ` · ${error.digest}` : ""}
        </p>
        <h1 className="mt-4 font-display t-h1 max-w-[20ch]">Something went wrong on our side.</h1>
        <p className="mt-4 font-sans-g t-sub max-w-[52ch]" style={{ color: BB.ink3 }}>
          Try again. If it keeps happening, tell us what you were doing and we will fix it.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <BtnButton onClick={reset} size="lg" className="w-full sm:w-auto">
            Try again
          </BtnButton>
          <Btn href="/" variant="secondary" size="lg" className="w-full sm:w-auto">
            Go home
          </Btn>
        </div>
      </div>
    </main>
  );
}
