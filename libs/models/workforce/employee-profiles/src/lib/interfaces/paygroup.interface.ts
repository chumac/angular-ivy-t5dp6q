import { IGrade } from "@nutela/models/workforce/personnel";


export interface IPaygroup {
  paygroup_id: number,
  paygroup_code: string,
  description: string,
  shortname: string,
  currencyInfo: any,
  gradeInfo: IGrade,
  rank: number,
  non_conventional: boolean,
  taxpercentongross: number,
  master_rec_id: string,
  unconfirmedPaygroupInfo: any,
  confirmation_status: number,
  annual_gross: string,
  fixed_relief: string,
  fixed_total_taxable: string,
  fixed_total_annual_tax: string
}
