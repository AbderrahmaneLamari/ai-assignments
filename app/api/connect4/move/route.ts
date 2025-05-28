import { type NextRequest, NextResponse } from "next/server"

// Define types
type Cell = 0 | 1 | 2
type Board = Cell[][]

export async function POST(request: NextRequest) {
    try {
        const { board } = await request.json()

        if (!board || !Array.isArray(board)) {
            return NextResponse.json({ error: "Invalid board data" }, { status: 400 })
        }

        // Simple bot logic: find a valid move
        const column = 0; // Replace with your bot's logic to determine the column

        // Return the bot's move
        return NextResponse.json({ column })
    } catch (error) {
        console.error("Error processing move:", error)
        return NextResponse.json({ error: "Failed to process move" }, { status: 500 })
    }
}
