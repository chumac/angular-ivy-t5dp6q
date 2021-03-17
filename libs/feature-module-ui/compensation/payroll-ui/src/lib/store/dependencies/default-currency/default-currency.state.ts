import { IDefaultCurrency } from "@nutela/models/compensation/payroll";




export interface IDefaultCurrencyState {
  data: IDefaultCurrency[];
  showEditor:boolean;
  isProcessing: boolean;
  isLoading:boolean;

}

export const initialDefaultCurrencyState: IDefaultCurrencyState = {
  data: [],
  showEditor: false,
  isProcessing: false,
  isLoading:false,
}

