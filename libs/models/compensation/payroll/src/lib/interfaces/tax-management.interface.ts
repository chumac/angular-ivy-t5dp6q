
export interface ITaxManagement{
    payroll_profile_id:number;
    code:string;
    description:string;
    current_period:string;
    is_runnable:boolean; 
    run_cycle:number; 
    cut_off_day:number; 
    payment_runday:number; 
    use_multi_currency:boolean;
    tax_option:number;
    tax_rule:number; 
    has_last_run:boolean;
    tax_id: number;
    tax_remainder_values: boolean;
    percentage: number;
  }

//   export interface ITaxManagementProfile {
//       tax_id: number,
//       description: string,
//       tax_remainder_values: boolean,
//       percentage: number,
//       payroll_profile_id: number
//   }
