import { NextResponse } from "next/server";
import { readFile } from "fs/promises";


export async function GET() {
    try {

        const content = await readFile("initial-code.txt", 'utf8');

        return NextResponse.json({ content });
    } catch (error) {
        console.error("Error reading file:", error);

        // More detailed error for debugging
        if (error.code === 'ENOENT') {
            return NextResponse.json({
                error: 'File not found. Make sure initial-code.txt exists in your project root.'
            }, { status: 404 });
        }

        return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
    }
}