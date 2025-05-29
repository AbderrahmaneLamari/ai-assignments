"use client"

import type React from "react"
import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Square, Copy, Download } from "lucide-react"

interface CursorPosition {
    line: number
    column: number
}

export default function CodeEditor() {
    const [code, setCode] = useState("")
    const [language, setLanguage] = useState("python")
    const [output, setOutput] = useState("")
    const [isExecuting, setIsExecuting] = useState(false)
    const [executionTime, setExecutionTime] = useState<number | null>(null)
    const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ line: 1, column: 1 })
    const [activeLine, setActiveLine] = useState(1)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [scrollTop, setScrollTop] = useState(0)
    const lineNumbersRef = useRef<HTMLDivElement>(null)

    const lines = code.split("\n")
    const lineCount = lines.length

    useEffect(() => {
        // Fetch initial code template from API
        const fetchInitialCode = async () => {
            try {
                const response = await fetch("/api/initial-code")
                if (!response.ok) throw new Error("Failed to fetch initial code")
                const data = await response.json()
                setCode(data.content)
            } catch (error) {
                console.error("Error fetching initial code:", error)
            }
        }

        fetchInitialCode()
    }, [language])
    
    const executeCode = async () => {
        setIsExecuting(true)
        setOutput("")
        setExecutionTime(null)

        try {
            const response = await fetch("/api/logic/execute-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code, language }),
            })

            const result = await response.json()

            if (result.success) {
                setOutput(result.result)
                // setExecutionTime(result.executionTime)
            } else {
                setOutput(result.result || result.error)
            }
        } catch (error) {
            setOutput(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`)
        } finally {
            setIsExecuting(false)
        }
    }

    const stopExecution = () => {
        setIsExecuting(false)
        setOutput("Execution stopped by user")
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output)
    }

    const downloadOutput = () => {
        const blob = new Blob([output], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "output.txt"
        a.click()
        URL.revokeObjectURL(url)
    }

    const getLanguageTemplate = (lang: string) => {
        const templates = {
            python: 'print("Hello, World!")',
            javascript: 'console.log("Hello, World!");',
            java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
            cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
            c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
        }
        return templates[lang as keyof typeof templates] || 'print("Hello, World!")'
    }

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage)
        setCode(getLanguageTemplate(newLanguage))
        setOutput("")
        setExecutionTime(null)
        setCursorPosition({ line: 1, column: 1 })
        setActiveLine(1)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget
        const { selectionStart, selectionEnd } = textarea

        // Handle Tab key for indentation
        if (e.key === "Tab") {
            e.preventDefault()
            const beforeCursor = code.substring(0, selectionStart)
            const afterCursor = code.substring(selectionEnd)

            if (e.shiftKey) {
                // Shift+Tab: Remove indentation
                const lines = beforeCursor.split("\n")
                const currentLine = lines[lines.length - 1]
                if (currentLine.startsWith("    ")) {
                    lines[lines.length - 1] = currentLine.substring(4)
                    const newCode = lines.join("\n") + afterCursor
                    setCode(newCode)
                    setTimeout(() => {
                        textarea.selectionStart = textarea.selectionEnd = selectionStart - 4
                    }, 0)
                } else if (currentLine.startsWith("\t")) {
                    lines[lines.length - 1] = currentLine.substring(1)
                    const newCode = lines.join("\n") + afterCursor
                    setCode(newCode)
                    setTimeout(() => {
                        textarea.selectionStart = textarea.selectionEnd = selectionStart - 1
                    }, 0)
                }
            } else {
                // Tab: Add indentation
                const newCode = beforeCursor + "    " + afterCursor
                setCode(newCode)
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = selectionStart + 4
                }, 0)
            }
            return
        }

        // Handle Ctrl+C and Ctrl+V
        if (e.ctrlKey || e.metaKey) {
            if (e.key === "c") {
                // Copy selected text or current line
                if (selectionStart === selectionEnd) {
                    const lineStart = code.lastIndexOf("\n", selectionStart - 1) + 1
                    const lineEnd = code.indexOf("\n", selectionStart)
                    const currentLineText = code.substring(lineStart, lineEnd === -1 ? code.length : lineEnd)
                    navigator.clipboard.writeText(currentLineText)
                    e.preventDefault()
                }
                // Let default copy behavior handle selected text
                return
            }

            if (e.key === "v") {
                // Let default paste behavior handle this
                return
            }

            if (e.key === "a") {
                // Select all
                return
            }
        }

        // Handle Enter key for auto-indentation
        if (e.key === "Enter") {
            const beforeCursor = code.substring(0, selectionStart)
            const currentLineStart = beforeCursor.lastIndexOf("\n") + 1
            const currentLine = beforeCursor.substring(currentLineStart)
            const indentMatch = currentLine.match(/^(\s*)/)
            const currentIndent = indentMatch ? indentMatch[1] : ""

            // Add extra indentation for lines ending with :, {, etc.
            const extraIndent = /[:{]\s*$/.test(currentLine.trim()) ? "    " : ""

            const afterCursor = code.substring(selectionEnd)
            const newCode = beforeCursor + "\n" + currentIndent + extraIndent + afterCursor
            setCode(newCode)

            setTimeout(() => {
                const newPosition = selectionStart + 1 + currentIndent.length + extraIndent.length
                textarea.selectionStart = textarea.selectionEnd = newPosition
            }, 0)

            e.preventDefault()
        }
    }

    const updateCursorPosition = () => {
        if (!textareaRef.current) return

        const textarea = textareaRef.current
        const { selectionStart } = textarea
        const beforeCursor = code.substring(0, selectionStart)
        const lines = beforeCursor.split("\n")
        const line = lines.length
        const column = lines[lines.length - 1].length + 1

        setCursorPosition({ line, column })
        setActiveLine(line)
    }

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        const scrollTop = e.currentTarget.scrollTop
        setScrollTop(scrollTop)
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = scrollTop
        }
    }

    useEffect(() => {
        updateCursorPosition()
    }, [code])

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Code Editor</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                            Line {cursorPosition.line}, Column {cursorPosition.column}
                        </div>
                        <Select value={language} onValueChange={handleLanguageChange}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="cpp">C++</SelectItem>
                                <SelectItem value="c">C</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={isExecuting ? stopExecution : executeCode}
                            disabled={!code.trim()}
                            className={isExecuting ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                        >
                            {isExecuting ? (
                                <>
                                    <Square className="w-4 h-4 mr-2" />
                                    Stop
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Run
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">Code Editor</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 code-editor">
                            <div className="flex h-full relative overflow-hidden">
                                {/* Line Numbers */}
                                <div
                                    ref={lineNumbersRef}
                                    className="line-numbers-container bg-gray-100 border-r border-gray-200 px-3 py-4 text-right text-sm text-gray-500 font-mono select-none min-w-[60px] overflow-hidden"
                                >
                                    <div style={{ paddingTop: 0 }}>
                                        {Array.from({ length: lineCount }, (_, i) => i + 1).map((lineNum) => (
                                            <div
                                                key={lineNum}
                                                className={`leading-6 ${lineNum === activeLine ? "bg-blue-100 text-blue-600 font-semibold" : ""}`}
                                                style={{ height: "24px" }}
                                            >
                                                {lineNum}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Code Editor */}
                                <div className="flex-1 relative">
                                    <textarea
                                        ref={textareaRef}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onSelect={updateCursorPosition}
                                        onClick={updateCursorPosition}
                                        onScroll={handleScroll}
                                        placeholder="Enter your code here..."
                                        className="w-full h-full resize-none border-0 rounded-none font-mono text-sm p-4 leading-6 outline-none bg-white caret-blue-500"
                                        style={{
                                            minHeight: "500px",
                                            lineHeight: "24px",
                                            tabSize: 4,
                                        }}
                                        spellCheck={false}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Output</CardTitle>
                                <div className="flex items-center gap-2">
                                    {executionTime && <span className="text-sm text-gray-500">{executionTime.toFixed(2)}ms</span>}
                                    {output && (
                                        <>
                                            <Button variant="ghost" size="sm" onClick={copyOutput} className="h-8 w-8 p-0">
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={downloadOutput} className="h-8 w-8 p-0">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="h-full bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-auto">
                                {isExecuting ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                                        Executing code...
                                    </div>
                                ) : output ? (
                                    <pre className="whitespace-pre-wrap">{output}</pre>
                                ) : (
                                    <div className="text-gray-500">Output will appear here...</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <style jsx global>{`
        .code-editor textarea {
          caret-color: #3b82f6;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 1s infinite;
        }
        .line-numbers-container::-webkit-scrollbar {
          display: none;
        }
        .line-numbers-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
        </div>
    )
}
