"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FileQuestion, CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function QuizPage() {

  const [topic, setTopic] = useState("")
  const [loadingQuiz, setLoadingQuiz] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)

  const generateQuiz = async () => {

    if (!topic.trim()) return

    setLoadingQuiz(true)

    const res = await fetch("/api/generate-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic })
    })

    const data = await res.json()

    setQuizQuestions(data.questions)
    setCurrentQuestion(0)
    setAnswers({})
    setQuizCompleted(false)
    setSelectedAnswer(null)
    setShowResult(false)

    setLoadingQuiz(false)
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="container mx-auto p-6">

        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Generate Quiz</CardTitle>
            <CardDescription>
              Enter a topic and generate a 10 question quiz
            </CardDescription>
          </CardHeader>

          <CardContent className="flex gap-3">

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: Photosynthesis"
              className="flex-1 border rounded-md px-3 py-2"
            />

            <Button onClick={generateQuiz}>
              {loadingQuiz ? "Generating..." : "Generate Quiz"}
            </Button>

          </CardContent>
        </Card>

      </div>
    )
  }

  const question = quizQuestions[currentQuestion]

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const isCorrect = selectedAnswer === question.correctAnswer

  const handleSubmit = () => {

    if (!selectedAnswer) return

    setAnswers({ ...answers, [question.id]: selectedAnswer })

    setShowResult(true)
  }

  const handleNext = () => {

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {

    setQuizQuestions([])
    setTopic("")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswers({})
    setQuizCompleted(false)
  }

  const calculateScore = () => {

    let correct = 0

    quizQuestions.forEach((q: any) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })

    return correct
  }

  return (

    <div className="container mx-auto p-6">

      <AnimatePresence mode="wait">

        {quizCompleted ? (

          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-2xl"
          >

            <Card className="text-center">

              <CardHeader>

                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-chart-4/10">
                  <Trophy className="h-10 w-10 text-chart-4" />
                </div>

                <CardTitle className="text-2xl">
                  Quiz Completed!
                </CardTitle>

              </CardHeader>

              <CardContent className="space-y-6">

                <div className="text-4xl font-bold">
                  {calculateScore()}/{quizQuestions.length}
                </div>

                <Button onClick={handleRestart} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  New Quiz
                </Button>

              </CardContent>

            </Card>

          </motion.div>

        ) : (

          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-2xl"
          >

            {/* Progress */}

            <Card className="mb-6">

              <CardContent className="pt-6">

                <div className="flex justify-between mb-2">

                  <span className="text-sm font-medium">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {Math.round(progress)}%
                  </span>

                </div>

                <Progress value={progress} className="h-2" />

              </CardContent>

            </Card>

            {/* Question */}

            <Card>

              <CardHeader>

                <CardTitle>
                  {question.question}
                </CardTitle>

              </CardHeader>

              <CardContent className="space-y-6">

                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={setSelectedAnswer}
                  disabled={showResult}
                  className="space-y-3"
                >

                  {question.options.map((option: any) => {

                    const isSelected = selectedAnswer === option.id
                    const isCorrectOption = option.id === question.correctAnswer

                    return (

                      <div
                        key={option.id}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer",
                          showResult && isCorrectOption && "border-accent bg-accent/10",
                          showResult && isSelected && !isCorrectOption && "border-destructive bg-destructive/10",
                          !showResult && isSelected && "border-primary bg-primary/5"
                        )}
                        onClick={() => !showResult && setSelectedAnswer(option.id)}
                      >

                        <RadioGroupItem value={option.id} id={option.id} />

                        <Label className="flex-1 cursor-pointer">
                          {option.text}
                        </Label>

                      </div>

                    )

                  })}

                </RadioGroup>

                {showResult && (

                  <Card
                    className={cn(
                      isCorrect
                        ? "border-accent/30 bg-accent/5"
                        : "border-destructive/30 bg-destructive/5"
                    )}
                  >

                    <CardContent className="pt-4">

                      <p className="text-sm text-muted-foreground">
                        {question.explanation}
                      </p>

                    </CardContent>

                  </Card>

                )}

                <div className="flex gap-3">

                  {!showResult ? (

                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedAnswer}
                      className="flex-1"
                    >
                      Submit Answer
                    </Button>

                  ) : (

                    <Button onClick={handleNext} className="flex-1">

                      {currentQuestion < quizQuestions.length - 1
                        ? "Next Question"
                        : "See Results"}

                    </Button>

                  )}

                </div>

              </CardContent>

            </Card>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  )
}