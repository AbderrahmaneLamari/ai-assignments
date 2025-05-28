import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { GroupTimetable, Course } from '@/types/timetable'
import { timeSlots, days} from '@/utils/timeSlots'

interface TimetableGridProps {
    groupId: string
    timetable: GroupTimetable
}

export function TimetableGrid({ groupId, timetable }: TimetableGridProps) {
    // Create a grid structure for easier rendering
    const createGrid = () => {
        const grid: { [key: string]: Course | null } = {}

        // Initialize empty grid
        days.forEach(day => {
            timeSlots.forEach(slot => {
                grid[`${day.day}-${slot.slot}`] = null
            })
        })

        // Fill grid with courses
        Object.entries(timetable).forEach(([courseName, courses]) => {
            courses.forEach(course => {
                grid[`${course.day}-${course.slot}`] = {
                    ...course,
                    course_name: courseName
                } as Course & { course_name: string }
            })
        })

        return grid
    }

    const grid = createGrid()

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-center">Group {groupId} Timetable</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2 bg-gray-50 min-w-[100px]">Time</th>
                                {days.map(day => (
                                    <th key={day.day} className="border border-gray-300 p-2 bg-gray-50 min-w-[150px]">
                                        {day.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timeSlots.map(slot => (
                                <tr key={slot.slot}>
                                    <td className="border border-gray-300 p-2 bg-gray-50 font-medium text-sm">
                                        {slot.time}
                                    </td>
                                    {days.map(day => {
                                        const course = grid[`${day.day}-${slot.slot}`] as (Course & { course_name: string }) | null
                                        return (
                                            <td key={`${day.day}-${slot.slot}`} className="border border-gray-300 p-2 h-20">
                                                {course ? (
                                                    <div className="space-y-1">
                                                        <div className="font-semibold text-sm text-blue-800 leading-tight">
                                                            {(course).course_name}
                                                        </div>
                                                        <Badge variant="secondary" className="text-xs">
                                                            Teacher {course.teacher_id}
                                                        </Badge>
                                                        <div className="text-xs text-gray-600">
                                                            {course.course_type.includes('lecture') ? 'Lecture' : 'Lab'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-400 text-center">-</div>
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
