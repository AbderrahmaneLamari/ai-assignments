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

    // Reset game
    const resetGame = () => {
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

    // Check for win
    const checkWin = (board: Board, player: Player): boolean => {
        // Check horizontal
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (
                    board[row][col] === player &&
                    board[row][col + 1] === player &&
                    board[row][col + 2] === player &&
                    board[row][col + 3] === player
                ) {
                    return true
                }
            }
        }

        // Check vertical
        for (let row = 0; row <= ROWS - 4; row++) {
            for (let col = 0; col < COLS; col++) {
                if (
                    board[row][col] === player &&
                    board[row + 1][col] === player &&
                    board[row + 2][col] === player &&
                    board[row + 3][col] === player
                ) {
                    return true
                }
            }
        }

        // Check diagonal (down-right)
        for (let row = 0; row <= ROWS - 4; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (
                    board[row][col] === player &&
                    board[row + 1][col + 1] === player &&
                    board[row + 2][col + 2] === player &&
                    board[row + 3][col + 3] === player
                ) {
                    return true
                }
            }
        }

        // Check diagonal (up-right)
        for (let row = 3; row < ROWS; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (
                    board[row][col] === player &&
                    board[row - 1][col + 1] === player &&
                    board[row - 2][col + 2] === player &&
                    board[row - 3][col + 3] === player
                ) {
                    return true
                }
            }
        }

        return false
    }

    // Check if board is full (draw)
    const isBoardFull = (board: Board): boolean => {
        return board[0].every((cell) => cell !== 0)
    }

    // Handle user move
    const handleUserMove = async (col: number) => {
        if (gameStatus !== "playing" || isLoading || isColumnFull(col)) return

        // Find the next available row in the selected column
        const row = findAvailableRow(col)
        if (row === -1) return // Column is full

        // Update board with user's move
        const newBoard = board.map((r) => [...r])
        newBoard[row][col] = 1 // User is player 1
        setBoard(newBoard)
        setLastMove({ row, col })

        // Check if user won
        if (checkWin(newBoard, 1)) {
            setGameStatus("userWon")
            toast.success("You won!")
            return
        }

        // Check for draw
        if (isBoardFull(newBoard)) {
            setGameStatus("draw")
            toast.info("It's a draw!")
            return
        }

        // Make bot move
        setIsLoading(true)
        setGameStatus("waiting")

        try {
            // Send the current board state and get bot's move
            const response = await fetch("/api/connect4/move", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ board: newBoard }),
            })

            if (!response.ok) {
                throw new Error("Failed to get bot move")
            }

            const data = await response.json()
            const botCol = data.column

            // Apply bot's move
            const botRow = findAvailableRow(botCol)
            if (botRow !== -1) {
                const finalBoard = newBoard.map((r) => [...r])
                finalBoard[botRow][botCol] = 2 // Bot is player 2
                setBoard(finalBoard)
                setLastMove({ row: botRow, col: botCol })

                // Check if bot won
                if (checkWin(finalBoard, 2)) {
                    setGameStatus("botWon")
                    toast.info("The AI won!")
                    return
                }

                // Check for draw after bot's move
                if (isBoardFull(finalBoard)) {
                    setGameStatus("draw")
                    toast.info("It's a draw!")
                    return
                }
            }

            setGameStatus("playing")
        } catch (error) {
            console.error("Error getting bot move:", error)
            toast.error("Failed to get AI move. Please try again.")
            // Revert to previous state if there's an error
            setBoard(newBoard)
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
                    {board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`
                  w-full aspect-square rounded-full 
                  ${getCellColor(cell)} 
                  ${isLastMove(rowIndex, colIndex) ? "ring-2 ring-offset-1 ring-white" : ""}
                  transition-all duration-300
                `}
                            />
                        )),
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
