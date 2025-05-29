import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { GroupTimetable, Course } from "@/types/timetable"
import { timeSlots, days } from "@/utils/timeSlots"

interface TimetableGridProps {
    groupId: string
    timetable: GroupTimetable
}

export function TimetableGrid({ groupId, timetable }: TimetableGridProps) {
    // Create a grid structure for easier rendering
    const createGrid = () => {
        const grid: { [key: string]: (Course & { course_name: string })[] } = {}

        // Initialize empty grid
        days.forEach((day) => {
            timeSlots.forEach((slot) => {
                grid[`${day.day}-${slot.slot}`] = []
            })
        })

        // Fill grid with courses (can handle multiple courses in same slot)
        Object.entries(timetable).forEach(([courseName, courses]) => {
            courses.forEach((course) => {
                const key = `${course.day}-${course.slot}`
                if (!grid[key]) {
                    grid[key] = []
                }
                grid[key].push({
                    ...course,
                    course_name: courseName,
                })
            })
        })

        return grid
    }

    const grid = createGrid()

    // Helper function to determine course type and color
    const getCourseInfo = (courseType: string) => {
        const isLab = courseType.toLowerCase().includes("lab") || courseType.toLowerCase().includes("tp")
        const isLecture = courseType.toLowerCase().includes("lecture") || courseType.toLowerCase().includes("cours")

        if (isLab) {
            return {
                type: "Lab",
                variant: "destructive" as const,
                bgColor: "bg-red-50 border-red-200",
            }
        } else if (isLecture) {
            return {
                type: "Lecture",
                variant: "secondary" as const,
                bgColor: "bg-blue-50 border-blue-200",
            }
        } else {
            return {
                type: "Course",
                variant: "outline" as const,
                bgColor: "bg-gray-50 border-gray-200",
            }
        }
    }

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
                                {days.map((day) => (
                                    <th key={day.day} className="border border-gray-300 p-2 bg-gray-50 min-w-[200px]">
                                        {day.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timeSlots.map((slot) => (
                                <tr key={slot.slot}>
                                    <td className="border border-gray-300 p-2 bg-gray-50 font-medium text-sm">{slot.time}</td>
                                    {days.map((day) => {
                                        const courses = grid[`${day.day}-${slot.slot}`]
                                        return (
                                            <td key={`${day.day}-${slot.slot}`} className="border border-gray-300 p-2 min-h-[80px] align-top">
                                                {courses && courses.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {courses.map((course, index) => {
                                                            const courseInfo = getCourseInfo(course.course_type)
                                                            return (
                                                                <div key={index} className={`p-2 rounded-md border ${courseInfo.bgColor}`}>
                                                                    <div className="space-y-1">
                                                                        <div className="font-semibold text-sm leading-tight text-gray-800">
                                                                            {course.course_name}
                                                                        </div>
                                                                        <div className="flex flex-wrap gap-1">
                                                                            <Badge variant={courseInfo.variant} className="text-xs">
                                                                                {courseInfo.type}
                                                                            </Badge>
                                                                            <Badge variant="outline" className="text-xs">
                                                                                Teacher {course.teacher_id}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-400 text-center py-4">-</div>
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
