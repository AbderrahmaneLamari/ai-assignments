export interface Course {
    course_type: string
    day: number
    slot: number
    teacher_id: number
}

export interface GroupTimetable {
    [courseName: string]: Course[]
}

export interface TimetableData {
    [groupId: string]: GroupTimetable
}
