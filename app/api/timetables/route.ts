import { NextResponse } from 'next/server'

// Sample timetable data based on your interface
const timetableData = {
    '1': {
        'Sécurité': [{ 'course_type': 'Sécurité_lecture', 'day': 1, 'slot': 1, 'teacher_id': 1 }],
        'Méthodes formelles': [{ 'course_type': 'Méthodes formelles_lecture', 'day': 1, 'slot': 3, 'teacher_id': 2 }],
        'Analyse numérique': [{ 'course_type': 'Analyse numérique_lecture', 'day': 2, 'slot': 1, 'teacher_id': 3 }],
        'Entrepreneuriat': [{ 'course_type': 'Entrepreneuriat_lecture', 'day': 2, 'slot': 3, 'teacher_id': 4 }],
        'Recherche opérationnelle 2': [{ 'course_type': 'Recherche opérationnelle 2_lecture', 'day': 2, 'slot': 5, 'teacher_id': 5 }],
        'Distributed Architecture & Intensive Computing': [{ 'course_type': 'Distributed Architecture & Intensive Computing_lecture', 'day': 3, 'slot': 2, 'teacher_id': 6 }],
        'Réseaux 2': [{ 'course_type': 'Réseaux 2_lecture', 'day': 4, 'slot': 1, 'teacher_id': 7 }],
        'Artificial Intelligence': [{ 'course_type': 'Artificial Intelligence_lecture', 'day': 4, 'slot': 5, 'teacher_id': 11 }]
    },
    '2': {
        'Sécurité': [{ 'course_type': 'Sécurité_lecture', 'day': 1, 'slot': 1, 'teacher_id': 1 }],
        'Méthodes formelles': [{ 'course_type': 'Méthodes formelles_lecture', 'day': 1, 'slot': 3, 'teacher_id': 2 }],
        'Analyse numérique': [{ 'course_type': 'Analyse numérique_lecture', 'day': 2, 'slot': 1, 'teacher_id': 3 }],
        'Entrepreneuriat': [{ 'course_type': 'Entrepreneuriat_lecture', 'day': 2, 'slot': 3, 'teacher_id': 4 }],
        'Recherche opérationnelle 2': [{ 'course_type': 'Recherche opérationnelle 2_lecture', 'day': 2, 'slot': 5, 'teacher_id': 5 }],
        'Distributed Architecture & Intensive Computing': [{ 'course_type': 'Distributed Architecture & Intensive Computing_lecture', 'day': 3, 'slot': 2, 'teacher_id': 6 }],
        'Réseaux 2': [{ 'course_type': 'Réseaux 2_lecture', 'day': 4, 'slot': 1, 'teacher_id': 7 }],
        'Artificial Intelligence': [{ 'course_type': 'Artificial Intelligence_lecture', 'day': 4, 'slot': 5, 'teacher_id': 11 }]
    },
    '3': {
        'Sécurité': [{ 'course_type': 'Sécurité_lecture', 'day': 1, 'slot': 1, 'teacher_id': 1 }],
        'Méthodes formelles': [{ 'course_type': 'Méthodes formelles_lecture', 'day': 1, 'slot': 3, 'teacher_id': 2 }],
        'Analyse numérique': [{ 'course_type': 'Analyse numérique_lecture', 'day': 2, 'slot': 1, 'teacher_id': 3 }],
        'Entrepreneuriat': [{ 'course_type': 'Entrepreneuriat_lecture', 'day': 2, 'slot': 3, 'teacher_id': 4 }],
        'Recherche opérationnelle 2': [{ 'course_type': 'Recherche opérationnelle 2_lecture', 'day': 2, 'slot': 5, 'teacher_id': 5 }],
        'Distributed Architecture & Intensive Computing': [{ 'course_type': 'Distributed Architecture & Intensive Computing_lecture', 'day': 3, 'slot': 2, 'teacher_id': 6 }],
        'Réseaux 2': [{ 'course_type': 'Réseaux 2_lecture', 'day': 4, 'slot': 1, 'teacher_id': 7 }],
        'Artificial Intelligence': [{ 'course_type': 'Artificial Intelligence_lecture', 'day': 4, 'slot': 5, 'teacher_id': 11 }]
    },
    '4': {
        'Sécurité': [{ 'course_type': 'Sécurité_lecture', 'day': 1, 'slot': 1, 'teacher_id': 1 }],
        'Méthodes formelles': [{ 'course_type': 'Méthodes formelles_lecture', 'day': 1, 'slot': 3, 'teacher_id': 2 }],
        'Analyse numérique': [{ 'course_type': 'Analyse numérique_lecture', 'day': 2, 'slot': 1, 'teacher_id': 3 }],
        'Entrepreneuriat': [{ 'course_type': 'Entrepreneuriat_lecture', 'day': 2, 'slot': 3, 'teacher_id': 4 }],
        'Recherche opérationnelle 2': [{ 'course_type': 'Recherche opérationnelle 2_lecture', 'day': 2, 'slot': 5, 'teacher_id': 5 }],
        'Distributed Architecture & Intensive Computing': [{ 'course_type': 'Distributed Architecture & Intensive Computing_lecture', 'day': 3, 'slot': 2, 'teacher_id': 6 }],
        'Réseaux 2': [{ 'course_type': 'Réseaux 2_lecture', 'day': 4, 'slot': 1, 'teacher_id': 7 }],
        'Artificial Intelligence': [{ 'course_type': 'Artificial Intelligence_lecture', 'day': 4, 'slot': 5, 'teacher_id': 11 }]
    },
    '5': {
        'Sécurité': [{ 'course_type': 'Sécurité_lecture', 'day': 1, 'slot': 1, 'teacher_id': 1 }],
        'Méthodes formelles': [{ 'course_type': 'Méthodes formelles_lecture', 'day': 1, 'slot': 3, 'teacher_id': 2 }],
        'Analyse numérique': [{ 'course_type': 'Analyse numérique_lecture', 'day': 2, 'slot': 1, 'teacher_id': 3 }],
        'Entrepreneuriat': [{ 'course_type': 'Entrepreneuriat_lecture', 'day': 2, 'slot': 3, 'teacher_id': 4 }],
        'Recherche opérationnelle 2': [{ 'course_type': 'Recherche opérationnelle 2_lecture', 'day': 2, 'slot': 5, 'teacher_id': 5 }],
        'Distributed Architecture & Intensive Computing': [{ 'course_type': 'Distributed Architecture & Intensive Computing_lecture', 'day': 3, 'slot': 2, 'teacher_id': 6 }],
        'Artificial Intelligence': [{ 'course_type': 'Artificial Intelligence_lecture', 'day': 4, 'slot': 5, 'teacher_id': 11 }]
    },
    '6': {
        'Sécurité': [{ 'course_type': 'Sécurité_lecture', 'day': 1, 'slot': 1, 'teacher_id': 1 }],
        'Méthodes formelles': [{ 'course_type': 'Méthodes formelles_lecture', 'day': 1, 'slot': 3, 'teacher_id': 2 }],
        'Analyse numérique': [{ 'course_type': 'Analyse numérique_lecture', 'day': 2, 'slot': 1, 'teacher_id': 3 }],
        'Entrepreneuriat': [{ 'course_type': 'Entrepreneuriat_lecture', 'day': 2, 'slot': 3, 'teacher_id': 4 }],
        'Recherche opérationnelle 2': [{ 'course_type': 'Recherche opérationnelle 2_lecture', 'day': 2, 'slot': 5, 'teacher_id': 5 }],
        'Distributed Architecture & Intensive Computing': [{ 'course_type': 'Distributed Architecture & Intensive Computing_lecture', 'day': 3, 'slot': 2, 'teacher_id': 6 }],
        'Réseaux 2': [{ 'course_type': 'Réseaux 2_lecture', 'day': 4, 'slot': 1, 'teacher_id': 7 }],
        'Artificial Intelligence': [{ 'course_type': 'Artificial Intelligence_lecture', 'day': 4, 'slot': 5, 'teacher_id': 11 }]
    }
}

export async function GET() {
    try {
        return NextResponse.json(timetableData)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch timetables', msg: error }, { status: 500 })
    }
}
