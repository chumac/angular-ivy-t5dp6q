export interface IstaffEmployeePayrollProfile{
      payroll_profile_id: number,
      code: string
      description:string,
      current_period: Date,
      is_runnable: string,
      run_cycle: string,
      cut_off_day: string,
      payment_runday :string,
      use_multi_currency: string,
      tax_option: string,
      tax_rule : string,
      has_last_run : string,
      selected : string
    }
    