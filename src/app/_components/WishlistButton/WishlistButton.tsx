'use client';

import {
  addToWishlist,
  removeFromWishlist,
} from '@/app/_actions/wishlist.actions';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function WishlistButton({
  productId,
  className = '',
  compact = false,
}: {
  productId: string;
  className?: string;
  compact?: boolean;
}) {
  const [isSaved, setIsSaved] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const success = isSaved
        ? await removeFromWishlist(productId)
        : await addToWishlist(productId);

      if (success) {
        setIsSaved(!isSaved);
        toast.success(
          isSaved ? 'Removed from wishlist' : 'Added to wishlist',
          { position: 'top-center' },
        );
      } else {
        toast.error('Unable to update wishlist right now.', {
          position: 'top-center',
        });
      }
    } catch {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-center',
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg border transition-colors',
        compact ? 'px-2 py-1.5 text-xs' : 'flex-1 px-3 py-2.5 text-sm',
        isSaved
          ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
          : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-700',
        className,
      ].join(' ')}
    >
      <Heart className={['h-4 w-4', isSaved ? 'fill-current' : ''].join(' ')} />
      {isSaved ? 'Saved' : 'Add to Wishlist'}
    </button>
  );
}
