
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPolicyAgreementState } from './policy-agreement.state';

export const getPolicyAgreementState = createFeatureSelector<IPolicyAgreementState>('policyAgreement');

export const showPolicyModal = createSelector(getPolicyAgreementState, (state: IPolicyAgreementState) => state.show);

export const getAgreementTemplate = createSelector(getPolicyAgreementState, (state: IPolicyAgreementState) => state.agreementTemplate);

export const getEmployeeConsent = createSelector(getPolicyAgreementState, (state: IPolicyAgreementState) => state.employeeConsent);
