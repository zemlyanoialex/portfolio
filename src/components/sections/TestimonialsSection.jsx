import { useEffect, useMemo, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/portfolioData';

function getInitials(name) {
  if (typeof name !== 'string' || !name.trim()) {
    return '?';
  }

  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (!words.length) {
    return '?';
  }

  return words.map((word) => word[0].toUpperCase()).join('');
}

export default function TestimonialsSection({ testimonials }) {
  const getPageSize = () => {
    if (typeof window === 'undefined') {
      return 3;
    }
    if (window.innerWidth >= 1280) {
      return 3;
    }
    if (window.innerWidth >= 768) {
      return 2;
    }
    return 1;
  };

  const [pageSize, setPageSize] = useState(getPageSize);
  const [currentPage, setCurrentPage] = useState(0);
  const swipeStartRef = useRef(null);
  const swipeDeltaXRef = useRef(0);
  const swipeDeltaYRef = useRef(0);
  const wheelCooldownRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = testimonials?.length ? testimonials : TESTIMONIALS;
  const visibleItems = items
    .filter(
      (item) =>
        !item?.isHidden
        && typeof item?.quote === 'string'
        && item.quote.trim().length > 0
    )
    .sort((a, b) => (a?.order ?? Number.MAX_SAFE_INTEGER) - (b?.order ?? Number.MAX_SAFE_INTEGER));

  const pages = useMemo(() => {
    const chunks = [];
    for (let index = 0; index < visibleItems.length; index += pageSize) {
      chunks.push(visibleItems.slice(index, index + pageSize));
    }
    return chunks;
  }, [pageSize, visibleItems]);

  const totalPages = pages.length;
  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));

  useEffect(() => {
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
    }
  }, [currentPage, safePage]);

  const goPrev = () => {
    if (!totalPages) {
      return;
    }
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goNext = () => {
    if (!totalPages) {
      return;
    }
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const resetSwipeTracking = () => {
    swipeStartRef.current = null;
    swipeDeltaXRef.current = 0;
    swipeDeltaYRef.current = 0;
  };

  const commitSwipe = () => {
    const deltaX = swipeDeltaXRef.current;
    const deltaY = swipeDeltaYRef.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < 50 || absX <= absY) {
      return;
    }

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrev();
  };

  const handlePointerDown = (event) => {
    if (totalPages <= 1) {
      return;
    }

    swipeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };
    swipeDeltaXRef.current = 0;
    swipeDeltaYRef.current = 0;
  };

  const handlePointerMove = (event) => {
    const start = swipeStartRef.current;
    if (!start || start.pointerId !== event.pointerId) {
      return;
    }

    swipeDeltaXRef.current = event.clientX - start.x;
    swipeDeltaYRef.current = event.clientY - start.y;
  };

  const handlePointerUp = (event) => {
    const start = swipeStartRef.current;
    if (!start || start.pointerId !== event.pointerId) {
      return;
    }

    commitSwipe();
    resetSwipeTracking();
  };

  const handlePointerCancel = () => {
    resetSwipeTracking();
  };

  const handleWheel = (event) => {
    if (totalPages <= 1) {
      return;
    }

    const horizontalAmount = Math.abs(event.deltaX);
    const verticalAmount = Math.abs(event.deltaY);
    if (horizontalAmount < 30 || horizontalAmount <= verticalAmount) {
      return;
    }

    const now = Date.now();
    if (now - wheelCooldownRef.current < 450) {
      event.preventDefault();
      return;
    }

    wheelCooldownRef.current = now;
    event.preventDefault();
    if (event.deltaX > 0) {
      goNext();
      return;
    }
    goPrev();
  };

  if (!visibleItems.length) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-end md:justify-between md:gap-4 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
              Testimonials
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl">
              Feedback from teams I have worked with on long-term products.
            </p>
          </div>

          {totalPages > 1 ? (
            <div className="mt-6 md:mt-0 flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="h-9 w-9 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:border-orange-400/60 transition-colors"
                aria-label="Previous testimonials"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goNext}
                className="h-9 w-9 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:border-orange-400/60 transition-colors"
                aria-label="Next testimonials"
              >
                →
              </button>
            </div>
          ) : null}
        </div>

        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerCancel}
          onWheel={handleWheel}
          style={{ touchAction: 'pan-y' }}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translate3d(-${safePage * 100}%, 0, 0)` }}
            >
              {pages.map((pageItems, pageIndex) => (
                <div key={`testimonial-track-page-${pageIndex + 1}`} className="w-full shrink-0">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {pageItems.map((item) => {
                      const personName = item?.name || 'Anonymous';

                      return (
                        <article
                          key={item.id ?? `${item?.name ?? 'testimonial'}-${item?.order ?? 0}`}
                          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-6"
                        >
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-11 h-11 rounded-full bg-orange-500/15 text-orange-500 font-bold flex items-center justify-center">
                              {getInitials(personName)}
                            </div>
                            <Quote className="w-5 h-5 text-orange-500/70" />
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">“{item.quote}”</p>

                          <div className="text-sm">
                            <div className="font-semibold text-slate-900 dark:text-white">{personName}</div>
                            <div className="text-slate-500 dark:text-slate-400">
                              {item.company || null}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalPages > 1 ? (
          <div className="mt-6 flex justify-center gap-2">
            {pages.map((_, index) => (
              <button
                key={`testimonial-page-${index + 1}`}
                type="button"
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to testimonials page ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === safePage
                    ? 'w-8 bg-orange-500'
                    : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
