
export interface IPolicyAgreementState {
  show: boolean;
  agreementTemplate: string;
  employeeConsent: boolean;
}

export const initialPolicyAgreementState: IPolicyAgreementState = {
  show: false,
  agreementTemplate: null,
  employeeConsent: false
}
