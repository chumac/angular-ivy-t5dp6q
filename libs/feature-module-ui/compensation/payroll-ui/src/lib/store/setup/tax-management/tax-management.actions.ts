import { Action } from '@ngrx/store';
import { ITaxManagement } from '@nutela/models/compensation/payroll';
import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';
import { ITaxFixedDeductionupdate } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction-update.interface';
import { ITaxFixedDeduction } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction.interface';
import { ITaxManagementProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface';
import { ITaxPercentageGrossEditor } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross-editor.interface';
import { ITaxPercentageGross } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross.interface';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';

export enum TaxManagementActionTypes {

  SAVE = '[TAX MANAGEMENT PROCESS] Save',
  SAVE_SUCCESS = '[TAX MANAGEMENT PROCESS] Save Success',

  SHOW_EDITOR = '[TAX MANAGEMENT PROCESS] Show Editor',
  HIDE_EDITOR = '[TAX MANAGEMENT PROCESS] Hide Editor',

  PROCESSING = '[ TAX MANAGEMENT PROCESS ] Processing',
  NOT_PROCESSING = '[ TAX MANAGEMENT PROCESS ] Not Processing',

  LOADING = '[ TAX MANAGEMENT PROCESS ] Loading',
  NOT_LOADING = '[ TAX MANAGEMENT PROCESS ] Not Loading',

  LOAD_TAX_MANAGEMENT_LIST_DATA = '[ TAX MANAGEMENT PROCESS ] Load Tax Management Data',
  LOAD_TAX_MANAGEMENT_LIST_DATA_SUCCESS = '[ TAX MANAGEMENT PROCESS ] Load Tax Management Data Success',

  LOAD_PERCENTAGE_GROSS_LIST_DATA = '[ LOAD TAX PERCENTAGE GROSS PROCESS ] Load Tax Percentage Gross Data',
  LOAD_PERCENTAGE_GROSS_LIST_DATA_SUCCESS = '[ LOAD TAX PERCENTAGE GROSS PROCESS ] Load Tax Percentage Gross Data Success',

  LOAD_TAX_STANDARD_LIST_DATA = '[ LOAD TAX STANDARD PROCESS ] Load Tax Standard Data',
  LOAD_TAX_STANDARD_LIST_DATA_SUCCESS = '[ LOAD TAX STANDARD PROCESS ] Load Tax Standard Data Success',

  LOAD_TAX_MANAGEMENT_PROFILE_LIST_DATA = '[ TAX MANAGEMENT PROCESS ] Load Tax Management Profile Data',
  LOAD_TAX_MANAGEMENT_PROFILE_LIST_DATA_SUCCESS = '[ TAX MANAGEMENT PROCESS ] Load Tax Management Profile Data Success',

  SHOW_PERCENTAGE_GROSS_EDITOR = '[SHOW PERCENTAGE GROSS PROCESS] Show Percent Gross Editor',
  HIDE_PERCENTAGE_GROSS_EDITOR = '[SHOW PERCENTAGE GROSS PROCESS] Hide Percent Gross Editor',

  SAVE_PERCENT_GROSS_DATA = '[ SAVE PERCENT GROSS EXECUTION PROCESS ] Save Percent Gross Data',
  SAVE_PERCENT_GROSS_DATA_SUCCESS = '[ SAVE PERCENT GROSS EXECUTION PROCESS ] Save Percent Gross Data Success',

  SHOW_TAX_STANDARD_EDITOR = '[SHOW TAX STANDARD PROCESS] Show Tax Standard Editor',
  HIDE_TAX_STANDARD_EDITOR = '[SHOW TAX STANDARD PROCESS] Hide Tax Standard Editor',

  SAVE_TAX_STANDARD_DATA = '[ SAVE TAX STANDARD EXECUTION PROCESS ] Save Tax Standard Data',
  SAVE_TAX_STANDARD_DATA_SUCCESS = '[ SAVE TAX STANDARD EXECUTION PROCESS ] Save Tax Standard Data Success',

  UPDATE_TAX_STANDARD_DATA = '[ UPDATE TAX STANDARD EXECUTION PROCESS ] Update Tax Standard Data',
  UPDATE_TAX_STANDARD_DATA_SUCCESS = '[ UPDATE TAX STANDARD EXECUTION PROCESS ] Update Tax Standard Data Success',

  DELETE_TAX_STANDARD = '[DELETE TAX STANDARD PROCESS] Delete Tax Standard',
  DELETE_RANGE_PERCENT = '[DELETE RANGE PERCENT PROCESS] Delete Range Percent',
  DELETE_RANGE_VALUE = '[DELETE RANGE VALUE PROCESS] Delete Range Value',

  LOAD_RANGE_PERCENT_LIST_DATA = '[ LOAD RANGE PERCENT PROCESS ] Load Range Percent Data',
  LOAD_RANGE_PERCENT_LIST_DATA_SUCCESS = '[ LOAD RANGE PERCENT PROCESS ] Load Range Percent Data Success',

  SHOW_RANGE_PERCENT_EDITOR = '[SHOW RANGE PERCENT PROCESS] Show Range Percent Editor',
  HIDE_RANGE_PERCENT_EDITOR = '[SHOW RANGE PERCENT PROCESS] Hide Range Percent Editor',

  SAVE_RANGE_PERCENT_DATA = '[ SAVE TAX RANGE PERCENT PROCESS ] Save Tax Range Perccent Data',
  SAVE_RANGE_PERCENT_DATA_SUCCESS = '[ SAVE TAX STANDARD EXECUTION PROCESS ] Save Tax Range Perccent Data Success',

  UPDATE_TAX_RANGE_PERCENT_DATA = '[ UPDATE TAX RANGE PERCENT EXECUTION PROCESS ] Update Tax Range Perccent Data',
  UPDATE_TAX_RANGE_PERCENT_DATA_SUCCESS = '[ UPDATE TAX RANGE PERCENT EXECUTION PROCESS ] Update Tax Range Perccent Data Success',
  
  LOAD_RANGE_VALUE_LIST_DATA = '[ LOAD RANGE VALUE PROCESS ] Load Range Value Data',
  LOAD_RANGE_VALUE_LIST_DATA_SUCCESS = '[ LOAD RANGE VALUE PROCESS ] Load Range Value Data Success',

  SHOW_RANGE_VALUE_EDITOR = '[SHOW RANGE VALUE PROCESS] Show Range Value Editor',
  HIDE_RANGE_VALUE_EDITOR = '[SHOW RANGE VALUE PROCESS] Hide Range Value Editor',

  SAVE_RANGE_VALUE_DATA = '[ SAVE TAX RANGE VALUE PROCESS ] Save Tax Range Value Data',
  SAVE_RANGE_VALUE_DATA_SUCCESS = '[ SAVE TAX RANGE VALUE EXECUTION PROCESS ] Save Tax Range Value Data Success',

  UPDATE_TAX_RANGE_VALUE_DATA = '[ UPDATE TAX RANGE VALUE EXECUTION PROCESS ] Update Tax Range Value Data',
  UPDATE_TAX_RANGE_VALUE_DATA_SUCCESS = '[ UPDATE TAX RANGE VALUE EXECUTION PROCESS ] Update Tax Range Value Data Success',

  LOAD_TAX_FIXED_DEDUCTION_LIST_DATA = '[ TAX FIXED DEDUCTION LIST PROCESS ] Load Tax Fixed Deduction List Data',
  LOAD_TAX_FIXED_DEDUCTION_LIST_DATA_SUCCESS = '[ TAX FIXED DEDUCTION LIST PROCESS ] Load Tax Fixed Deduction List Data Success',

  SHOW_FIXED_DEDUCTION = '[TAX FIXED DEDUCTION MANAGEMENT PROCESS] Show Fixed Deduction',
  HIDE_FIXED_DEDUCTION = '[TAX FIXED DEDUCTION MANAGEMENT PROCESS] Hide Fixed Deduction',

  UPDATE_TAX_FIXED_DEDUCTION_DATA = '[ UPDATE TAX FIXED DEDUCTION EXECUTION PROCESS ] Update Tax Fixed Deduction Data',
  UPDATE_TAX_FIXED_DEDUCTION_DATA_SUCCESS = '[ UPDATE TAX FIXED DEDUCTION EXECUTION PROCESS ] Update Tax Fixed Deduction Data Success',

  LOAD_TAX_FIXED_DEDUCTION_DATA = '[ TAX FIXED DEDUCTION PROCESS ] Load Tax Fixed Deduction Data',
  LOAD_TAX_FIXED_DEDUCTION_DATA_SUCCESS = '[ TAX FIXED DEDUCTION PROCESS ] Load Tax Fixed Deduction Data Success',

  SHOW_TAX_PROFILE = '[SHOW TAX PROFILE PROCESS] Show Tax Profile',
  HIDE_TAX_PROFILE = '[SHOW TAX PROFILE PROCESS] Hide Tax Profile',

  SHOW_TAX_STANDARD_VIEW = '[SHOW TAX STANDARD VIEW PROCESS] Show Tax Standard View Editor',
  HIDE_TAX_STANDARD_VIEW = '[SHOW TAX STANDARD VIEW PROCESS] Hide Tax Standard View Editor',

  SHOW_TAX_RANGE_PERCENT_VIEW = '[SHOW TAX RANGE PERCENT VIEW PROCESS] Show Tax Range Percent View Editor',
  HIDE_TAX_RANGE_PERCENT_VIEW = '[SHOW TAX RANGE PERCENT VIEW PROCESS] Hide Tax Range Percent View Editor',

  SHOW_TAX_RANGE_VALUE_VIEW = '[SHOW TAX RANGE VALUE VIEW PROCESS] Show Tax Range Value View Editor',
  HIDE_TAX_RANGE_VALUE_VIEW = '[SHOW TAX RANGE VALUE VIEW PROCESS] Hide Tax Range Value View Editor',

  SHOW_TAX_GROSS_PERCENT_VIEW = '[SHOW TAX GROSS PERCENT VIEW PROCESS] Show Tax Gross Percent View Editor',
  HIDE_TAX_GROSS_PERCENT_VIEW = '[SHOW TAX GROSS PERCENT VIEW PROCESS] Hide Tax Gross Percent View Editor',
}

export class SaveTaxManagementProfile implements Action {
  readonly type = TaxManagementActionTypes.SAVE;

  constructor(public payload: {data: ITaxManagementProfile, recordId: number, editMode: boolean}) {}
}

export class ProcessingTaxManagement implements Action {
  readonly type = TaxManagementActionTypes.PROCESSING;
}

export class NotProcessingTaxManagement implements Action {
  readonly type = TaxManagementActionTypes.NOT_PROCESSING;
}

export class LoadingTaxManagement implements Action {
  readonly type = TaxManagementActionTypes.LOADING;
}

export class NotLoadingTaxManagement implements Action {
  readonly type = TaxManagementActionTypes.NOT_LOADING;
}

export class LoadListTaxManagementData implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_MANAGEMENT_LIST_DATA;
}
export class LoadListTaxManagementDataSuccess implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_MANAGEMENT_LIST_DATA_SUCCESS;
  constructor(public payload: ITaxManagement[]) { }
}

