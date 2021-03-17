export interface IPerfDashboardObjectives {
    source: number;
    objective_id: string;
    perspective: string;
    weight: number;
    target: string;
    achieved: string;
    description: string;
    score_text: string;
    score_val: number;
    direction: boolean;
    perc_complete: number;
}