export interface IEventSchedule {
    id: number,
    event_id: number,
    event_text: string,   
    title: string,
    start_date: string,
    end_date: string,
    hall_id: number,
    hall_text: string,
    is_active: boolean,
  }