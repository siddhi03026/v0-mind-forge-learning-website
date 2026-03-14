"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Search, XCircle, CheckCircle, Sparkles, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const sampleMyths = [
  "Humans only use 10% of their brain",
  "Lightning never strikes the same place twice",
  "The Great Wall of China is visible from space",
  "Goldfish have a 3-second memory",
]

export default function MythVsFactPage() {
  const [myth, setMyth] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    myth: string
    fact: string
    explanation: string
  } | null>(null)

  const handleAnalyze = async () => {
    if (!myth.trim()) return

    setIsAnalyzing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500))
    
    setResult({
      myth: myth,
      fact: "This is actually a common misconception. Scientific research has shown that this belief is not supported by evidence.",
      explanation: "Modern neuroscience has demonstrated through brain imaging studies (fMRI and PET scans) that we use virtually every part of our brain, and most of the brain is active almost all the time. Different areas of the brain are responsible for different functions, and while not all areas are active simultaneously, over the course of a day, we use 100% of our brain."
    })
    setIsAnalyzing(false)
  }

  const handleReset = () => {
    setMyth("")
    setResult(null)
  }

  const handleSampleClick = (sample: string) => {
    setMyth(sample)
    setResult(null)
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Search className="h-5 w-5 text-accent" />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Myth vs Fact
          </h1>
        </div>
        <p className="text-muted-foreground">
          Paste a science myth and discover the scientific truth behind it with evidence-based explanations.
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Enter a Myth
            </CardTitle>
            <CardDescription>
              Type or paste a commonly believed myth that you want to fact-check
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Example: Humans only use 10% of their brain..."
              value={myth}
              onChange={(e) => setMyth(e.target.value)}
              className="min-h-[120px] resize-none"
              disabled={isAnalyzing}
            />
            
            {/* Sample Myths */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Try a sample myth:</p>
              <div className="flex flex-wrap gap-2">
                {sampleMyths.map((sample) => (
                  <Button
                    key={sample}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSampleClick(sample)}
                    disabled={isAnalyzing}
                    className="text-xs"
                  >
                    {sample}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={!myth.trim() || isAnalyzing}
                className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isAnalyzing ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Analyze Myth
                  </>
                )}
              </Button>
              {result && (
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-center py-12"
          >
            <div className="text-center">
              <div className="relative mx-auto mb-4">
                <div className="absolute inset-0 animate-ping rounded-full bg-accent/20 h-16 w-16" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Search className="h-8 w-8 text-accent animate-pulse" />
                </div>
              </div>
              <p className="font-medium">Analyzing your myth...</p>
              <p className="text-sm text-muted-foreground">Checking scientific sources</p>
            </div>
          </motion.div>
        ) : result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Myth Card */}
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  Myth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{`"${result.myth}"`}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  This statement is commonly believed but is not scientifically accurate.
                </p>
              </CardContent>
            </Card>

            {/* Fact Card */}
            <Card className="border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <CheckCircle className="h-5 w-5" />
                  Scientific Fact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{result.fact}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Based on peer-reviewed scientific research and evidence.
                </p>
              </CardContent>
            </Card>

            {/* Explanation Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Detailed Explanation</CardTitle>
                <CardDescription>
                  Understanding why this myth persists and what science tells us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {result.explanation}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
