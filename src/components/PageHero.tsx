import { motion, useScroll, useTransform } from 'motion/react';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

type HeroAction = {
  label: string;
  to: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  poster?: string;
  image?: string;
  videoSources?: string[];
  actions?: HeroAction[];
  compact?: boolean;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  poster,
  image,
  videoSources,
  actions = [],
  compact = false,
  children,
}: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={containerRef}
      className={compact ? 'relative min-h-[68vh] overflow-hidden flex items-center justify-center' : 'relative h-screen overflow-hidden flex items-center justify-center'}
    >
      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/42 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-ink z-10" />
        {videoSources?.length ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
            className="h-full w-full object-cover filter brightness-[0.8] contrast-[1.06]"
          >
            {videoSources.map((source) => (
              <source key={source} src={source} type="video/mp4" />
            ))}
          </video>
        ) : (
          <img src={image ?? poster} alt="" className="h-full w-full object-cover filter brightness-[0.72]" />
        )}
      </motion.div>

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-28 text-center sm:px-12 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: 'easeOut', delay: 0.15 }}
          className="mb-6 flex items-center gap-4"
        >
          <span className="h-[1px] w-12 bg-gold" />
          <span className="small-caps text-gold">{eyebrow}</span>
          <span className="h-[1px] w-12 bg-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          className={compact ? 'max-w-5xl font-serif text-5xl font-light leading-[0.9] tracking-tight sm:text-7xl md:text-8xl' : 'max-w-5xl font-serif text-6xl font-light leading-[0.85] tracking-tight sm:text-8xl md:text-9xl'}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.25, delay: 0.8 }}
          className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/70 sm:text-xl"
        >
          {description}
        </motion.p>

        {actions.length ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            {actions.map((action, index) => (
              <Link
                key={action.to}
                to={action.to}
                className={
                  index === 0
                    ? 'rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white hover:text-black'
                    : 'rounded-full border border-white/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-all hover:bg-white hover:text-black'
                }
              >
                {action.label}
              </Link>
            ))}
          </motion.div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
