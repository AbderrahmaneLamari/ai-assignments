import type { TreeNode, AlgorithmStep } from "../types/tree"

export function createSampleTree(): TreeNode {
    return {
        id: "root",
        alpha: Number.NEGATIVE_INFINITY,
        beta: Number.POSITIVE_INFINITY,
        isMaximizing: true,
        isPruned: false,
        isVisited: false,
        isCurrentNode: false,
        level: 0,
        children: [
            {
                id: "M1",
                alpha: Number.NEGATIVE_INFINITY,
                beta: Number.POSITIVE_INFINITY,
                isMaximizing: false,
                isPruned: false,
                isVisited: false,
                isCurrentNode: false,
                level: 1,
                children: [
                    {
                        id: "M11",
                        value: 3,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M12",
                        value: 10,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M13",
                        value: 5,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M14",
                        value: 4,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                ],
            },
            {
                id: "M2",
                alpha: Number.NEGATIVE_INFINITY,
                beta: Number.POSITIVE_INFINITY,
                isMaximizing: false,
                isPruned: false,
                isVisited: false,
                isCurrentNode: false,
                level: 1,
                children: [
                    {
                        id: "M21",
                        value: 15,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M22",
                        value: 6,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M23",
                        value: 2,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M24",
                        value: 1,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                ],
            },
            {
                id: "M3",
                alpha: Number.NEGATIVE_INFINITY,
                beta: Number.POSITIVE_INFINITY,
                isMaximizing: false,
                isPruned: false,
                isVisited: false,
                isCurrentNode: false,
                level: 1,
                children: [
                    {
                        id: "M31",
                        value: 6,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M32",
                        value: 2,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M33",
                        value: 8,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M34",
                        value: 5,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                ],
            },
            {
                id: "M4",
                alpha: Number.NEGATIVE_INFINITY,
                beta: Number.POSITIVE_INFINITY,
                isMaximizing: false,
                isPruned: false,
                isVisited: false,
                isCurrentNode: false,
                level: 1,
                children: [
                    {
                        id: "M41",
                        value: 11,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M42",
                        value: 5,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M43",
                        value: 7,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M44",
                        value: 6,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                ],
            },
        ],
    }
}

export function createSampleTree2(): TreeNode {
    return {
        id: "root",
        alpha: Number.NEGATIVE_INFINITY,
        beta: Number.POSITIVE_INFINITY,
        isMaximizing: true,
        isPruned: false,
        isVisited: false,
        isCurrentNode: false,
        level: 0,
        children: [
            {
                id: "M1",
                alpha: Number.NEGATIVE_INFINITY,
                beta: Number.POSITIVE_INFINITY,
                isMaximizing: false,
                isPruned: false,
                isVisited: false,
                isCurrentNode: false,
                level: 1,
                children: [
                    {
                        id: "M11",
                        value: 3,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M12",
                        value: 10,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M13",
                        value: 5,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M14",
                        value: 4,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                ],
            },
            {
                id: "M2",
                alpha: Number.NEGATIVE_INFINITY,
                beta: Number.POSITIVE_INFINITY,
                isMaximizing: false,
                isPruned: false,
                isVisited: false,
                isCurrentNode: false,
                level: 1,
                children: [
                    {
                        id: "M21",
                        value: 15,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M22",
                        value: 6,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M23",
                        value: 2,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M24",
                        value: 1,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                ],
            },
            {
                id: "M3",
                alpha: Number.NEGATIVE_INFINITY,
                beta: Number.POSITIVE_INFINITY,
                isMaximizing: false,
                isPruned: false,
                isVisited: false,
                isCurrentNode: false,
                level: 1,
                children: [
                    {
                        id: "M31",
                        value: 6,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M32",
                        value: 2,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M33",
                        value: 8,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M34",
                        value: 5,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                ],
            },
            {
                id: "M4",
                alpha: Number.NEGATIVE_INFINITY,
                beta: Number.POSITIVE_INFINITY,
                isMaximizing: false,
                isPruned: false,
                isVisited: false,
                isCurrentNode: false,
                level: 1,
                children: [
                    {
                        id: "M41",
                        value: 11,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M42",
                        value: 5,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M43",
                        value: 7,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                    {
                        id: "M44",
                        value: 6,
                        alpha: Number.NEGATIVE_INFINITY,
                        beta: Number.POSITIVE_INFINITY,
                        isMaximizing: true,
                        isPruned: false,
                        isVisited: false,
                        isCurrentNode: false,
                        level: 2,
                    },
                ],
            },
        ],
    }
}
export function generateAlgorithmSteps(): AlgorithmStep[] {
    const tree = createSampleTree()
    return runAlphaBetaMinimax(tree)
}

export function runAlphaBetaMinimax(
    root: TreeNode
): AlgorithmStep[] {
    const steps: AlgorithmStep[] = []

    function minimax(node: TreeNode, alpha: number, beta: number): number {
        steps.push({
            nodeId: node.id,
            action: "visit",
            alpha,
            beta,
            description: `Visit node ${node.id.toUpperCase()} (${node.isMaximizing ? "MAX" : "MIN"} node)`
        })

        if (!node.children || node.children.length === 0) {
            steps.push({
                nodeId: node.id,
                action: "visit",
                alpha,
                beta,
                value: node.value!,
                description: `Visit leaf ${node.id.toUpperCase()}, value = ${node.value}`
            })
            return node.value!
        }

        let value = node.isMaximizing ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY

        for (const child of node.children) {
            const childValue = minimax(child, alpha, beta)

            if (node.isMaximizing) {
                if (childValue > value) {
                    value = childValue
                    steps.push({
                        nodeId: node.id,
                        action: "update_alpha",
                        alpha: value,
                        beta,
                        description: `${node.id.toUpperCase()}'s alpha = max(${alpha}, ${childValue}) = ${value}`
                    })
                }
                alpha = Math.max(alpha, value)
            } else {
                if (childValue < value) {
                    value = childValue
                    steps.push({
                        nodeId: node.id,
                        action: "update_beta",
                        alpha,
                        beta: value,
                        description: `${node.id.toUpperCase()}'s beta = min(${beta}, ${childValue}) = ${value}`
                    })
                }
                beta = Math.min(beta, value)
            }

            if (beta <= alpha) {
                steps.push({
                    nodeId: node.id,
                    action: "prune",
                    alpha,
                    beta,
                    description: `Prune! α(${alpha}) ≥ β(${beta}), skip remaining children of ${node.id.toUpperCase()}`
                })
                break
            }
        }

        steps.push({
            nodeId: node.id,
            action: "backtrack",
            alpha,
            beta,
            value,
            description: `${node.id.toUpperCase()} returns value ${value}`
        })

        return value
    }

    minimax(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)

    return steps
}