export interface IEventParticipants {
  id: number,
  event_id: number,
  event_text: string,
  employee_id: number,
  employee_name: string,
  schedule_id?: string,
  schedule_text: string,
  source: number,
  source_text: string,
  approval_status: number,
  is_recommendation: boolean,
  recommendation_un: string,
  recommendation_source?: number,
  recommendation_source_text: string,
}

export interface IEventParticiantSource {
  id: number,
  description: string
}

export interface IEventParticiantEmployee {
  employee_id: number,
  emp_fullname: string
}

export interface IEventParticiantSchedule {
  id: number,
  title: string
}

export interface IEventParticiantGrade {
  grade_id: number,
  description: string
}

export interface IEventParticiantStructureType {
  analysis_id: number,
  description: string
}

export interface IEventParticiantCriteriaEmployee {
  employee_id: number,
  staff_number : string,
  employee_name: string
}

export interface IEventParticiantCriteriaKey {
  id: number,
  description : string,
  keyword: string
}

export interface IEventParticiantCriteriaKeyItems {
  id: number,
  description : string,
  code: string,
  keyword: string,
  checked: boolean
}