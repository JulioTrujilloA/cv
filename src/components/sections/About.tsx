import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { config } from '@/portfolio.config';
import { ui } from '@/lib/ui-strings';
import { fadeUpVariants } from '@/lib/animation';

const fadeUp = fadeUpVariants(48, 0.8, 0.12);

// ── Animated counter card ───────────────────────────────────────────────────

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function StatCard({
  stat,
  delay,
}: {
  stat: {
    label: string;
    value: number | string;
    prefix?: string;
    suffix?: string;
  };
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState<number | string>(
    typeof stat.value === 'number' ? 0 : stat.value
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated || typeof stat.value !== 'number') return;

    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;
        setHasAnimated(true);
        observer.disconnect();

        const target = stat.value as number;
        const duration = 1600; // ms
        let start: number | null = null;

        const step = (timestamp: number) => {
          if (start === null) start = timestamp;
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          setDisplayed(Math.round(easeOutQuart(progress) * target));
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, stat.value]);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="border-border bg-card card-hover rounded-2xl border p-6"
      data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <p className="gradient-text mb-2 font-serif text-4xl font-light">
        {stat.prefix ?? ''}
        {displayed}
        {stat.suffix ?? ''}
      </p>
      <p className="text-muted-foreground text-xs tracking-wide">
        {stat.label}
      </p>
    </motion.div>
  );
}

// ── About section ───────────────────────────────────────────────────────────

export function About() {
  const ref = useRef<HTMLElement>(null);

  const stats =
    config.stats.length > 0
      ? config.stats.slice(0, 4)
      : [
          { label: 'Years Experience', value: 5, prefix: '', suffix: '+' },
          { label: 'Projects Shipped', value: 20, prefix: '', suffix: '+' },
          {
            label: 'Technologies',
            value: config.skills.reduce((acc, s) => acc + s.items.length, 0),
            prefix: '',
            suffix: '+',
          },
          {
            label: 'Cups of Coffee',
            value: '∞' as unknown as number,
            prefix: '',
            suffix: '',
          },
        ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left col */}
          <div>
            <motion.p
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-primary mb-4 font-mono text-xs font-medium tracking-widest uppercase"
            >
              {ui.about.eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="section-heading text-foreground mb-6 text-4xl leading-tight md:text-5xl"
            >
              {ui.about.headingLine1}
              <br />
              <em className="font-light not-italic">{ui.about.headingLine2}</em>
            </motion.h2>
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-8 h-px w-12"
              style={{
                background:
                  'linear-gradient(90deg, hsl(var(--primary)), transparent)',
              }}
            />
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-muted-foreground text-base leading-relaxed font-light whitespace-pre-line"
            >
              {config.about}
            </motion.p>

            {config.email && (
              <motion.a
                variants={fadeUp}
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                href={`mailto:${config.email}`}
                className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                data-testid="link-email"
              >
                <Mail size={14} />
                {config.email}
              </motion.a>
            )}
          </div>

          {/* Right col — animated stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
