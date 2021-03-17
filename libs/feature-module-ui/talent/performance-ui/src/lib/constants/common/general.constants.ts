export const OBJECTIVE_MASTER_STATUS_TYPES = {
  unSubmitted: 0,
  submitted: 1,
  planningClosed: 2,
  reviewInProgress: 3,
  completed: 4
};

export const REVIEW_STATUS_TYPES = {
  initiate: 0,
  continue: 1
};

export const REVIEW_PATHS = {
  processFlow: 0,
  SelfReview: 1
};

export const OBJECTIVE_APPROVAL_STATUS_TYPES = {
  unAppproved: 1,
  approved: 2
};

export const OBJECTIVE_APPROVAL_STATUS_TYPES_LABEL: { value: number, label: string }[] = [
  {value: 0, label:'Non'},
  {value: 1, label:'Not Approved'},
  {value: 2, label:'Approved'},
 ];

export const OBJECTIVE_SUBMIT_STATUS_TYPES = {
  unSubmitted: 0,
  submitted: 1,
};

export const OBJECTIVE_SUBMIT_STATUS_TYPES_LABEL: { value: number, label: string }[] = [
  {value: 0, label:'Non'},
  {value: 1, label:'Objectives Submitted'},
  {value: 2, label:'Objectives Approved'},
  {value: 3, label:'Review started'},
  {value: 4, label:'Completed'},
  {value: 5, label:'---'},
  {value: 6, label:'---'},
  {value: 7, label:'---'},
  {value: 8, label:'---'},
  {value: 9, label:'---'},
 ];

export const ASSET_TYPE_CONSTANTS = {
  customPage: 0,
  kpiPage: 1,
  ratingPage: 2,
  contractPage: 3,
  competencyAssessmentPage: 4,
  subscriptionPage: 5,
  RatingPage360: 6,
  RatingFeedBackPage: 7
 };

 export const RATINGS_ASSET_TYPE_CONSTANTS = {
  ratingPage: 2,
  RatingPage360: 6,
  RatingFeedBackPage: 7
 };

 export const WIDGET_OPT_CONSTANTS = {
  page: 0,
  section: 1,
  paragraph: 2,
  textBox: 3,
  dropDown: 4,
  listBox: 5,
  checkBox: 6,
  checkBoxMultiple: 7,
  radioButton: 8,
  label: 9,
  starControl: 10,
  numberText: 11,
  dateControl: 12,
  };


export const targetTypeOptions: { value: number, label: string }[] = [
  {value: 0, label:'Number'},
  {value: 1, label:'Money'},
  {value: 2, label:'Date'},
  {value: 3, label:'Percentage'},
  {value: 4, label:'Custom'}
 ];

 export const visibilityOptions: { value: number, label: string }[] = [
  {value: 0, label:'Public'},
  {value: 1, label:'Private'}
 ];

 export const progressTypeOptions: { value: number, label: string }[] = [
  {value: 0, label:'Activities'},
  {value: 1, label:'Milestones'},
  {value: 2, label:'Deliverables'}
 ];

 export const numberFlagTypeOptions: { value: number, label: string }[] = [
  {value: 0, label:'False'},
  {value: 1, label:'True'},
 ];

 export const eligibilityRuleOptions: { value: number, label: string }[] = [
  {value: 0, label:'Global'},
  {value: 1, label:'Designation'},
  {value: 2, label:'Position'},
  {value: 3, label:'Structure Type'},
  {value: 4, label:'Specific Structure'},
  {value: 5, label:'Grade'},
  {value: 6, label:'Employee'}
 ];

 export const ELIGIBILITY_CONSTANTS = {
  global: 0,
  designation: 1,
  position: 2,
  analysis: 3,
  analysisDetail: 4,
  grade: 5,
  employee: 6,
};

 export const typeOptions: { value: number, label: string }[] = [
  {value: 0, label:'Financial'},
  {value: 1, label:'Customer Centric'},
  {value: 2, label:'Internal Operations'},
  {value: 3, label:'Learning'},
  {value: 4, label:'Others'}
 ];

 export const PERSPECTIVE_TYPE_CONSTANTS = {
  financial: 0,
  customer_center: 1,
  internal_operations: 2,
  learning: 3,
  others: 4,
};

