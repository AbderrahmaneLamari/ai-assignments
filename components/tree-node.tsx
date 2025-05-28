"use client"

import type { TreeNode } from "@/types/tree"

interface TreeNodeProps {
    node: TreeNode
    onNodeClick?: (nodeId: string) => void
}

export function TreeNodeComponent({ node, onNodeClick }: TreeNodeProps) {
    const getNodeColor = () => {
        if (node.isPruned) return "bg-red-100 border-red-300 text-red-700"
        if (node.isCurrentNode) return "bg-blue-100 border-blue-500 text-blue-700"
        if (node.isVisited) return "bg-green-100 border-green-300 text-green-700"
        return "bg-gray-50 border-gray-300 text-gray-700"
    }

    const formatValue = (val: number) => {
        if (val === Number.POSITIVE_INFINITY) return "∞"
        if (val === Number.NEGATIVE_INFINITY) return "-∞"
        return val.toString()
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className={`
          relative p-2 rounded-lg border-2 cursor-pointer transition-all duration-300
          min-w-[60px] text-center ${getNodeColor()}
          ${node.isCurrentNode ? "scale-110 shadow-lg" : ""}
          ${node.isPruned ? "opacity-60" : ""}
          outline outline-2 outline-offset-2 outline-gray-400
        `}
                onClick={() => onNodeClick?.(node.id)}
            >
                <div className="font-bold text-sm">{node.id.toUpperCase()}</div>
                {node.value !== undefined && <div className="text-xs font-semibold">Val: {node.value}</div>}

                {node.value === undefined &&
                    (<>
                        <div className="text-xs mt-1">
                            <div>α: {formatValue(node.alpha)}</div>
                            <div>β: {formatValue(node.beta)}</div>
                        </div>
                        <div
                            className={`text-xs font-bold px-1 py-0.5 rounded mt-1 ${node.isMaximizing ? "bg-blue-200 text-blue-800" : "bg-red-200 text-red-800"}`}
                        >
                            {node.isMaximizing ? "MAX" : "MIN"}
                        </div>
                    </>)
                }

                {node.isPruned && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">PRUNED</div>
                )}
            </div>
        </div>
    )
}
