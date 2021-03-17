import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBusinessOptionDataState } from './business-option-data.state';
import { BUSINESS_OPTION } from '@nutela/shared/app-global';


const getState = createFeatureSelector<IBusinessOptionDataState>('businessOption');

export const businessOptions = createSelector(getState, (state: IBusinessOptionDataState) => state.options);

export const permOption01 = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.permOpt01);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const allowBackupOfficerSelectionForLeaveApply = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.allowBackupOfficerSelectionForLeaveApply);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const allowSupervisorSelectionForLeaveApply = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.allowSupervisorSelectionForLeaveApply);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const allowFacultyChoiceList = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.allowFacultyChoiceList);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const allowDepartmentChoiceList = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.allowDepartmentChoiceList);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const allowOrganisationChoiceList = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.allowOrganisationChoiceList);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const blockUpdatesToDateOfBirth = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.blockUpdatesToDateOfBirth);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const blockUpdatesToGender = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.blockUpdatesToGender);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const allowPreferredEmailChange = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.allowPreferredEmailChange);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const performanceUseDirectRatingValue = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.performanceUseDirectRatingValue);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const performanceUseDirectObjectiveValue = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.performanceUseDirectObjectiveValue);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const enableHourlyLeave = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.enableHourLeave);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const useCorporateIdField = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.useCorporateIdField);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});


export const allowReboardCancel = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.allowReboardCancel);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const implementPolicy = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.implementPolicy);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const implementPolicyHR = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.implementPolicyHR);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const allowLMViewEmployeeLetter = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.allowLMViewEmployeeLetter);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

/* 
  Permissions for manage objectives,
  line manager objectives,
  and manage objective approvals
*/
export const performanceShowExtendedObjectiveFields = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.performanceShowExtendedObjectiveFields);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const performanceAllowEmpObjectiveUpload = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.performanceAllowEmpObjectiveUpload);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});

export const performanceAllowLmObjectiveUpload = createSelector(businessOptions, (list) => {
  const option = list.find(val => val.option_key === BUSINESS_OPTION.performanceAllowLmObjectiveUpload);

  if (option) {
    return option.option_value;
  } else {
    return 'NO';
  }
});
