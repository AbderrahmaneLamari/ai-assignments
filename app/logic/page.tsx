"use client"

import type React from "react"
import ResolutionProofDiagram from "@/components/Resolution"
import ResolutionDocument from "@/components/ResolutionDocument"




export default function CodeEditor() {

    return (
        <>
            <ResolutionDocument />
            <ResolutionProofDiagram />
        </>
    )
}
