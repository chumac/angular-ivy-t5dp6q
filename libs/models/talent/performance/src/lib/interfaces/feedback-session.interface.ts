export interface IFeedbackSession{
    id: number;
    code: number;
    description: string;   
    
    MyPridoperty: string;
    Plan_id_description: string;
    plan_code: string;
    period_start: Date;
    period_end: Date;
    status: number;
    status_text: string;

    plan_id: number;
    period_start_date: Date;
    period_end_date: Date;

}