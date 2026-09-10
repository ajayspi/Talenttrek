import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site flex flex-col items-center py-24 text-center">
        <p className="font-display text-7xl font-extrabold text-accent">404</p>
        <h1 className="mt-4 text-3xl md:text-4xl">Page not found</h1>
        <p className="mt-3 max-w-md text-ink-muted">
          That page has wandered off the map. Let&apos;s get you back to
          solid ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