export const subscriptionOptions: { value: number, label: string }[] = [
  {value: 0, label:'Main Subscription'},
 ];

export const roleOptions: { value: number, label: string }[] = [
  {value: 0, label:'Employee Self Review'},
  {value: 1, label:'Line Manager Review'},
  {value: 2, label:'Employee (Accept/ Reject)'},
  {value: 3, label:'Reviewer Assessing'},
  {value: 4, label:'Reviewer'},
  {value: 5, label:'Moderator'},
  {value: 6, label:'HR (Queues)'}
 ];

 export const lineManagerRoleOptions: { value: number, label: string }[] = [
  {value: 1, label:'Primary Line Manager'},
  {value: 3, label:'Secondary Line Manager'},
 ];

 export const role360Options: { value: number, label: string }[] = [
  {value: 0, label:'Peer'},
  {value: 1, label:'Leadership'},
  {value: 2, label:'External'}
 ];

 export const stepOptions: { value: number, label: string }[] = [
  {value: 0, label:'1'},
  {value: 1, label:'2'},
  {value: 2, label:'3'},
  {value: 3, label:'4'},
  {value: 4, label:'5'}
 ];

 export const assetOptions: { value: number, label: string }[] = [
  {value: 0, label:'Custom Page'},
  {value: 1, label:'KPI Page'},
  {value: 2, label:'Rating Page'},
  {value: 3, label:'Contract Page'},
  {value: 4, label:'Competency Assessment Page'},
  {value: 5, label:'Subscription Page'},
  {value: 6, label:'360 Rating Page'},
  {value: 7, label:'Rating Feedback Page'},
 ];

 export const ratingsAssetOptions: { value: number, label: string }[] = [
  {value: 2, label:'Rating Page'},
  {value: 6, label:'360 Rating Page'},
  {value: 7, label:'Rating Feedback Page'},
 ];

 export const widgetOptions: { value: number, label: string }[] = [
  {value: 0, label:'Page'},
  {value: 1, label:'Section'},
  {value: 2, label:'Paragraph(Large Text)'},
  {value: 3, label:'Textbox(Small Text)'},
  {value: 4, label:'Dropdownlist'},
  {value: 5, label:'Listbox'},
  {value: 6, label:'Checkbox(select one)'},
  {value: 7, label:'Checkbox(select multiple)'},
  {value: 8, label:'RadioButton(select one)'},
  {value: 9, label:'Label'},
  {value: 10, label:'Star Control'},
  {value: 11, label:'NumberText'},
  {value: 12, label:'DateControl'}
 ];

 export const permOptions: { value: number, label: string }[] = [
  {value: 0, label:'N/A'},
  {value: 1, label:'Read'},
  {value: 2, label:'Read/Write'},
 ];

 export const rankOptions: { value: number, label: string }[] = [
  {value: 0, label:'1'},
  {value: 1, label:'2'},
  {value: 2, label:'3'},
  {value: 3, label:'4'},
  {value: 4, label:'5'},
 ];

 export const feedbackRoleOptions: { value: number, label: string }[] = [
  {value: 0, label:'Employee'},
  {value: 1, label:'Line Manager'},
 ];

 export const OBJECTIVE_UPLOAD_EVENTS_CONSTANTS = {
  non: 0,
  upload: 1,
  validate: 2,
  reset: 3,
  import: 4,
  add: 5,
  update: 6,
  delete: 7,
};

export const TARGET_TYPE_CONSTANTS = {
  Number: 0,
  Money: 1,
  Date: 2,
  Percentage: 3,
  Custom: 4 
};
