/** Skeleton loaders shown while the ISR blog listing streams in. */
export default function BlogLoading() {
  return (
    <section aria-busy="true" aria-label="Loading blog posts">
      <div className="border-b border-line bg-gradient-to-br from-primary-dim via-transparent to-accent-dim">
        <div className="container-site py-16 md:py-24">
          <div className="skeleton h-5 w-24 rounded-full" />
          <div className="skeleton mt-4 h-12 w-2/3 max-w-xl rounded-xl" />
          <div className="skeleton mt-4 h-5 w-1/2 max-w-md rounded-lg" />
        </div>
      </div>
      <div className="container-site section">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="skeleton aspect-[16/9] w-full" />
              <div className="space-y-3 p-6">
                <div className="skeleton h-4 w-20 rounded-full" />
                <div className="skeleton h-5 w-4/5 rounded-md" />
                <div className="skeleton h-4 w-full rounded-md" />
                <div className="skeleton h-4 w-2/3 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
