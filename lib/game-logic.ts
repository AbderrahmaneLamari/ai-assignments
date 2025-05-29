export default class GameLogic {
    private numbers: number[] = []
    private memo: Map<string, number> = new Map()

    startGame(numbers: number[]) {
        this.numbers = [...numbers]
        this.memo.clear()
    }

    // Minimax algorithm with memoization
    minimax(arr: number[], isMaximizing: boolean, depth = 0): number {
        const key = `${arr.join(",")}-${isMaximizing}`
        if (this.memo.has(key)) {
            return this.memo.get(key)!
        }

        if (arr.length === 0) {
            return 0
        }

        if (arr.length === 1) {
            const result = isMaximizing ? arr[0] : -arr[0]
            this.memo.set(key, result)
            return result
        }

        const leftChoice = arr[0]
        const rightChoice = arr[arr.length - 1]

        const leftArr = arr.slice(1)
        const rightArr = arr.slice(0, -1)

        let leftScore, rightScore

        if (isMaximizing) {
            leftScore = leftChoice + this.minimax(leftArr, false, depth + 1)
            rightScore = rightChoice + this.minimax(rightArr, false, depth + 1)
            const result = Math.max(leftScore, rightScore)
            this.memo.set(key, result)
            return result
        } else {
            leftScore = -leftChoice + this.minimax(leftArr, true, depth + 1)
            rightScore = -rightChoice + this.minimax(rightArr, true, depth + 1)
            const result = Math.min(leftScore, rightScore)
            this.memo.set(key, result)
            return result
        }
    }

    getBestMove(numbers: number[]): "left" | "right" {
        if (numbers.length === 0) return "left"

        const leftChoice = numbers[0]
        const rightChoice = numbers[numbers.length - 1]

        const leftArr = numbers.slice(1)
        const rightArr = numbers.slice(0, -1)

        const leftScore = leftChoice + this.minimax(leftArr, false)
        const rightScore = rightChoice + this.minimax(rightArr, false)

        return leftScore >= rightScore ? "left" : "right"
    }
}
