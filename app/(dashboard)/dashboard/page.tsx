"use client"

import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Video, Search, Box, FileQuestion, ArrowRight, BookOpen, Trophy, Clock } from "lucide-react"
import { motion } from "framer-motion"

const quickActions = [
  {
    title: "Generate Video Explanation",
    description: "Create AI-powered video explanations for any concept",
    icon: Video,
    href: "/video-ai",
    color: "primary",
  },
  {
    title: "Myth vs Fact",
    description: "Explore scientific truths behind common myths",
    icon: Search,
    href: "/myth-vs-fact",
    color: "accent",
  },
  {
    title: "Explore 3D Models",
    description: "Interactive 3D models for visual learning",
    icon: Box,
    href: "/3d-explorer",
    color: "chart-4",
  },
  {
    title: "Personalized Quiz",
    description: "Test your knowledge with adaptive quizzes",
    icon: FileQuestion,
    href: "/quiz",
    color: "chart-5",
  },
]

const progressData = [
  { subject: "Biology", progress: 75, lessonsCompleted: 15, totalLessons: 20 },
  { subject: "Physics", progress: 45, lessonsCompleted: 9, totalLessons: 20 },
  { subject: "Mathematics", progress: 60, lessonsCompleted: 12, totalLessons: 20 },
]

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    hover: "hover:border-primary/50",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    hover: "hover:border-accent/50",
  },
  "chart-4": {
    bg: "bg-chart-4/10",
    text: "text-chart-4",
    hover: "hover:border-chart-4/50",
  },
  "chart-5": {
    bg: "bg-chart-5/10",
    text: "text-chart-5",
    hover: "hover:border-chart-5/50",
  },
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1
          className="text-3xl font-bold tracking-tight md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome back, Student!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Continue your learning journey. Here is what you can do today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lessons Completed
            </CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">+4 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quiz Score
            </CardTitle>
            <Trophy className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Average accuracy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Learning Time
            </CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="mb-4 text-xl font-semibold">Your Progress</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {progressData.map((item) => (
            <Card key={item.subject}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.subject}</CardTitle>
                <CardDescription>
                  {item.lessonsCompleted} of {item.totalLessons} lessons completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={item.progress} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.progress}% complete
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const colors = colorClasses[action.color as keyof typeof colorClasses]
            return (
              <Card
                key={action.href}
                className={`group cursor-pointer transition-all ${colors.hover}`}
              >
                <Link href={action.href}>
                  <CardHeader>
                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
                      <action.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <CardTitle className="flex items-center justify-between text-base">
                      {action.title}
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
