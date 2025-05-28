import Connect4Game from "@/components/connect4-game"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-100">
            <h1 className="text-4xl font-bold mb-8 text-center">Connect 4 vs AI</h1>
            <Connect4Game />
        </main>
    )
}
