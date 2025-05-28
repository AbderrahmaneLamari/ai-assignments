'use client'

import { useEffect, useState } from 'react'
import { TimetableGrid } from '@/components/timetable-grid'
import type { TimetableData } from '@/types/timetable'
import { Loader2 } from 'lucide-react'

export default function TimetablesPage() {
    const [timetables, setTimetables] = useState<TimetableData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await fetch('/api/timetables', { cache: "force-cache" });
                if (!response.ok) {
                    throw new Error('Failed to fetch timetables')
                }
                const data = await response.json()
                setTimetables(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchTimetables()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading timetables...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    if (!timetables) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-600 mb-2">No Data</h1>
                    <p className="text-gray-600">No timetable data available</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">CSP TimeTable System</h1>
                    <p className="text-gray-600">Academic timetables for all groups</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2">
                    {Object.entries(timetables).map(([groupId, timetable]) => (
                        <TimetableGrid
                            key={groupId}
                            groupId={groupId}
                            timetable={timetable}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
