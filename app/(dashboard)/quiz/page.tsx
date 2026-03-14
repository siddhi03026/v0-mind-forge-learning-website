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

const quizQuestions = [
  {
    id: 1,
    question: "What is the powerhouse of the cell?",
    options: [
      { id: "a", text: "Nucleus" },
      { id: "b", text: "Mitochondria" },
      { id: "c", text: "Ribosome" },
      { id: "d", text: "Endoplasmic Reticulum" },
    ],
    correctAnswer: "b",
    explanation: "Mitochondria are often called the 'powerhouse of the cell' because they generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy.",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: "a", text: "Venus" },
      { id: "b", text: "Jupiter" },
      { id: "c", text: "Mars" },
      { id: "d", text: "Saturn" },
    ],
    correctAnswer: "c",
    explanation: "Mars is called the Red Planet because of its reddish appearance, which is caused by iron oxide (rust) on its surface.",
  },
  {
    id: 3,
    question: "What is the chemical symbol for gold?",
    options: [
      { id: "a", text: "Go" },
      { id: "b", text: "Gd" },
      { id: "c", text: "Au" },
      { id: "d", text: "Ag" },
    ],
    correctAnswer: "c",
    explanation: "Au comes from the Latin word 'aurum', meaning gold. Silver is Ag (argentum) and Gd is Gadolinium.",
  },
  {
    id: 4,
    question: "What is the speed of light in a vacuum?",
    options: [
      { id: "a", text: "300,000 km/s" },
      { id: "b", text: "150,000 km/s" },
      { id: "c", text: "450,000 km/s" },
      { id: "d", text: "200,000 km/s" },
    ],
    correctAnswer: "a",
    explanation: "The speed of light in a vacuum is approximately 299,792 kilometers per second (often rounded to 300,000 km/s).",
  },
  {
    id: 5,
    question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
    options: [
      { id: "a", text: "Oxygen" },
      { id: "b", text: "Nitrogen" },
      { id: "c", text: "Carbon Dioxide" },
      { id: "d", text: "Hydrogen" },
    ],
    correctAnswer: "c",
    explanation: "Plants absorb carbon dioxide (CO2) from the atmosphere and use it along with water and sunlight to produce glucose and oxygen through photosynthesis.",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)

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
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswers({})
    setQuizCompleted(false)
  }

  const calculateScore = () => {
    let correct = 0
    quizQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return correct
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-5/10">
            <FileQuestion className="h-5 w-5 text-chart-5" />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Personalized Quiz
          </h1>
        </div>
        <p className="text-muted-foreground">
          Test your knowledge with AI-generated quizzes adapted to your learning progress.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {quizCompleted ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mx-auto max-w-2xl"
          >
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-chart-4/10">
                  <Trophy className="h-10 w-10 text-chart-4" />
                </div>
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>Here is how you did</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      {calculateScore()}/{quizQuestions.length}
                    </div>
                    <p className="text-sm text-muted-foreground">Correct Answers</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent">
                      {Math.round((calculateScore() / quizQuestions.length) * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                </div>

                {/* Results breakdown */}
                <div className="space-y-3">
                  {quizQuestions.map((q, index) => (
                    <div
                      key={q.id}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3",
                        answers[q.id] === q.correctAnswer
                          ? "border-accent/30 bg-accent/5"
                          : "border-destructive/30 bg-destructive/5"
                      )}
                    >
                      {answers[q.id] === q.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive shrink-0" />
                      )}
                      <span className="text-sm text-left">
                        Q{index + 1}: {q.question}
                      </span>
                    </div>
                  ))}
                </div>

                <Button onClick={handleRestart} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-auto max-w-2xl"
          >
            {/* Progress */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progress)}% complete
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-chart-5" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Science Quiz
                  </span>
                </div>
                <CardTitle className="text-xl">{question.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={setSelectedAnswer}
                  disabled={showResult}
                  className="space-y-3"
                >
                  {question.options.map((option) => {
                    const isSelected = selectedAnswer === option.id
                    const isCorrectOption = option.id === question.correctAnswer
                    
                    return (
                      <div
                        key={option.id}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg border p-4 transition-all cursor-pointer",
                          showResult && isCorrectOption && "border-accent bg-accent/10",
                          showResult && isSelected && !isCorrectOption && "border-destructive bg-destructive/10",
                          !showResult && isSelected && "border-primary bg-primary/5",
                          !showResult && !isSelected && "hover:border-muted-foreground/50"
                        )}
                        onClick={() => !showResult && setSelectedAnswer(option.id)}
                      >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label
                          htmlFor={option.id}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          {option.text}
                        </Label>
                        {showResult && isCorrectOption && (
                          <CheckCircle className="h-5 w-5 text-accent" />
                        )}
                        {showResult && isSelected && !isCorrectOption && (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                    )
                  })}
                </RadioGroup>

                {/* Feedback Section */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <Card
                        className={cn(
                          "border-2",
                          isCorrect
                            ? "border-accent/30 bg-accent/5"
                            : "border-destructive/30 bg-destructive/5"
                        )}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle
                            className={cn(
                              "flex items-center gap-2 text-base",
                              isCorrect ? "text-accent" : "text-destructive"
                            )}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle className="h-5 w-5" />
                                Correct!
                              </>
                            ) : (
                              <>
                                <XCircle className="h-5 w-5" />
                                Incorrect
                              </>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {question.explanation}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!showResult ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedAnswer}
                      className="flex-1 gap-2"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button onClick={handleNext} className="flex-1 gap-2">
                      {currentQuestion < quizQuestions.length - 1 ? (
                        <>
                          Next Question
                          <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          See Results
                          <Trophy className="h-4 w-4" />
                        </>
                      )}
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
