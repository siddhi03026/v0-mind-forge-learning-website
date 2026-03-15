"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Video, Sparkles, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoAIPage() {
  const [concept, setConcept] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoGenerated, setVideoGenerated] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")

  const videoLibrary = {
    solar: "https://www.youtube.com/embed/libKVRa01L8",
    photosynthesis: "https://www.youtube.com/embed/sQK3Yr4Sc_k",
    geometry: "https://www.youtube.com/embed/302eJ3TzJQU",
    trigonometry: "https://www.youtube.com/embed/2z6H4L1Hk0Q",
    default: "https://www.youtube.com/embed/HQ3dCWjfRZk",
  }

  const handleGenerate = async () => {
    if (!concept.trim()) return

    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const text = concept.toLowerCase()

    if (text.includes("solar")) {
      setVideoUrl(videoLibrary.solar)
    } 
    else if (text.includes("photosynthesis")) {
      setVideoUrl(videoLibrary.photosynthesis)
    } 
    else if (text.includes("geometry")) {
      setVideoUrl(videoLibrary.geometry)
    } 
    else if (text.includes("trigonometry")) {
      setVideoUrl(videoLibrary.trigonometry)
    } 
    else {
      setVideoUrl(videoLibrary.default)
    }

    setIsGenerating(false)
    setVideoGenerated(true)
  }

  const handleReset = () => {
    setConcept("")
    setVideoGenerated(false)
    setVideoUrl("")
  }

  return (
    <div className="container mx-auto p-6">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Video className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">AI Video Explanation</h1>
        </div>

        <p className="text-muted-foreground">
          Enter a concept and AI will show an explanation video.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Input Section */}

        <Card>
          <CardHeader>
            <CardTitle>Enter Concept</CardTitle>
            <CardDescription>
              Example: Solar system, Photosynthesis, Geometry, Trigonometry
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            <Textarea
              placeholder="Explain Solar System..."
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              disabled={isGenerating}
            />

            <div className="flex gap-3">

              <Button
                onClick={handleGenerate}
                disabled={!concept.trim() || isGenerating}
                className="flex-1"
              >

                {isGenerating ? (
                  <>
                    <Spinner className="h-4 w-4 mr-2" />
                    Generating
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Video
                  </>
                )}

              </Button>

              {videoGenerated && (
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}

            </div>

          </CardContent>
        </Card>

        {/* Video Section */}

        <Card>
          <CardHeader>
            <CardTitle>Video Preview</CardTitle>
          </CardHeader>

          <CardContent>

            <AnimatePresence>

              {isGenerating ? (

                <div className="flex aspect-video items-center justify-center bg-muted rounded-xl">
                  <p>Generating Video...</p>
                </div>

              ) : videoGenerated ? (

                <div className="aspect-video">

                  <iframe
                    width="100%"
                    height="100%"
                    src={videoUrl}
                    title="Educational Video"
                    allowFullScreen
                    className="rounded-xl"
                  />

                </div>

              ) : (

                <div className="flex aspect-video items-center justify-center border-2 border-dashed rounded-xl">
                  <p>No video generated</p>
                </div>

              )}

            </AnimatePresence>

          </CardContent>
        </Card>

      </div>

    </div>
  )
}