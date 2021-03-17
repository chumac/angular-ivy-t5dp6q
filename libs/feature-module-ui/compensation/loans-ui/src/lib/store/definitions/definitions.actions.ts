import { Action } from '@ngrx/store';
import { ILoanDefinition, IPayrollProfileInfo } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';

export enum DefinitionsActionTypes {
  SHOW_DEFINITION_EDITOR = '[HR LOAN - LOAN DEFINITIONS] Show Definition Editor',
  HIDE_DEFINITION_EDITOR = '[HR LOAN - LOAN DEFINITIONS] Hide Definition Editor',

  PROCESSING_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Processing Loan Definition',
  NOT_PROCESSING_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Not Processing Loan Definition',

  LOADING_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Loading Loan Definition',
  NOT_LOADING_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Not Loading Loan Definition',

  LOAD_DATA_LOAN_DEFINITIONS = '[HR LOAN - LOAN DEFINITIONS] Load Data Loan Definitions',
  LOAD_DATA_LOAN_DEFINITIONS_SUCCESS = '[HR LOAN - LOAN DEFINITIONS] Load Data Loan Definitions Success',

  LOAD_DATA_PAYROLL_PROFILES_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Load Data Payroll Profiles Loan Definition',
  LOAD_DATA_PAYROLL_PROFILES_LOAN_DEFINITION_SUCCESS = '[HR LOAN - LOAN DEFINITIONS] Load Data Payroll Profiles Loan Definition Success',

  LOAD_DATA_PAYROLL_PROFILES_LIST_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Load Data Payroll Profiles List Loan Definition',
  LOAD_DATA_PAYROLL_PROFILES_LIST_LOAN_DEFINITION_SUCCESS = '[HR LOAN - LOAN DEFINITIONS] Load Data Payroll Profiles List Loan Definition Success',

  LOAD_DATA_DEDUCTION_RULES_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Load Data Deduction Rules Loan Definition',
  LOAD_DATA_DEDUCTION_RULES_LOAN_DEFINITION_SUCCESS = '[HR LOAN - LOAN DEFINITIONS] Load Data Deduction Rules Loan Definition Success',

  LOAD_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Load Data Deduction Allowances Loan Definition',
  LOAD_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION_SUCCESS = '[HR LOAN - LOAN DEFINITIONS] Load Data Deduction Allowances Loan Definition Success',

  LOAD_INT_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Load Interest Data Deduction Allowances Loan Definition',
  LOAD_INT_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION_SUCCESS = '[HR LOAN - LOAN DEFINITIONS] Load Interest Data Deduction Allowances Loan Definition Success',

  LOAD_DATA_AMORTIZATION_RULES_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Load Data Amortization Rules Loan Definition',
  LOAD_DATA_AMORTIZATION_RULES_LOAN_DEFINITION_SUCCESS = '[HR LOAN - LOAN DEFINITIONS] Load Data Amortization Rules Loan Definition Success',

  LOAD_DATA_GROUP_NAMES_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Load Data Group Names Loan Definition',
  LOAD_DATA_GROUP_NAMES_LOAN_DEFINITION_SUCCESS = '[HR LOAN - LOAN DEFINITIONS] Load Data Group Names Loan Definition Success',

  DELETE_DATA_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Delete Data Loan Definition',
  REMOVE_DATA_LOAN_DEFINITION = '[HR LOAN - LOAN DEFINITIONS] Remove Data Loan Definition',

  SAVE = '[HR LOAN - LOAN DEFINITIONS] Save Data Loan Definition',
  SAVE_UPDATE = '[HR LOAN - LOAN DEFINITIONS] Save Update Data Loan Definition'
}

export class ShowEditorDefinition implements Action {
  readonly type = DefinitionsActionTypes.SHOW_DEFINITION_EDITOR;
}

export class HideEditorDefinition implements Action {
  readonly type = DefinitionsActionTypes.HIDE_DEFINITION_EDITOR;
}


export class ProcessingDataDefinitions implements Action {
  readonly type = DefinitionsActionTypes.PROCESSING_DEFINITION;
}

export class NotProcessingDefinitions implements Action {
  readonly type = DefinitionsActionTypes.NOT_PROCESSING_DEFINITION;
}

