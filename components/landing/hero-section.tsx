"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Brain, Lightbulb, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">AI-Powered Education Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MindForge Learning
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
          >
            Forging Smarter Minds with AI-Powered Learning. Transform any concept into engaging video explanations, explore scientific truths, and interact with 3D models.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="gap-2 px-8">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 px-8">
              <Link href="#features">
                <Play className="h-4 w-4" />
                Explore Features
              </Link>
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm border border-border">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">AI Video Generation</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm border border-border">
              <Lightbulb className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Myth Busting</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm border border-border">
              <Zap className="h-5 w-5 text-chart-4" />
              <span className="text-sm font-medium">3D Interactive Models</span>
            </div>
          </motion.div>
        </div>

        {/* Hero illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-chart-4/60" />
              <div className="h-3 w-3 rounded-full bg-accent/60" />
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-3">
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">AI Video Explanation</h3>
                <p className="mt-1 text-sm text-muted-foreground">Generate video explanations for any concept</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Lightbulb className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold">Myth vs Fact</h3>
                <p className="mt-1 text-sm text-muted-foreground">Discover the science behind common myths</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                  <Zap className="h-5 w-5 text-chart-4" />
                </div>
                <h3 className="font-semibold">3D Explorer</h3>
                <p className="mt-1 text-sm text-muted-foreground">Interactive 3D models for visual learning</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
