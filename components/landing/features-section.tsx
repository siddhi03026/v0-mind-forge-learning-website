"use client"

import { Video, Search, Cube, FileQuestion } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Video,
    title: "AI Video Explanation",
    description:
      "Students paste a concept and our AI generates a short, engaging explanation video tailored to their learning level.",
    color: "primary",
  },
  {
    icon: Search,
    title: "Myth vs Fact",
    description:
      "Users paste a science myth and the system explains the scientific truth with evidence-based explanations.",
    color: "accent",
  },
  {
    icon: Cube,
    title: "3D Concept Explorer",
    description:
      "Interactive 3D models for human anatomy, geometry shapes, and structures. Learn by exploring.",
    color: "chart-4",
  },
  {
    icon: FileQuestion,
    title: "Personalized Quiz",
    description:
      "AI-generated quizzes adapted to your learning progress with instant feedback and explanations.",
    color: "chart-5",
  },
]

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "group-hover:border-primary/50",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "group-hover:border-accent/50",
  },
  "chart-4": {
    bg: "bg-chart-4/10",
    text: "text-chart-4",
    border: "group-hover:border-chart-4/50",
  },
  "chart-5": {
    bg: "bg-chart-5/10",
    text: "text-chart-5",
    border: "group-hover:border-chart-5/50",
  },
}

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 md:py-32">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2
            className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Powerful Features for Modern Learning
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the tools that make learning engaging, interactive, and personalized.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg ${colors.border}`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
                >
                  <feature.icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
