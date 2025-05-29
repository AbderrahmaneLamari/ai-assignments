"use client"

import Timetable from "@/components/timetable"
import { sampleTimetableData } from "@/data/sampleData"

export default function TimetablePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto">
                <div className="pt-8 pb-4">
                    <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">CSP Timetable System</h1>
                    <p className="text-gray-600 text-center text-lg mb-6">Computer Science Program - Academic Schedule</p>

                    <div className="timetable-legend">
                        <div className="legend-item">
                            <div className="legend-color legend-lecture"></div>
                            <span>Lecture</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color legend-td"></div>
                            <span>Tutorial (TD)</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color legend-tp"></div>
                            <span>Lab (TP)</span>
                        </div>
                    </div>
                </div>

                <Timetable data={sampleTimetableData} />
            </div>
        </div>
    )
}
