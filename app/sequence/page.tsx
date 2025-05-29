"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import GameLogic from "@/lib/game-logic"
import { ArrowLeftCircle, ArrowRightCircle, Sparkles, Brain, RefreshCw, Dices } from "lucide-react"

interface GameState {
    numbers: number[]
    playerScore: number
    aiScore: number
    isPlayerTurn: boolean
    gameOver: boolean
    gameStarted: boolean
}
export default function MinimaxGame() {
    const [gameState, setGameState] = useState<GameState>({
        numbers: [],
        playerScore: 0,
        aiScore: 0,
        isPlayerTurn: true,
        gameOver: false,
        gameStarted: false,
    } )

    const [numbersInput, setNumbersInput] = useState("1,3,7,9,2,4")
    const [randomCount, setRandomCount] = useState(6)
    const [thinking, setThinking] = useState(false)
    const gameLogic = new GameLogic()

    const generateRandom = () => {
        const count = randomCount || 6
        const numbers = []
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * 20) + 1)
        }
        setNumbersInput(numbers.join(","))
    }

    const startGame = () => {
        const numbers = numbersInput
            .split(",")
            .map((x) => Number.parseInt(x.trim()))
            .filter((x) => !isNaN(x))

        if (numbers.length < 2) {
            toast.error("Invalid Input, enter at least 2 numbers.");
            return
        }

        gameLogic.startGame(numbers)
        setGameState({
            numbers: [...numbers],
            playerScore: 0,
            aiScore: 0,
            isPlayerTurn: true,
            gameOver: false,
            gameStarted: true,
        })
    }

    const makeMove = async (move: "left" | "right") => {
        if (gameState.gameOver || gameState.numbers.length === 0) return

        let value
        const newNumbers = [...gameState.numbers]

        if (move === "left") {
            value = newNumbers.shift()
        } else {
            value = newNumbers.pop()
        }

        const newPlayerScore = gameState.playerScore + (value || 0)

        setGameState({
            ...gameState,
            numbers: newNumbers,
            playerScore: newPlayerScore,
            isPlayerTurn: false,
        })

        // Check if game is over after player's move
        if (newNumbers.length === 0) {
            setGameState({
                ...gameState,
                numbers: newNumbers,
                playerScore: newPlayerScore,
                gameOver: true,
            })
            return
        }

        // AI's turn
        setThinking(true)

        // Simulate AI thinking with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const bestMove = gameLogic.getBestMove(newNumbers)
        let aiValue
        const aiNumbers = [...newNumbers]

        if (bestMove === "left") {
            aiValue = aiNumbers.shift()
        } else {
            aiValue = aiNumbers.pop()
        }

        const newAiScore = gameState.aiScore + (aiValue || 0)
        const isGameOver = aiNumbers.length === 0

        setThinking(false)
        setGameState({
            ...gameState,
            numbers: aiNumbers,
            playerScore: newPlayerScore,
            aiScore: newAiScore,
            isPlayerTurn: true,
            gameOver: isGameOver,
        })
    }

    const resetGame = () => {
        setGameState({
            numbers: [],
            playerScore: 0,
            aiScore: 0,
            isPlayerTurn: true,
            gameOver: false,
            gameStarted: false,
        })
    }

    const getGameStatus = () => {
        if (gameState.gameOver) {
            if (gameState.playerScore > gameState.aiScore) {
                return { message: "🎉 You Win!", isWinner: true }
            } else if (gameState.aiScore > gameState.playerScore) {
                return { message: "🤖 AI Wins!", isWinner: false }
            } else {
                return { message: "🤝 It's a Tie!", isWinner: false }
            }
        } else if (thinking) {
            return { message: "AI is thinking...", isWinner: false }
        } else if (gameState.isPlayerTurn) {
            return { message: "Your turn - choose left or right", isWinner: false }
        }
        return { message: "", isWinner: false }
    }

    const status = getGameStatus()

    return (
        <Card className="w-full max-w-3xl bg-primary/10 backdrop-blur-lg border-white/20 text-white shadow-xl m-auto my-[10%]">
            <CardHeader className="text-center border-b border-white/10 bg-white/5">
                <CardTitle className="text-3xl text-primary font-bold flex items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                    Minimax Number Game
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {!gameState.gameStarted ? (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="numbersInput" className="text-primary">
                                Enter numbers (comma-separated):
                            </Label>
                            <Input
                                id="numbersInput"
                                value={numbersInput}
                                onChange={(e) => setNumbersInput(e.target.value)}
                                placeholder="e.g., 1,3,7,9,2,4"
                                className="bg-white/20 border-white/30 text-primary placeholder:text-grey/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="randomCount" className="text-primary">
                                Or generate random numbers:
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    id="randomCount"
                                    type="number"
                                    value={randomCount}
                                    onChange={(e) => setRandomCount(Number.parseInt(e.target.value) || 6)}
                                    min={2}
                                    max={20}
                                    className="bg-white/20 border-white/30 text-primary"
                                />
                                <Button
                                    onClick={generateRandom}
                                    variant="outline"
                                    className="border-white/30 hover:bg-white/20 text-primary"
                                >
                                    <Dices className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </div>
                        </div>

                        <Button
                            onClick={startGame}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-primary border-0"
                        >
                            Start Game
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div
                            className={cn(
                                "py-3 px-4 rounded-lg text-center font-medium text-lg transition-all text-primary",
                                status.isWinner
                                    ? "bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse text-primary"
                                    : thinking
                                        ? "bg-amber-500/20 text-amber-300"
                                        : "bg-white/10",
                            )}
                        >
                            {status.message}
                        </div>

                        <div className="flex justify-center flex-wrap gap-3 py-4">
                            {gameState.numbers.map((num, index) => (
                                <div
                                    key={`${index}-${num}`}
                                    className={cn(
                                        "h-16 w-16 flex items-center justify-center rounded-lg font-bold text-2xl text-primary",
                                        index === 0 ? "border-l-4 border-l-pink-500 text-primary" : "",
                                        index === gameState.numbers.length - 1 ? "border-r-4 border-r-pink-500 text-priamry" : "text-primary",
                                        "bg-white/20 shadow-lg text-primary",
                                    )}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>

                        {!gameState.gameOver && gameState.isPlayerTurn && (
                            <div className="flex justify-center gap-4">
                                <Button
                                    onClick={() => makeMove("left")}
                                    disabled={thinking || gameState.gameOver}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-primary border-0"
                                >
                                    <ArrowLeftCircle className="mr-2 h-5 w-5" />
                                    Take Left
                                </Button>
                                <Button
                                    onClick={() => makeMove("right")}
                                    disabled={thinking || gameState.gameOver}
                                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-primary border-0"
                                >
                                    Take Right
                                    <ArrowRightCircle className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <Card
                                className={cn(
                                    "bg-white/10 border-white/20",
                                    gameState.isPlayerTurn && !gameState.gameOver ? "ring-2 ring-white/30" : "",
                                )}
                            >
                                <CardHeader className="py-3">
                                    <CardTitle className="text-center text-lg font-medium">You</CardTitle>
                                </CardHeader>
                                <CardContent className="py-2">
                                    <div className="text-4xl font-bold text-center">{gameState.playerScore}</div>
                                </CardContent>
                            </Card>

                            <Card
                                className={cn(
                                    "bg-white/10 border-white/20",
                                    !gameState.isPlayerTurn && !gameState.gameOver ? "ring-2 ring-white/30" : "",
                                )}
                            >
                                <CardHeader className="py-3">
                                    <CardTitle className="text-center text-lg font-medium flex items-center justify-center">
                                        <Brain className="mr-2 h-4 w-4" /> AI
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="py-2">
                                    <div className="text-4xl font-bold text-center">{gameState.aiScore}</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex justify-center mt-6">
                            <Button onClick={resetGame} variant="outline" className="border-white/30 hover:bg-white/20 text-primary">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                New Game
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
