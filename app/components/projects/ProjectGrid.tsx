"use client";

import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  GraduationCap,
  HeartPulse,
  Building2,
  Sprout,
  Cpu,
} from "lucide-react";

type Project = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconClasses: string;
  pillarLabel: string;
};

const PROJECTS: Project[] = [
  {
    id: "clean-water",
    name: "Clean Water",
    description: "Providing safe drinking water for communities across Haiti.",
    icon: Droplets,
    iconClasses: "bg-sky-50 text-sky-600 group-hover:bg-sky-100",
    pillarLabel: "Pillar 01 · Clean Water",
  },
  {
    id: "education",
    name: "Education",
    description: "Schools and learning opportunities for the next generation.",
    icon: GraduationCap,
    iconClasses: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    pillarLabel: "Pillar 02 · Education",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Improving access to clinics, hospitals, and medical support.",
    icon: HeartPulse,
    iconClasses: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
    pillarLabel: "Pillar 03 · Healthcare",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Rebuilding roads, bridges, and essential public services.",
    icon: Building2,
    iconClasses: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100",
    pillarLabel: "Pillar 04 · Infrastructure",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    description: "Supporting local farmers and sustainable food systems.",
    icon: Sprout,
    iconClasses: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
    pillarLabel: "Pillar 05 · Agriculture",
  },
  {
    id: "technology",
    name: "Technology",
    description:
      "Digital inclusion, connectivity, and tech training programs for young people.",
    icon: Cpu,
    iconClasses: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100",
    pillarLabel: "Pillar 06 · Technology",
  },
];

type ProjectGridProps = {
  locale: string;
  blogSlug?: string;
};

export default function ProjectGrid({
  locale,
  blogSlug = "welcome-to-ayiti-2075-blog",
}: ProjectGridProps) {
  return (
    <div className="mx-auto mt-10 max-w-5xl divide-y divide-slate-200/70">
      {PROJECTS.map((project) => {
        const Icon = project.icon;

        return (
          <section
            key={project.id}
            className="group flex flex-col items-center px-4 py-10 text-center sm:px-8"
          >
            {/* Pillar label */}
            <p className="mb-4 text-[0.65rem] font-semibold tracking-[0.25em] text-amber-700/80">
              {project.pillarLabel.toUpperCase()}
            </p>

            {/* Icon with soft colored background and hover scale */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-100 bg-amber-50/70 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <span
                className={
                  "flex h-10 w-10 items-center justify-center rounded-full text-base transition-colors duration-300 " +
                  project.iconClasses
                }
              >
                <Icon className="h-5 w-5" />
              </span>
            </div>

            {/* Project title in dark gold */}
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#b45309]">
              {project.name}
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              {project.description}
            </p>

            {/* Link to the blog vision */}
            <a
              href={`/${locale}/blog/${blogSlug}`}
              className="mt-4 inline-flex items-center text-sm font-semibold text-purple-700 underline-offset-4 hover:underline"
            >
              Read the vision behind this work
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </a>
          </section>
        );
      })}
    </div>
  );
}
