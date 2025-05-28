export interface TreeNode {
    id: string
    value?: number
    alpha: number
    beta: number
    children?: TreeNode[]
    isMaximizing: boolean
    isPruned: boolean
    isVisited: boolean
    isCurrentNode: boolean
    level: number
}

export interface AlgorithmStep {
    nodeId: string
    action: "visit" | "update_alpha" | "update_beta" | "prune" | "backtrack"
    alpha: number
    beta: number
    value?: number
    description: string
}
