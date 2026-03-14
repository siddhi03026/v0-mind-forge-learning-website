"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Cube, Heart, Hexagon, Building, RotateCcw, ZoomIn, ZoomOut, Move3D, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const topics = [
  {
    id: "heart",
    name: "Human Heart",
    icon: Heart,
    description: "Explore the anatomy of the human heart, including chambers, valves, and blood flow.",
    color: "destructive",
    parts: ["Left Atrium", "Right Atrium", "Left Ventricle", "Right Ventricle", "Aorta", "Pulmonary Artery"],
  },
  {
    id: "geometry",
    name: "Geometry Shapes",
    icon: Hexagon,
    description: "Interactive 3D geometric shapes including cubes, spheres, pyramids, and more.",
    color: "primary",
    parts: ["Cube", "Sphere", "Pyramid", "Cylinder", "Cone", "Dodecahedron"],
  },
  {
    id: "building",
    name: "Building Structure",
    icon: Building,
    description: "Understand architectural structures and their components in 3D.",
    color: "chart-4",
    parts: ["Foundation", "Columns", "Beams", "Walls", "Roof Structure", "Flooring"],
  },
]

const colorClasses = {
  destructive: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/30",
  },
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
  },
  "chart-4": {
    bg: "bg-chart-4/10",
    text: "text-chart-4",
    border: "border-chart-4/30",
  },
}

export default function Explorer3DPage() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0])
  const [rotation, setRotation] = useState([0])
  const [zoom, setZoom] = useState([100])
  const [selectedPart, setSelectedPart] = useState<string | null>(null)

  const handleReset = () => {
    setRotation([0])
    setZoom([100])
    setSelectedPart(null)
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
            <Cube className="h-5 w-5 text-chart-4" />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            3D Concept Explorer
          </h1>
        </div>
        <p className="text-muted-foreground">
          Interactive 3D models for visual learning. Rotate, zoom, and explore different concepts.
        </p>
      </motion.div>

      {/* Topic Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <Tabs
          defaultValue={topics[0].id}
          onValueChange={(value) => {
            const topic = topics.find((t) => t.id === value)
            if (topic) {
              setSelectedTopic(topic)
              setSelectedPart(null)
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-3">
            {topics.map((topic) => (
              <TabsTrigger key={topic.id} value={topic.id} className="gap-2">
                <topic.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{topic.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 3D Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <selectedTopic.icon className={`h-5 w-5 ${colorClasses[selectedTopic.color as keyof typeof colorClasses].text}`} />
                  {selectedTopic.name}
                </CardTitle>
                <CardDescription>{selectedTopic.description}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </CardHeader>
            <CardContent>
              {/* 3D View Area */}
              <div
                className="relative aspect-[4/3] rounded-xl bg-gradient-to-br from-muted to-muted/50 overflow-hidden"
                style={{
                  perspective: "1000px",
                }}
              >
                {/* Interactive 3D Model Placeholder */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotateY(${rotation[0]}deg) scale(${zoom[0] / 100})`,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTopic.id}
                      initial={{ opacity: 0, rotateY: -180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 180 }}
                      transition={{ duration: 0.5 }}
                      className={`relative h-48 w-48 rounded-2xl ${colorClasses[selectedTopic.color as keyof typeof colorClasses].bg} ${colorClasses[selectedTopic.color as keyof typeof colorClasses].border} border-2 flex items-center justify-center shadow-2xl`}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <selectedTopic.icon className={`h-24 w-24 ${colorClasses[selectedTopic.color as keyof typeof colorClasses].text}`} />
                      {/* Decorative 3D layers */}
                      <div
                        className={`absolute inset-0 rounded-2xl ${colorClasses[selectedTopic.color as keyof typeof colorClasses].bg} ${colorClasses[selectedTopic.color as keyof typeof colorClasses].border} border-2`}
                        style={{
                          transform: "translateZ(-20px)",
                          opacity: 0.5,
                        }}
                      />
                      <div
                        className={`absolute inset-0 rounded-2xl ${colorClasses[selectedTopic.color as keyof typeof colorClasses].bg} ${colorClasses[selectedTopic.color as keyof typeof colorClasses].border} border-2`}
                        style={{
                          transform: "translateZ(-40px)",
                          opacity: 0.25,
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg bg-background/80 px-4 py-2 backdrop-blur-sm">
                    <Move3D className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Drag to rotate</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Rotation
                    </label>
                    <span className="text-sm text-muted-foreground">{rotation[0]}°</span>
                  </div>
                  <Slider
                    value={rotation}
                    onValueChange={setRotation}
                    min={-180}
                    max={180}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <ZoomIn className="h-4 w-4" />
                      Zoom
                    </label>
                    <span className="text-sm text-muted-foreground">{zoom[0]}%</span>
                  </div>
                  <Slider
                    value={zoom}
                    onValueChange={setZoom}
                    min={50}
                    max={150}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Parts Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Model Parts
              </CardTitle>
              <CardDescription>Click on a part to learn more about it</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedTopic.parts.map((part) => (
                  <Button
                    key={part}
                    variant={selectedPart === part ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedPart(part === selectedPart ? null : part)}
                  >
                    {part}
                  </Button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {selectedPart && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <Card className={`${colorClasses[selectedTopic.color as keyof typeof colorClasses].bg}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{selectedPart}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This is the {selectedPart.toLowerCase()} of the {selectedTopic.name.toLowerCase()}. 
                          Click to highlight it in the 3D model and learn more about its function and structure.
                        </p>
                      </CardContent>
                    </Card>
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
