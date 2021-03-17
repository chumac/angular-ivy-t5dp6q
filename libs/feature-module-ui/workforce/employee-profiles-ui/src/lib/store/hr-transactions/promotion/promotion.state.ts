
import { IPromotion, ICurrentGradePaygroup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from 'dist/libs/models/core-data';

export interface IPromotionState {
  pendingData: IPromotion[];
  approvedData: IPromotion[];
  awaitingData: IPromotion[];
  arrearsStatus: ISelectOption[];
  actions: ISelectOption[];
  paygradeData: ISelectOption[];
  paygroupData: ISelectOption[];
  submissionProcess: ISelectOption[];
  currentPaygradeData: ISelectOption[];
  currentPaygroupData: ISelectOption[];
  isLoading: boolean;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  showSubmissionProcessEditor: boolean;
  selectedPromotion: IPromotion[];
  employeeCurrentPayData: ICurrentGradePaygroup;
}

export const initialPromotionState: IPromotionState = {
  pendingData: [],
  approvedData: [],
  awaitingData: [],
  arrearsStatus: null,
  actions: null,
  paygradeData: null,
  paygroupData: null,
  currentPaygradeData: null,
  currentPaygroupData: null,
  submissionProcess: null,
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  showSubmissionProcessEditor: false,
  selectedPromotion: null,
  employeeCurrentPayData: null
};
