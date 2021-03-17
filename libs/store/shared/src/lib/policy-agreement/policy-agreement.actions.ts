import { Action } from '@ngrx/store';

export enum PolicyAgreementActionTypes {
  SHOW = '[POLICY] Show',
  HIDE = '[POLICY] Hide',
  LOAD_AGREEMENT_TEMPLATE = '[POLICY] Load Agreement Template',
  LOAD_AGREEMENT_TEMPLATE_SUCCESS = '[POLICY] Load Agreement Template Success',

  EMPLOYEE_CONSENT = '[POLICY] Load Employee Consent',
  EMPLOYEE_CONSENT_SUCCESS = '[POLICY] Load Employee Consent Success',
}

export class ShowPolicyAgreement implements Action {
  readonly type = PolicyAgreementActionTypes.SHOW;
}

export class HidePolicyAgreement implements Action {
  readonly type = PolicyAgreementActionTypes.HIDE;
}

export class LoadAgreementTemplate implements Action {
  readonly type = PolicyAgreementActionTypes.LOAD_AGREEMENT_TEMPLATE;

  constructor(public payload: { key: string }) {}
}

export class LoadAgreementTemplateSuccess implements Action {
  readonly type = PolicyAgreementActionTypes.LOAD_AGREEMENT_TEMPLATE_SUCCESS;

  constructor(public payload: string) {}
}

export class LoadEmployeeConsent implements Action {
  readonly type = PolicyAgreementActionTypes.EMPLOYEE_CONSENT;

  constructor(public payload: { isAdmin: boolean, employeeId: number, accessPath: boolean }) { }
}

export class LoadEmployeeConsentSuccess implements Action {
  readonly type = PolicyAgreementActionTypes.EMPLOYEE_CONSENT_SUCCESS;

  constructor(public payload: boolean) { }
}

export type PolicyAgreementActions =
  ShowPolicyAgreement
  | HidePolicyAgreement
  | LoadAgreementTemplate
  | LoadAgreementTemplateSuccess
  | LoadEmployeeConsent
  | LoadEmployeeConsentSuccess;
