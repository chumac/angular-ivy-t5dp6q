export interface ILearningLibrary {
    id: number;
}

export interface ILearningEnroll {
    course_id: number;
    start_date: string
}

export interface ILearningApply {
    event_id: number;
    schedule_id: number
}

export interface IUpdateMyEvent {
    event_title: string
}