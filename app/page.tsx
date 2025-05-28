import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-100">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Assignments</h1>
      <div className="width-full max-w-2xl space-y-4 flex flex-col items-center">


        <Link href="/connect4" className="text-blue-500 hover:text-blue-700 font-semibold">
          Go to Connect 4 Game
        </Link>

        <Link href="/csp" className="text-blue-500 hover:text-blue-700 font-semibold">
          Go to CSP Tables
        </Link>
        <Link href="/minimax" className="text-blue-500 hover:text-blue-700 font-semibold">
          Go to Minimax Algorithm
        </Link>
      </div>

    </main>
  );
}
