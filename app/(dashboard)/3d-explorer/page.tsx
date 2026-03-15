"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Search, XCircle, CheckCircle, AlertTriangle, Sparkles, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Result = {
  myth: string
  classification: "MYTH" | "FACT" | "PARTIALLY TRUE"
  fact: string
  explanation: string
  source?: string
  confidence?: number
}

const sampleMyths = [
  "Humans only use 10% of their brain",
  "Lightning never strikes the same place twice",
  "The Great Wall of China is visible from space",
  "Goldfish have a 3-second memory",
]

export default function MythVsFactPage() {
  const [myth, setMyth] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const handleAnalyze = async () => {
    if (!myth.trim()) return

    setIsAnalyzing(true)
    setResult(null)

    try {
      const res = await fetch("/api/myth-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ statement: myth })
      })

      const data = await res.json()

      setResult(data)
    } catch (error) {
      console.error(error)
      alert("Error analyzing myth")
    }

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

  const getIcon = () => {
    if (!result) return null

    if (result.classification === "FACT")
      return <CheckCircle className="h-5 w-5 text-green-500" />

    if (result.classification === "MYTH")
      return <XCircle className="h-5 w-5 text-red-500" />

    return <AlertTriangle className="h-5 w-5 text-yellow-500" />
  }

  return (
    <div className="container mx-auto p-6">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Search className="h-5 w-5 text-accent" />
          </div>

          <h1 className="text-3xl font-bold">
            Myth vs Fact
          </h1>
        </div>

        <p className="text-muted-foreground">
          Paste a science myth and discover the scientific truth behind it.
        </p>
      </motion.div>

      {/* Input Card */}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Enter a Myth
          </CardTitle>

          <CardDescription>
            Type or paste a commonly believed myth.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          <Textarea
            placeholder="Example: Humans only use 10% of their brain..."
            value={myth}
            onChange={(e) => setMyth(e.target.value)}
            className="min-h-[120px]"
            disabled={isAnalyzing}
          />

          {/* Sample Myths */}

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Try a sample myth
            </p>

            <div className="flex flex-wrap gap-2">
              {sampleMyths.map((sample) => (
                <Button
                  key={sample}
                  size="sm"
                  variant="outline"
                  onClick={() => handleSampleClick(sample)}
                  disabled={isAnalyzing}
                >
                  {sample}
                </Button>
              ))}
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-3">

            <Button
              onClick={handleAnalyze}
              disabled={!myth.trim() || isAnalyzing}
              className="flex-1 gap-2"
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
              <Button
                variant="outline"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Loading */}

      <AnimatePresence mode="wait">
        {isAnalyzing && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-10"
          >
            <Spinner className="h-10 w-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}

      {result && !isAnalyzing && (

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 md:grid-cols-2"
        >

          {/* Classification */}

          <Card>
            <CardHeader>

              <CardTitle className="flex items-center gap-2">
                {getIcon()}
                {result.classification}
              </CardTitle>

              {result.confidence && (
                <CardDescription>
                  Confidence: {(result.confidence * 100).toFixed(0)}%
                </CardDescription>
              )}

            </CardHeader>

            <CardContent>
              <p className="text-lg font-medium">
                "{result.myth}"
              </p>
            </CardContent>
          </Card>

          {/* Fact */}

          <Card>
            <CardHeader>
              <CardTitle>Scientific Fact</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                {result.fact}
              </p>
            </CardContent>
          </Card>

          {/* Explanation */}

          <Card className="md:col-span-2">

            <CardHeader>
              <CardTitle>Explanation</CardTitle>
              <CardDescription>
                Why this myth exists and what science says
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                {result.explanation}
              </p>

              {result.source && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Source: {result.source}
                </p>
              )}

            </CardContent>
          </Card>

        </motion.div>
      )}

    </div>
  )
}