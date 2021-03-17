export interface IReliefsList{
      payroll_profile_id: number,
      code: string,
      description: string,
      current_period: Date,
      is_runnable: string,
      run_cycle: number,
      cut_off_day: number,
      payment_runday: number,
      use_multi_currency: string,
      tax_option: number,
      tax_rule: number,
      has_last_run: string
    }
    