export class LoadListTaxManagementProfileData implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_MANAGEMENT_PROFILE_LIST_DATA;

  constructor(public payload: {recordId: number}) {}
}
export class LoadListTaxManagementProfileDataSuccess implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_MANAGEMENT_PROFILE_LIST_DATA_SUCCESS;
  constructor(public payload: ITaxManagementProfile[]) { }
}

export class ShowEditorTaxManagementProfile implements Action {
  readonly type = TaxManagementActionTypes.SHOW_EDITOR;
}

export class HideEditorTaxManagementProfile implements Action {
  readonly type = TaxManagementActionTypes.HIDE_EDITOR;
}

export class LoadPercentageGrossData implements Action {
  readonly type = TaxManagementActionTypes.LOAD_PERCENTAGE_GROSS_LIST_DATA;
  constructor(public payrollProfileID: number) { }
}

export class LoadPercentageGrossDataSuccess implements Action {
  readonly type = TaxManagementActionTypes.LOAD_PERCENTAGE_GROSS_LIST_DATA_SUCCESS;
  constructor(public payload: ITaxPercentageGross[]) { }
}

export class ShowPercentGrossEditor implements Action {
  readonly type = TaxManagementActionTypes.SHOW_PERCENTAGE_GROSS_EDITOR;
}

