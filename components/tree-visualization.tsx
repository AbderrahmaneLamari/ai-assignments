import type { TreeNode } from "@/types/tree"
import { TreeNodeComponent } from "./tree-node"

interface TreeVisualizationProps {
    tree: TreeNode
    onNodeClick?: (nodeId: string) => void
}

export function TreeVisualization({ tree, onNodeClick }: TreeVisualizationProps) {
    const renderConnections = (
        node: TreeNode,
        parentX: number,
        parentY: number,
        childIndex: number,
        totalChildren: number,
    ) => {
        if (!node.children) return null

        const levelHeight = 160
        let childSpacing: number
        let startX: number

        if (node.level === 0) {
            // Root level - spread out the main branches
            childSpacing = 300
            startX = parentX - ((totalChildren - 1) * childSpacing) / 2
        } else if (node.level === 1) {
            // Second level - group children under each parent
            childSpacing = 80
            startX = parentX - ((totalChildren - 1) * childSpacing) / 2
        } else {
            childSpacing = 80
            startX = parentX - ((totalChildren - 1) * childSpacing) / 2
        }

        return node.children.map((child, index) => {
            const childX = startX + index * childSpacing
            const childY = parentY + levelHeight

            return (
                <g key={`connection-${child.id}`}>
                    <line
                        x1={parentX}
                        y1={parentY + 50}
                        x2={childX}
                        y2={childY - 50}
                        stroke={child.isPruned ? "#ef4444" : "#6b7280"}
                        strokeWidth={child.isPruned ? 3 : 2}
                        strokeDasharray={child.isPruned ? "5,5" : "none"}
                        className="transition-all duration-300"
                    />
                    {renderConnections(child, childX, childY, index, child.children?.length || 0)}
                </g>
            )
        })
    }

    const renderNodes = (node: TreeNode, x: number, y: number) => {
        const elements = [
            <g key={node.id} transform={`translate(${x - 30}, ${y - 50})`}>
                <foreignObject width="60" height="100">
                    <TreeNodeComponent node={node} onNodeClick={onNodeClick} />
                </foreignObject>
            </g>,
        ]

        if (node.children) {
            const levelHeight = 160
            let childSpacing: number
            let startX: number

            if (node.level === 0) {
                // Root level - spread out the main branches
                childSpacing = 300
                startX = x - ((node.children.length - 1) * childSpacing) / 2
            } else if (node.level === 1) {
                // Second level - group children under each parent
                childSpacing = 80
                startX = x - ((node.children.length - 1) * childSpacing) / 2
            } else {
                childSpacing = 80
                startX = x - ((node.children.length - 1) * childSpacing) / 2
            }

            node.children.forEach((child, index) => {
                const childX = startX + index * childSpacing
                const childY = y + levelHeight
                elements.push(...renderNodes(child, childX, childY))
            })
        }

        return elements
    }

    return (
        <div className="w-full overflow-auto bg-gray-50 rounded-lg border">
            <svg width="1600" height="900" className="min-w-full">
                {/* Render connections first (behind nodes) */}
                {renderConnections(tree, 800, 80, 0, tree.children?.length || 0)}

                {/* Render nodes */}
                {renderNodes(tree, 800, 80)}
            </svg>
        </div>
    )
}
