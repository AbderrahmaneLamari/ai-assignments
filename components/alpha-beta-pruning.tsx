"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from "lucide-react"
import type { TreeNode, AlgorithmStep } from "@/types/tree"
import { createSampleTree, generateAlgorithmSteps } from "@/utils/alpha-beta"
import { TreeVisualization } from "@/components/tree-visualization"

export default function AlphaBetaPruning() {
    const [tree, setTree] = useState<TreeNode>(createSampleTree())
    const [steps] = useState<AlgorithmStep[]>(generateAlgorithmSteps())
    const [currentStep, setCurrentStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(1000)

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying && currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep((prev) => prev + 1)
            }, speed)
            return () => clearTimeout(timer)
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false)
        }
    }, [isPlaying, currentStep, steps.length, speed])

    // Update tree based on current step
    useEffect(() => {
        const newTree = createSampleTree()

        // Apply all steps up to current step
        for (let i = 0; i <= currentStep; i++) {
            const step = steps[i]
            updateTreeWithStep(newTree, step, i === currentStep)
        }

        setTree(newTree)
    }, [currentStep, steps])

    const updateTreeWithStep = (tree: TreeNode, step: AlgorithmStep, isCurrent: boolean) => {
        const findAndUpdateNode = (node: TreeNode): boolean => {
            if (node.id === step.nodeId) {
                node.alpha = step.alpha
                node.beta = step.beta
                node.isCurrentNode = isCurrent
                node.isVisited = true

                if (step.action === "prune") {
                    node.isPruned = true
                    // Mark remaining children as pruned
                    if (node.children) {
                        let foundVisited = false
                        node.children.forEach((child) => {
                            if (child.isVisited) foundVisited = true
                            else if (foundVisited) child.isPruned = true
                        })
                    }
                }

                if (step.value !== undefined) {
                    node.value = step.value
                }

                return true
            }

            if (node.children) {
                return node.children.some((child) => findAndUpdateNode(child))
            }

            return false
        }

        findAndUpdateNode(tree)
    }

    const handleReset = () => {
        setCurrentStep(0)
        setIsPlaying(false)
        setTree(createSampleTree())
    }

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const currentStepData = steps[currentStep]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">Alpha-Beta Pruning Algorithm Visualization</CardTitle>
                        <CardDescription className="text-center text-lg">
                            Interactive demonstration of the alpha-beta pruning optimization for minimax algorithm
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Controls */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline" size="sm">
                                    <SkipBack className="w-4 h-4" />
                                </Button>
                                <Button onClick={togglePlay} variant={isPlaying ? "destructive" : "default"} size="sm">
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </Button>
                                <Button onClick={handleNext} disabled={currentStep >= steps.length - 1} variant="outline" size="sm">
                                    <SkipForward className="w-4 h-4" />
                                </Button>
                                <Button onClick={handleReset} variant="outline" size="sm">
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Speed:</label>
                                    <select
                                        value={speed}
                                        onChange={(e) => setSpeed(Number(e.target.value))}
                                        className="px-2 py-1 border rounded text-sm"
                                    >
                                        <option value={2000}>Slow</option>
                                        <option value={1000}>Normal</option>
                                        <option value={500}>Fast</option>
                                    </select>
                                </div>

                                <Badge variant="secondary">
                                    Step {currentStep + 1} of {steps.length}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tree Visualization */}
                <Card>
                    <CardHeader>
                        <CardTitle>Game Tree</CardTitle>
                        <CardDescription>Click on nodes to see their details. Pruned branches are shown in red.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TreeVisualization tree={tree} />
                    </CardContent>
                </Card>

                {/* Current Step Information */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Step</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="font-medium text-blue-900">{currentStepData?.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Node:</span> {currentStepData?.nodeId.toUpperCase()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Action:</span>{" "}
                                        {currentStepData?.action.replace("_", " ").toUpperCase()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Alpha:</span>{" "}
                                        {currentStepData?.alpha === Number.NEGATIVE_INFINITY ? "-∞" : currentStepData?.alpha}
                                    </div>
                                    <div>
                                        <span className="font-medium">Beta:</span>{" "}
                                        {currentStepData?.beta === Number.POSITIVE_INFINITY ? "∞" : currentStepData?.beta}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Algorithm Explanation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <h4 className="font-medium mb-1">Alpha-Beta Pruning Rules:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                        <li>
                                            <strong>Alpha (α):</strong> Best value for MAX player found so far
                                        </li>
                                        <li>
                                            <strong>Beta (β):</strong> Best value for MIN player found so far
                                        </li>
                                        <li>
                                            <strong>Pruning:</strong> If α ≥ β, stop exploring remaining branches
                                        </li>
                                        <li>
                                            <strong>MAX nodes:</strong> Update α = max(α, child_value)
                                        </li>
                                        <li>
                                            <strong>MIN nodes:</strong> Update β = min(β, child_value)
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    <Badge className="bg-green-100 text-green-800">Visited</Badge>
                                    <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                                    <Badge className="bg-red-100 text-red-800">Pruned</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
