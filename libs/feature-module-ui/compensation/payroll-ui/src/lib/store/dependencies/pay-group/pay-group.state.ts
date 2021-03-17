import { IPayGroup } from "@nutela/models/compensation/payroll";
import { IRolesTransform } from "libs/feature-module-ui/platform/provisioning-ui/src/lib/models/interfaces";
import { ISelectOption } from "@nutela/models/core-data";



export interface IPayGroupState {
  data: IPayGroup[];
  filteredData: IPayGroup[];
  awaitingData: IPayGroup[];
  showEditor: boolean;
  showViewer: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  confirmationStatus: any[];
  roles: IRolesTransform[];
  payrollSelectOption: ISelectOption[];
  gradeSelectOption: ISelectOption[];
  currencySelectOption: ISelectOption[];
  hasPaygroupAdminRole: boolean;

}

export const initialPayGroupState: IPayGroupState = {
  data: [],
  filteredData: [],
  awaitingData: [],
  showEditor: false,
  showViewer: false,
  isProcessing: false,
  isLoading: false,
  confirmationStatus: [],
  roles: null,
  payrollSelectOption: null,
  gradeSelectOption: null,
  currencySelectOption: null,
  hasPaygroupAdminRole: true
}

