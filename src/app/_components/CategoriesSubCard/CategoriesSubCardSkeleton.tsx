export default function CategoriesSubCardSkeleton() {
  return (
    <div className="p-10 w-3/4 mx-auto animate-pulse">
      <div className="flex justify-between items-center mb-10">
        <div className="h-9 w-64 rounded bg-gray-200"></div>
        <div className="h-6 w-40 rounded bg-gray-200"></div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border p-3 text-center shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]"
          >
            <div className="mb-5">
              <div className="w-15 h-15 rounded-full bg-gray-200 mx-auto"></div>
            </div>

            <div className="h-5 w-24 rounded bg-gray-200 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}