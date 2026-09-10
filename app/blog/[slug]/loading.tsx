/** Skeleton loaders shown while an ISR blog post streams in. */
export default function BlogPostLoading() {
  return (
    <div aria-busy="true" aria-label="Loading article">
      <header className="border-b border-line bg-gradient-to-br from-primary-dim via-transparent to-accent-dim">
        <div className="container-site py-14 md:py-20">
          <div className="skeleton h-4 w-40 rounded-full" />
          <div className="skeleton mt-6 h-10 w-3/4 max-w-2xl rounded-xl" />
          <div className="skeleton mt-4 h-10 w-1/2 max-w-lg rounded-xl" />
          <div className="mt-6 flex gap-4">
            <div className="skeleton h-4 w-24 rounded-full" />
            <div className="skeleton h-4 w-24 rounded-full" />
            <div className="skeleton h-4 w-24 rounded-full" />
          </div>
        </div>
      </header>
      <div className="container-site py-10">
        <div className="skeleton mx-auto aspect-[16/8] max-w-4xl rounded-2xl" />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="skeleton h-4 rounded-md"
              style={{ width: `${92 - (i % 4) * 9}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
