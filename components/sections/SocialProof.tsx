import { reviews } from '@/lib/data';
import { StarRating } from '@/components/ui/StarRating';

export function SocialProof() {
  return (
    <section className="bg-[#FAF7F2] py-24">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="text-center mb-5">
          <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold mb-3.5">
            Reviews
          </p>
          <h2 className="font-display text-[44px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
            Wat klanten zeggen
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            <StarRating count={5} />
            <span className="text-[12px] text-zinc-400 ml-1.5">4.9 gemiddeld · 500+ reviews</span>
          </div>
        </div>

        <div className="mt-13 grid md:grid-cols-3 gap-6">
          {reviews.map(({ text, author, product, rating }) => (
            <div key={author} className="bg-white border border-gold/[0.15] p-9">
              <StarRating count={rating} />
              <p className="font-display text-[16px] italic text-zinc-700 leading-[1.8] mt-[18px] mb-6">
                &ldquo;{text}&rdquo;
              </p>
              <div className="border-t border-[#F0EBE3] pt-[18px]">
                <p className="text-[12px] font-semibold text-[#0a0a0a]">{author}</p>
                <p className="text-[11px] text-gold mt-0.5 tracking-[0.05em]">{product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
