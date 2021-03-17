import {
  ILGA,
  ICity,
  IState,
  ICountry,
  IReligion,
  ICurrency
} from '@nutela/models/core-data';
import { IBank, IPFA } from '@nutela/models/common';
import { IStaffCategory } from './staff-category.interface';
import { IEmployeeStatus } from './employee-status.interface';
import { IPersonal } from './personal.interface';

export interface IPayment {
  bvn: string,
  employeedetail_id: number,
  employeeInfo: IPersonal,
  staff_category: IStaffCategory,
  savings_bank: IBank,
  savings_bank_branch: string,
  savings_account_no: string,
  current_bank: IBank,
  current_bank_branch: string,
  current_account_no: string,
  compute_pension: boolean,
  pfa: IPFA,
  pension_account: string,
  pension_pin: string,
  compute_nhf: boolean,
  nhf_number: string,
  compute_tax: boolean,
  tax_id_number: string,
  classify_as_disabled: boolean,
  currency: ICurrency,
  status: IEmployeeStatus
}