export class LoadingDataDefinitions implements Action {
  readonly type = DefinitionsActionTypes.LOADING_DEFINITION;
}

export class NotLoadingDefinitions implements Action {
  readonly type = DefinitionsActionTypes.NOT_LOADING_DEFINITION;
}

export class LoadDataDefinitions implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_LOAN_DEFINITIONS;
}

export class LoadDataDefinitionsSuccess implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_LOAN_DEFINITIONS_SUCCESS;

  constructor(public payload: ILoanDefinition[]) {}
}

export class LoadDataPayrollProfilesDefinition implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_PAYROLL_PROFILES_LOAN_DEFINITION;
}

export class LoadDataPayrollProfilesDefinitionSuccess implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_PAYROLL_PROFILES_LOAN_DEFINITION_SUCCESS;

  constructor(public payload: IPayrollProfileInfo[]) {}
}

export class LoadDataPayrollProfileListDefinition implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_PAYROLL_PROFILES_LIST_LOAN_DEFINITION;
}

export class LoadDataPayrollProfileListDefinitionSuccess implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_PAYROLL_PROFILES_LIST_LOAN_DEFINITION_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDataDeductionRulesDefinition implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_DEDUCTION_RULES_LOAN_DEFINITION;
}

export class LoadDataDeductionRulesDefinitionSuccess implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_DEDUCTION_RULES_LOAN_DEFINITION_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDataDeductionAllowancesDefinition implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION;

  constructor(public payload: {payrollProfileId: number}) {}
}

export class LoadDataDeductionAllowancesDefinitionSuccess implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadIntDataDeductionAllowancesDefinition implements Action {
  readonly type = DefinitionsActionTypes.LOAD_INT_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION;

  constructor(public payload: {intPayrollProfileId: number}) {}
}

export class LoadIntDataDeductionAllowancesDefinitionSuccess implements Action {
  readonly type = DefinitionsActionTypes.LOAD_INT_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDataAmortizationRulesDefinition implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_AMORTIZATION_RULES_LOAN_DEFINITION;
}

export class LoadDataAmortizationRulesDefinitionSuccess implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_AMORTIZATION_RULES_LOAN_DEFINITION_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadDataGroupNamesDefinition implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_GROUP_NAMES_LOAN_DEFINITION;
}

export class LoadDataGroupNamesDefinitionSuccess implements Action {
  readonly type = DefinitionsActionTypes.LOAD_DATA_GROUP_NAMES_LOAN_DEFINITION_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class DeleteDataDefinition implements Action {
  readonly type = DefinitionsActionTypes.DELETE_DATA_LOAN_DEFINITION;

  constructor(public payload: {recordId: number}) {}
}

export class SaveDataDefinition implements Action {
  readonly type = DefinitionsActionTypes.SAVE;

  constructor(public payload: {data: ILoanDefinition }) {}
}

export class SaveUpdateDataDefinition implements Action {
  readonly type = DefinitionsActionTypes.SAVE_UPDATE;

  constructor(public payload: {data: ILoanDefinition, recordId: number, editMode: boolean }) {}
}

export type DefinitionsActions =
  | ShowEditorDefinition
  | HideEditorDefinition
  | ProcessingDataDefinitions
  | NotProcessingDefinitions
  | LoadingDataDefinitions
  | NotLoadingDefinitions
  | LoadDataDefinitions
  | LoadDataDefinitionsSuccess
  | LoadDataPayrollProfilesDefinition
  | LoadDataPayrollProfilesDefinitionSuccess
  | LoadDataPayrollProfileListDefinition
  | LoadDataPayrollProfileListDefinitionSuccess
  | LoadDataDeductionRulesDefinition
  | LoadDataDeductionRulesDefinitionSuccess
  | LoadDataDeductionAllowancesDefinition
  | LoadDataDeductionAllowancesDefinitionSuccess
  | LoadIntDataDeductionAllowancesDefinition
  | LoadIntDataDeductionAllowancesDefinitionSuccess
  | LoadDataAmortizationRulesDefinition
  | LoadDataAmortizationRulesDefinitionSuccess
  | LoadDataGroupNamesDefinition
  | LoadDataGroupNamesDefinitionSuccess
  | DeleteDataDefinition
  | SaveDataDefinition
  | SaveUpdateDataDefinition
