"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, RotateCcw } from "lucide-react"
import { toast } from "sonner"

// Define types
type Player = 1 | 2 // 1 for user (red), 2 for bot (yellow)
type Cell = Player | 0 // 0 for empty
type Board = Cell[][]
type GameStatus = "playing" | "userWon" | "botWon" | "draw" | "waiting"

const ROWS = 6
const COLS = 7

const Connect4Game = () => {

    // Initialize empty board
    const createEmptyBoard = (): Board =>
        Array(ROWS)
            .fill(0)
            .map(() => Array(COLS).fill(0))
    const [board, setBoard] = useState<Board>(createEmptyBoard())
    const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
    const [isLoading, setIsLoading] = useState(false)
    const [lastMove, setLastMove] = useState<{ row: number; col: number } | null>(null)

    // await fetch("/api/connect4/new_game")
    // Reset game
    const resetGame = async () => {
        await fetch("/api/connect4/new_game", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        setBoard(createEmptyBoard())
        setGameStatus("playing")
        setLastMove(null)
    }

    // Check if a column is full
    const isColumnFull = (col: number): boolean => {
        return board[0][col] !== 0
    }

    // Find the next available row in a column
    const findAvailableRow = (col: number): number => {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][col] === 0) return row
        }
        return -1 // Column is full
    }

    // Check if board is full (draw)
    const isBoardFull = (board: Board): boolean => {
        return board[0].every((cell) => cell !== 0)
    }

    // Handle user move
    const handleUserMove = async (col: number) => {
        if (gameStatus !== "playing" || isLoading || isColumnFull(col)) return

        setIsLoading(true)
        setGameStatus("waiting")

        try {
            const response = await fetch("/api/connect4/player_move", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ column: col }),
            })

            if (!response.ok) {
                const errorMessage = await response.json()

                throw new Error(errorMessage.detail || "Failed to make move");

            }

            const data = await response.json()
            const invertedBoard = [...data.board].reverse();
            // Update board
            setBoard(invertedBoard)

            // Handle results
            if (data.player_wins) {
                setGameStatus("userWon")
                toast.success("You won!")
            } else if (data.ai_wins) {
                setGameStatus("botWon")
                toast.info("AI won!")
            } else if (isBoardFull(invertedBoard)) {
                setGameStatus("draw")
                toast.info("It's a draw!")
            } else {
                setGameStatus("playing")
            }

            // Set last move (AI move if exists, otherwise player move)
            if (data.ai_move !== null) {
                const row = findAvailableRow(data.ai_move)
                setLastMove({ row, col: data.ai_move })
            } else {
                const row = findAvailableRow(col)
                setLastMove({ row, col })
            }
        } catch (error) {
            console.error("Move error:", error)
            toast.error("Something went wrong. Try again.")
            setGameStatus("playing")
        } finally {
            setIsLoading(false)
        }
    }


    // Get cell color based on player
    const getCellColor = (cell: Cell) => {
        if (cell === 0) return "bg-white"
        return cell === 1 ? "bg-red-500" : "bg-yellow-500"
    }

    // Check if cell is the last move
    const isLastMove = (row: number, col: number) => {
        return lastMove?.row === row && lastMove?.col === col
    }

    return (
        <Card className="p-6 shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>You</span>
                </div>
                <Button variant="outline" size="sm" onClick={resetGame} className="flex items-center gap-1">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span>AI</span>
                </div>
            </div>

            <div className="bg-blue-600 p-2 rounded-lg">
                {/* Column buttons */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {Array(COLS)
                        .fill(0)
                        .map((_, col) => (
                            <Button
                                key={`btn-${col}`}
                                variant="ghost"
                                className="h-8 w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-50"
                                disabled={isColumnFull(col) || gameStatus !== "playing" || isLoading}
                                onClick={() => handleUserMove(col)}
                            >
                                ↓
                            </Button>
                        ))}
                </div>

                {/* Game board */}
                <div className="grid grid-cols-7 gap-1">
                    {[...board].map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            const actualRowIndex = ROWS - 1 - rowIndex // Adjust for reversed order
                            return (
                                <div
                                    key={`${actualRowIndex}-${colIndex}`}
                                    className={`
                        w-full aspect-square rounded-full 
                        ${getCellColor(cell)} 
                        ${isLastMove(actualRowIndex, colIndex) ? "ring-2 ring-offset-1 ring-white" : ""}
                        transition-all duration-300
                    `}
                                />
                            )
                        })
                    )}
                </div>
            </div>

            {/* Game status */}
            <div className="mt-4 text-center">
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>AI is thinking...</span>
                    </div>
                ) : (
                    <div>
                        {gameStatus === "playing" && "Your turn! Click a column to drop your piece."}
                        {gameStatus === "userWon" && "You won! Congratulations!"}
                        {gameStatus === "botWon" && "AI won! Better luck next time."}
                        {gameStatus === "draw" && "It's a draw!"}
                    </div>
                )}
            </div>
        </Card>
    )
}

export default Connect4Game
