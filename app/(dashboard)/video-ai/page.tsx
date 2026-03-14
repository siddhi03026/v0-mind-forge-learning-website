"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Video, Sparkles, Play, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoAIPage() {
  const [concept, setConcept] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoGenerated, setVideoGenerated] = useState(false)

  const handleGenerate = async () => {
    if (!concept.trim()) return

    setIsGenerating(true)
    // Simulate video generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setVideoGenerated(true)
  }

  const handleReset = () => {
    setConcept("")
    setVideoGenerated(false)
  }

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Video className="h-5 w-5 text-primary" />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI Video Explanation
          </h1>
        </div>
        <p className="text-muted-foreground">
          Paste any concept and let AI generate a short, engaging explanation video tailored to your learning level.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Enter Your Concept
              </CardTitle>
              <CardDescription>
                Describe the concept you want to learn about. Be as specific as possible for better results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Example: Explain how photosynthesis works in plants, including the role of chlorophyll and the light-dependent and light-independent reactions..."
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="min-h-[200px] resize-none"
                disabled={isGenerating}
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={!concept.trim() || isGenerating}
                  className="flex-1 gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4" />
                      Generate Explanation Video
                    </>
                  )}
                </Button>
                {videoGenerated && (
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Tips for Better Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Be specific about what aspect of the topic you want to understand
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Include your current knowledge level (beginner, intermediate, advanced)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Mention if you prefer real-world examples or theoretical explanations
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Video Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Video Preview</CardTitle>
              <CardDescription>
                Your AI-generated explanation video will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex aspect-video flex-col items-center justify-center rounded-xl bg-muted"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm font-medium">Generating your video...</p>
                    <p className="mt-1 text-xs text-muted-foreground">This may take a few moments</p>
                  </motion.div>
                ) : videoGenerated ? (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 shadow-lg backdrop-blur-sm cursor-pointer transition-transform hover:scale-105">
                        <Play className="h-8 w-8 text-primary ml-1" />
                      </div>
                      <p className="mt-4 text-sm font-medium">Video Ready</p>
                      <p className="mt-1 text-xs text-muted-foreground">Click to play</p>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/60 p-3 backdrop-blur-sm">
                      <div className="h-1 w-full rounded-full bg-muted">
                        <div className="h-1 w-0 rounded-full bg-primary" />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground truncate">
                        {concept.substring(0, 50)}...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30"
                  >
                    <Video className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-sm text-muted-foreground">No video generated yet</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Enter a concept and click generate
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
