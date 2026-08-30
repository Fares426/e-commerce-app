'use client'
import { useEffect, useState, useTransition, useMemo } from "react";
import { CheckCircle2, Star, Truck, RotateCcw, ShieldCheck, X, Trash2 } from "lucide-react";
import { ProductTabsProps } from "@/api/services/types";
import { createReviewAction, deleteReviewAction } from "@/app/products/[id]/productDetails.actions";

const PENDING_KEY_PREFIX = "pending-reviews-";

export default function ProductTabs({
  productId,
  description,
  category,
  subcategory,
  brand,
  ratingsAverage,
  ratingsQuantity,
  reviews = [],
  currentUserId, // pass this in from the server component (see below)
}: ProductTabsProps & { currentUserId?: string }) {
  const [tab, setTab] = useState<"details" | "reviews" | "shipping">("details");
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const storageKey = `${PENDING_KEY_PREFIX}${productId}`;

  // Merge server reviews with any pending (locally-submitted, not-yet-synced) reviews
  const [localReviews, setLocalReviews] = useState(reviews);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const pending: typeof reviews = raw ? JSON.parse(raw) : [];

      // Drop any pending reviews that now exist in the server data (synced)
      const stillPending = pending.filter(
        (p) => !reviews.some((r) => r._id === p._id)
      );

      if (stillPending.length !== pending.length) {
        localStorage.setItem(storageKey, JSON.stringify(stillPending));
      }

      setLocalReviews([...stillPending, ...reviews]);
    } catch {
      setLocalReviews(reviews);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews, storageKey]);

  const ratingBreakdown = useMemo(() => {
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = localReviews.filter((r) => r.rating === stars).length;
      return {
        stars,
        count,
        percent: localReviews.length === 0 ? 0 : Math.round((count / localReviews.length) * 100),
      };
    });
  }, [localReviews]);

  const tabs = [
    { key: "details" as const, label: "Product Details", icon: <CheckCircle2 size={16} /> },
    { key: "reviews" as const, label: `Reviews (${localReviews.length})`, icon: <Star size={16} /> },
    { key: "shipping" as const, label: "Shipping & Returns", icon: <Truck size={16} /> },
  ];

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setReviewText("");
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setFeedback({ type: "error", message: "Please select a rating." });
      return;
    }
    if (!reviewText.trim()) {
      setFeedback({ type: "error", message: "Please write a review." });
      return;
    }

    setFeedback(null);

    startTransition(async () => {
      const result = await createReviewAction(productId, rating, reviewText.trim());

      if (result.success) {
        const newReview = {
          ...result.data.data,
          user: { _id: currentUserId, name: "You" },
        };

        setLocalReviews((prev) => [newReview, ...prev]);

        try {
          const raw = localStorage.getItem(storageKey);
          const pending = raw ? JSON.parse(raw) : [];
          localStorage.setItem(storageKey, JSON.stringify([newReview, ...pending]));
        } catch {}

        setFeedback({ type: "success", message: "Review submitted successfully!" });
        resetForm();
        setShowForm(false);
      } else {
        setFeedback({ type: "error", message: result.message || "Something went wrong." });
      }
    });
  };




  return (
    <div className="mt-10 sm:mt-14">
      <div className="flex gap-4 sm:gap-8 border-b overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 flex items-center gap-1.5 pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              tab === t.key
                ? "border-green-500 text-green-600"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="pt-6">
        {tab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">About this Product</h3>
              <p className="text-sm text-neutral-500">{description}</p>

              <div className="mt-6 bg-neutral-50 rounded-lg p-4 text-sm">
                <h4 className="font-semibold mb-3 text-xs uppercase text-neutral-500">
                  Product Information
                </h4>
                <dl className="space-y-2">
                  {category && (
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">Category</dt>
                      <dd className="text-green-600">{category}</dd>
                    </div>
                  )}
                  {subcategory && (
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">Sub-category</dt>
                      <dd className="text-green-600">{subcategory}</dd>
                    </div>
                  )}
                  {brand && (
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">Brand</dt>
                      <dd className="text-green-600">{brand}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-xs uppercase text-neutral-500">Key Features</h4>
              <ul className="space-y-2 text-sm">
                {["Premium Quality Product", "100% Authentic Guarantee", "Fast & Secure Packaging", "Quality Tested"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                      {f}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-10">
            <div className="grid lg:grid-cols-[220px_1fr] gap-10">
              <div className="text-center">
                <h2 className="text-6xl font-bold">{ratingsAverage?.toFixed(1)}</h2>
                <div className="flex justify-center mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.round(ratingsAverage ?? 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-neutral-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-500 mt-3">Based on {localReviews.length} reviews</p>
              </div>

              <div className="space-y-4">
                {ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4">
                    <div className="w-16 text-sm">{item.stars} Star</div>
                    <div className="flex-1 h-2 rounded-full bg-neutral-200">
                      <div
                        className="h-full rounded-full bg-yellow-400"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm text-neutral-500">{item.percent}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              {!showForm ? (
                <button
                  onClick={() => {
                    setShowForm(true);
                    setFeedback(null);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer"
                >
                  Write a Review
                </button>
              ) : (
                <div className="rounded-xl border p-5 shadow-sm max-w-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-sm">Write a Review</h4>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                        setFeedback(null);
                      }}
                      className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starValue = i + 1;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="cursor-pointer"
                        >
                          <Star
                            size={26}
                            className={
                              starValue <= (hoverRating || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-neutral-300"
                            }
                          />
                        </button>
                      );
                    })}
                  </div>

                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    placeholder="Share your experience with this product..."
                    className="w-full rounded-lg border p-3 text-sm outline-none focus:border-green-500 resize-none"
                  />

                  {feedback && (
                    <p
                      className={`mt-3 text-sm ${
                        feedback.type === "success" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {feedback.message}
                    </p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {isPending ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              )}
            </div>

            <div className="border-t pt-10 space-y-6">
              {localReviews.length === 0 ? (
                <div className="text-center py-10">
                  <Star size={42} className="mx-auto text-neutral-300" />
                  <p className="mt-4 text-neutral-500">No reviews yet.</p>
                </div>
              ) : (
                localReviews.map((review) => (
                  <div key={review._id} className="rounded-xl border p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{review.user.name}</div>
                        <div className="flex mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-neutral-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-5 text-neutral-600 leading-7">{review.review}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === "shipping" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-green-50 rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <Truck size={18} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-sm">Shipping Information</h4>
                </div>
                <ul className="space-y-2.5 text-sm text-neutral-700">
                  {[
                    "Free shipping on orders over $50",
                    "Standard delivery: 3-5 business days",
                    "Express delivery available (1-2 business days)",
                    "Track your order in real-time",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <RotateCcw size={18} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-sm">Returns & Refunds</h4>
                </div>
                <ul className="space-y-2.5 text-sm text-neutral-700">
                  {[
                    "30-day hassle-free returns",
                    "Full refund or exchange available",
                    "Free return shipping on defective items",
                    "Easy online return process",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-5 sm:p-6 mt-4 sm:mt-6 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-neutral-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Buyer Protection Guarantee</h4>
                <p className="text-sm text-neutral-500">
                  Get a full refund if your order doesn't arrive or isn't as described. We ensure
                  your shopping experience is safe and secure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}