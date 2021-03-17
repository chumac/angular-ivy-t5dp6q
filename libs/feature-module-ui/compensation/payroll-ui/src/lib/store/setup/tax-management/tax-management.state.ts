import { ITaxManagement } from "@nutela/models/compensation/payroll";
import { IRangePercent } from "libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface";
import { ITaxFixedDeductionupdate } from "libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction-update.interface";
import { ITaxFixedDeduction } from "libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction.interface";
import { ITaxManagementProfile } from "libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface";
import { ITaxPercentageGross } from "libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross.interface";
import { ITaxStandard } from "libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface";

export interface ITaxManagementState {
  taxManagementList: ITaxManagement[];
  taxManagementProfileList: ITaxManagementProfile[];
  isProcessing: boolean;
  isLoading: boolean;
  isProcessingDataGrid: boolean;
  showEditor: boolean;
  percentageGrossList: ITaxPercentageGross[];
  showPercentGrossEditor: boolean;
  taxStandardList: ITaxStandard[];
  showTaxStandardEditor: boolean;
  rangePercentList : IRangePercent[];
  showRangePercentEditor: boolean;
  rangeValueList : IRangePercent[];
  showRangeValueEditor: boolean;
  taxFixedDeduction : ITaxFixedDeduction[];
  showTaxFixedDeduction: boolean;
  taxFixedDeductionValue : ITaxFixedDeductionupdate[];
  showTaxProfile: boolean;
  showTaxStandardView: boolean;
  showTaxRangePercentView: boolean;
  showTaxRangeValueView: boolean;
  showTaxGrossPercentView: boolean;
}

export const initialTaxManagementState: ITaxManagementState = {
  taxManagementList:[],
  taxManagementProfileList: [],
  isProcessing: false,
  isLoading: false,
  isProcessingDataGrid: false,
  showEditor: false,  
  percentageGrossList: [],
  showPercentGrossEditor: false,
  taxStandardList: [],
  showTaxStandardEditor: false,
  rangePercentList : [],
  showRangePercentEditor : false,
  rangeValueList : [],
  showRangeValueEditor : false,
  taxFixedDeduction : [],
  showTaxFixedDeduction : false,
  taxFixedDeductionValue : [],
  showTaxProfile: false,
  showTaxStandardView: false,
  showTaxRangePercentView: false,
  showTaxRangeValueView: false,
  showTaxGrossPercentView: false
}

