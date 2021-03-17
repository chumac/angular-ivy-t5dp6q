
import { IPolicyAgreementState, initialPolicyAgreementState } from "./policy-agreement.state";
import { PolicyAgreementActions, PolicyAgreementActionTypes } from "./policy-agreement.actions";

export function policyAgreementReducer(state: IPolicyAgreementState = initialPolicyAgreementState, action: PolicyAgreementActions) {
  switch(action.type) {
    case PolicyAgreementActionTypes.SHOW:
      return { ...state, show: true };
    case PolicyAgreementActionTypes.HIDE:
      return { ...state, show: false };
    case PolicyAgreementActionTypes.LOAD_AGREEMENT_TEMPLATE_SUCCESS:
      return { ...state, agreementTemplate: action.payload };
    case PolicyAgreementActionTypes.EMPLOYEE_CONSENT_SUCCESS:
      return { ...state, employeeConsent: action.payload };
    default:
      return state;
  }
}
