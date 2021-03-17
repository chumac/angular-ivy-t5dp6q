export interface LastRunStatus {
  payrollrun_det_id: number;
  payrollrun_id: number;
  proc_name: string;
  proc_description: string;
  run_rank: number;
  run_status: number;
  run_status_type: string;
  error_msg: string;
  start_time: Date;
  completion_time: Date;
}
