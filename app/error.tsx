"use client";

/** Route-level error boundary — final safety net under every section. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section">
      <div className="container-site flex flex-col items-center py-24 text-center">
        <h1 className="text-3xl md:text-4xl">Something went wrong</h1>
        <p className="mt-3 max-w-md text-ink-muted">
          An unexpected error occurred. Try again — or call us on 1800 860
          624 and a human will sort it out.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-ink-muted">
            Ref: {error.digest}
          </p>
        )}
        <button type="button" onClick={reset} className="btn btn-primary mt-8">
          Try again
        </button>
      </div>
    </section>
  );
}
