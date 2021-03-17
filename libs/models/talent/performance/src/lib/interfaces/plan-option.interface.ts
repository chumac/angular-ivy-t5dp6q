import { IPlan } from "./plan.interface";

export interface IPlanOption {
    id: number;
    option_key: string;
    plan_id: number;
    option_value: string;
    PlanInfo: IPlan;
}