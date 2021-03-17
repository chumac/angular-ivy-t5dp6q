import { IInterviewForm, IInterviewQuestion } from '../../../../../../../../models/workforce/exit/src/lib/interfaces';


export interface IInterviewState {
  interviewFormsData: IInterviewForm[];
  questionsData: IInterviewQuestion[];
  isProcessing: boolean;
  isLoading: boolean;
  showFormEditor: boolean;
  showQuestionEditor: boolean;
  showFormViewer: boolean;
  showQuestionViewer: boolean;
}

export const initialInterviewState: IInterviewState = {
  interviewFormsData: [],
  questionsData: [],
  isProcessing: false,
  isLoading: false,
  showFormEditor: false,
  showFormViewer: false,
  showQuestionEditor: false,
  showQuestionViewer: false,
};
