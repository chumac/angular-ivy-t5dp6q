export interface IPerformanceHistory {
  employee_id: number;
  perf_plan: string;
  final_score_before_moderation?: number;
  final_score_moderated?: number;
  finalized_score?: number;
}