export class HidePercentGrossEditor implements Action {
  readonly type = TaxManagementActionTypes.HIDE_PERCENTAGE_GROSS_EDITOR;
}

export class SavePecentGrossData implements Action {
  readonly type = TaxManagementActionTypes.SAVE_PERCENT_GROSS_DATA;
  constructor(public payload: { data: ITaxPercentageGrossEditor, paygroup_id: number, payrollProfileID: number}) { }
}

export class LoadTaxStandardData implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_STANDARD_LIST_DATA;
  constructor(public payrollProfileID: any) { }
}

export class LoadTaxStandardDataSuccess implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_STANDARD_LIST_DATA_SUCCESS;
  constructor(public payload: ITaxStandard[]) { }
}

export class ShowTaxStandardEditor implements Action {
  readonly type = TaxManagementActionTypes.SHOW_TAX_STANDARD_EDITOR;
}

export class HideTaxStandardEditor implements Action {
  readonly type = TaxManagementActionTypes.HIDE_TAX_STANDARD_EDITOR;
}

export class SaveTaxStandardData implements Action {
  readonly type = TaxManagementActionTypes.SAVE_TAX_STANDARD_DATA;
  constructor(public payload: { data: ITaxStandard, payrollProfileID: any}) { }
}

export class UpdateTaxStandardData implements Action {
  readonly type = TaxManagementActionTypes.UPDATE_TAX_STANDARD_DATA;
  constructor(public payload: { data: ITaxStandard , payrollProfileID:number, taxdetail_id: number }) { }
}

