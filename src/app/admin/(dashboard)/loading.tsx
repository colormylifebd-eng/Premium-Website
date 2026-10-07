export default function AdminLoading() {
  return (
    <div className="space-y-4" role="status" aria-label="লোড হচ্ছে">
      <div className="h-10 w-64 animate-pulse rounded-xl bg-white" />
      <div className="h-5 w-48 animate-pulse rounded-lg bg-white" />
      <div className="mt-8 space-y-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-24 animate-pulse rounded-2xl bg-white" />
        ))}
      </div>
    </div>
  );
}
