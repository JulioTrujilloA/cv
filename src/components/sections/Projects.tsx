import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { config } from '@/portfolio.config';
import { ui } from '@/lib/ui-strings';
import { fadeUpVariants } from '@/lib/animation';
import type { useGitHubStats } from '@/hooks/useGitHubStats';

const fadeUp = fadeUpVariants(44, 0.75, 0.12);

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-muted/50 animate-pulse rounded ${className ?? ''}`} />
  );
}

export function Projects({
  data,
  loading,
  error,
}: ReturnType<typeof useGitHubStats>) {
  const githubUrl = (config.social as Record<string, string>)?.github ?? '';
  if (!githubUrl || githubUrl.includes('yourusername')) return null;
  if (error === 'not-found') return null;
  if (!loading && (!data || data.recentProjects.length === 0)) return null;

  const projects = data?.recentProjects ?? [];

  return (
    <section id="projects" className="bg-secondary/20 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-primary mb-4 font-mono text-xs font-medium tracking-widest uppercase"
        >
          {ui.projects.eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="section-heading text-foreground mb-14 text-4xl md:text-5xl"
        >
          {ui.projects.heading}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-7"
                >
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))
            : projects.map((project, i) => (
                <motion.div
                  key={project.name}
                  variants={fadeUp}
                  custom={i + 2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="group border-border bg-card card-hover flex flex-col gap-4 rounded-2xl border p-7"
                  data-testid={`project-${i}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-foreground group-hover:text-primary font-serif text-2xl font-light transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex shrink-0 gap-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg p-2 transition-all"
                        aria-label={ui.projects.repoAria}
                        data-testid={`link-repo-${project.name.toLowerCase()}`}
                      >
                        <Github size={16} />
                      </a>
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg p-2 transition-all"
                          aria-label={ui.projects.liveAria}
                          data-testid={`link-live-${project.name.toLowerCase()}`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground flex-1 text-sm leading-relaxed font-light">
                    {project.description || ui.projects.noDescription}
                  </p>
                  {project.language && (
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-secondary text-secondary-foreground border-border rounded-md border px-2.5 py-1 font-mono text-xs">
                        {project.language}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