export class DeleteTaxStandard implements Action {
  readonly type = TaxManagementActionTypes.DELETE_TAX_STANDARD;
  constructor(public payload: {taxdetail_id: number}) {}
}

export class LoadRangePercentData implements Action {
  readonly type = TaxManagementActionTypes.LOAD_RANGE_PERCENT_LIST_DATA;
  constructor(public payrollProfileID: any) { }
}

export class LoadRangePercentDataSuccess implements Action {
  readonly type = TaxManagementActionTypes.LOAD_RANGE_PERCENT_LIST_DATA_SUCCESS;
  constructor(public payload: IRangePercent[]) { }
}

export class ShowRangePercentEditor implements Action {
  readonly type = TaxManagementActionTypes.SHOW_RANGE_PERCENT_EDITOR;
}

export class HideRangePercentEditor implements Action {
  readonly type = TaxManagementActionTypes.HIDE_RANGE_PERCENT_EDITOR;
}

export class DeleteRangePercent implements Action {
  readonly type = TaxManagementActionTypes.DELETE_RANGE_PERCENT;
  constructor(public payload: {taxchart_id: number}) {}
}

export class SaveRangePercentdData implements Action {
  readonly type = TaxManagementActionTypes.SAVE_RANGE_PERCENT_DATA;
  constructor(public payload: { data: IRangePercent}) { }
}

export class UpdateRangePercentData implements Action {
  readonly type = TaxManagementActionTypes.UPDATE_TAX_RANGE_PERCENT_DATA;
  constructor(public payload: { data: IRangePercent }) { }
}

export class LoadRangeValueData implements Action {
  readonly type = TaxManagementActionTypes.LOAD_RANGE_VALUE_LIST_DATA;
  constructor(public payrollProfileID: any) { }
}

export class LoadRangeValueDataSuccess implements Action {
  readonly type = TaxManagementActionTypes.LOAD_RANGE_VALUE_LIST_DATA_SUCCESS;
  constructor(public payload: IRangePercent[]) { }
}

export class ShowRangeValueEditor implements Action {
  readonly type = TaxManagementActionTypes.SHOW_RANGE_VALUE_EDITOR;
}

export class HideRangeValueEditor implements Action {
  readonly type = TaxManagementActionTypes.HIDE_RANGE_VALUE_EDITOR;
}

export class DeleteRangeValue implements Action {
  readonly type = TaxManagementActionTypes.DELETE_RANGE_VALUE;
  constructor(public payload: {taxchart_id: number}) {}
}

export class SaveRangeValueData implements Action {
  readonly type = TaxManagementActionTypes.SAVE_RANGE_VALUE_DATA;
  constructor(public payload: { data: IRangePercent}) { }
}

export class UpdateRangeValueData implements Action {
  readonly type = TaxManagementActionTypes.UPDATE_TAX_RANGE_VALUE_DATA;
  constructor(public payload: { data: IRangePercent }) { }
}

export class LoadTaxFixedDectionListData implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_FIXED_DEDUCTION_LIST_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class LoadTaxFixedDectionListDataSuccess implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_FIXED_DEDUCTION_LIST_DATA_SUCCESS;
  constructor(public payload: ITaxFixedDeduction[]) { }
}

