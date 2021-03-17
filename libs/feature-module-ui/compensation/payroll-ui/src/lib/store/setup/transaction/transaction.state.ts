import { ISelectOption } from "@nutela/models/core-data";
import { IPayrollProfile } from "@nutela/models/compensation/payment";
import { IExclusionTransaction } from "libs/models/compensation/payroll/src/lib/interfaces/exclusion-transaction.interface";
import { IExclusionActiveEmployee, IExclusionReason, IExclusionType } from "@nutela/models/compensation/payroll";
import { IConfigureTransaction } from "libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface";
import { IConfigureTransactionCreate } from "libs/models/compensation/payroll/src/lib/interfaces/configure-transaction-create.interface";
import { IExclusionItemType } from "libs/models/compensation/payroll/src/lib/interfaces/exclusion-item-type.interface";



export interface ITransactionState {
  exlusionTransactions: IExclusionTransaction[];
  // payrollProfiles: IPayrollProfile[];
  exlusionScope: IExclusionType[];
  exlusionActiveEmployee: IExclusionActiveEmployee[];
  exlusionReason: IExclusionReason[];
  configureTransaction: IConfigureTransaction[];
  configureTransactionCreate: IConfigureTransactionCreate[];
  exlusionType: IExclusionType[];
  exlusionItemType: IExclusionItemType[];
  getconfigureTransactionEdit: IConfigureTransaction;

  showEditor: boolean;
  showCloseEditor: boolean;
  showConfigure: boolean;
  showConfigureCreate: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  getExclusionData : IExclusionTransaction;
  canRun: any;
  payrollGroupSelectOption: ISelectOption[];
  employeeSelectOption: ISelectOption[];
  paygroupSelectOption: ISelectOption[];
  gradeSelectOption: ISelectOption[];
  showRecoverEditor: any;
  possibleReturns: any;
}

export const initialTransactionState: ITransactionState = {
  exlusionTransactions: [],
  exlusionScope: [],
  exlusionActiveEmployee: [],
  exlusionReason: [],
  configureTransaction: [],
  configureTransactionCreate: [],
  exlusionType: [],
  exlusionItemType: [],
  getconfigureTransactionEdit: null,
  getExclusionData : null,
  // payrollProfiles: [],
  showEditor: false,
  showCloseEditor: false,
  showConfigure: false,
  showConfigureCreate: false,
  showRecoverEditor: false,
  isProcessing: false,
  isLoading: false,
  canRun: null,
  payrollGroupSelectOption: null,
  employeeSelectOption: null,
  paygroupSelectOption: null,
  gradeSelectOption: null,
  possibleReturns: null,
}

