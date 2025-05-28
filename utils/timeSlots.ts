export const timeSlots = [
    { slot: 1, time: '08:30 - 10:00' },
    { slot: 2, time: '10:10 - 11:40' },
    { slot: 3, time: '11:45 - 13:15' },
    { slot: 4, time: '13:20 - 14:50' },
    { slot: 5, time: '15:00 - 16:30' }
]

export const days = [
    { day: 1, name: 'Sunday' },
    { day: 2, name: 'Monday' },
    { day: 3, name: 'Tuesday' },
    { day: 4, name: 'Wednesday' },
    { day: 5, name: 'Thuresday' }
]

export function getTimeSlot(slot: number): string {
    const timeSlot = timeSlots.find(ts => ts.slot === slot)
    return timeSlot ? timeSlot.time : 'Unknown'
}

export function getDayName(day: number): string {
    const dayObj = days.find(d => d.day === day)
    return dayObj ? dayObj.name : 'Unknown'
}
