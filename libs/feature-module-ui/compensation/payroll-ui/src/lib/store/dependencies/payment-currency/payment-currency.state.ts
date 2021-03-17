import { ICurrency } from "@nutela/models/compensation/payroll";



export interface ICurrencyState {
  data: ICurrency[];
  showEditor:boolean;
  isProcessing: boolean;
  isLoading:boolean;

}

export const initialCurrencyState: ICurrencyState = {
  data: [],
  showEditor: false,
  isProcessing: false,
  isLoading:false,
}