export class ShowFixedDeduction implements Action {
  readonly type = TaxManagementActionTypes.SHOW_FIXED_DEDUCTION;
}

export class HideFixedDeduction implements Action {
  readonly type = TaxManagementActionTypes.HIDE_FIXED_DEDUCTION;
}

export class UpdateTaxFixDeductionData implements Action {
  readonly type = TaxManagementActionTypes.UPDATE_TAX_FIXED_DEDUCTION_DATA;
  constructor(public payload: { data: ITaxFixedDeductionupdate }) { }
}

export class LoadTaxFixedDectionData implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_FIXED_DEDUCTION_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class LoadTaxFixedDectionDataSuccess implements Action {
  readonly type = TaxManagementActionTypes.LOAD_TAX_FIXED_DEDUCTION_DATA_SUCCESS;
  constructor(public payload: ITaxFixedDeductionupdate[]) { }
}

export class ShowTaxProfile implements Action {
  readonly type = TaxManagementActionTypes.SHOW_TAX_PROFILE;
}

export class HideTaxProfile implements Action {
  readonly type = TaxManagementActionTypes.HIDE_TAX_PROFILE;
}

export class ShowTaxStandardView implements Action {
  readonly type = TaxManagementActionTypes.SHOW_TAX_STANDARD_VIEW;
}

export class HideTaxStandardView implements Action {
  readonly type = TaxManagementActionTypes.HIDE_TAX_STANDARD_VIEW;
}

export class ShowTaxRangePercentView implements Action {
  readonly type = TaxManagementActionTypes.SHOW_TAX_RANGE_PERCENT_VIEW;
}

export class HideTaxRangePercentView implements Action {
  readonly type = TaxManagementActionTypes.HIDE_TAX_RANGE_PERCENT_VIEW;
}

export class ShowTaxRangeValueView implements Action {
  readonly type = TaxManagementActionTypes.SHOW_TAX_RANGE_VALUE_VIEW;
}

export class HideTaxRangeValueView implements Action {
  readonly type = TaxManagementActionTypes.HIDE_TAX_RANGE_VALUE_VIEW;
}

export class ShowTaxGrossPercentView implements Action {
  readonly type = TaxManagementActionTypes.SHOW_TAX_GROSS_PERCENT_VIEW;
}

export class HideTaxGrossPercentView implements Action {
  readonly type = TaxManagementActionTypes.HIDE_TAX_GROSS_PERCENT_VIEW;
}

export type TaxManagementActions =
  | ProcessingTaxManagement
  | NotProcessingTaxManagement
  | LoadingTaxManagement
  | NotLoadingTaxManagement
  | LoadListTaxManagementData
  | LoadListTaxManagementDataSuccess
  | LoadListTaxManagementProfileData
  | LoadListTaxManagementProfileDataSuccess
  | HideEditorTaxManagementProfile
  | ShowEditorTaxManagementProfile
  | SaveTaxManagementProfile
  | LoadPercentageGrossData
  | LoadPercentageGrossDataSuccess
  | ShowPercentGrossEditor
  | HidePercentGrossEditor
  | SavePecentGrossData
  | LoadTaxStandardData
  | LoadTaxStandardDataSuccess
  | ShowTaxStandardEditor
  | HideTaxStandardEditor
  | DeleteTaxStandard
  | LoadRangePercentData
  | LoadRangePercentDataSuccess
  | ShowRangePercentEditor
  | HideRangePercentEditor
  | DeleteRangePercent
  | SaveRangePercentdData
  | UpdateRangePercentData
  | LoadRangeValueData
  | LoadRangeValueDataSuccess
  | ShowRangeValueEditor
  | HideRangeValueEditor
  | DeleteRangeValue
  | SaveRangeValueData
  | UpdateRangeValueData
  | LoadTaxFixedDectionListData
  | LoadTaxFixedDectionListDataSuccess
  | ShowFixedDeduction
  | HideFixedDeduction
  | UpdateTaxFixDeductionData
  | LoadTaxFixedDectionData
  | LoadTaxFixedDectionDataSuccess
  | ShowTaxProfile
  | HideTaxProfile
  | ShowTaxStandardView
  | HideTaxStandardView
  | ShowTaxRangePercentView
  | HideTaxRangePercentView
  | ShowTaxRangeValueView
  | HideTaxRangeValueView
  | ShowTaxGrossPercentView
  | HideTaxGrossPercentView