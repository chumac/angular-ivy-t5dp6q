import { initialTransferState, ITransferState } from './transfer.state';
import { TransferActions, TransferActionTypes } from './transfer.actions';

export function transferReducer(
  state = initialTransferState,
  action: TransferActions
): ITransferState {
  switch (action.type) {
    case TransferActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case TransferActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case TransferActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case TransferActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case TransferActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case TransferActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case TransferActionTypes.LOADING:
      return { ...state, isLoading: true };
    case TransferActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case TransferActionTypes.LOAD_APPROVED_DIRECT_SUCCESS:
      return { ...state, approvedDirect: action.payload.map(data => Object.assign({}, data, {
        fullName: `${data.employeeInfo?data.employeeInfo.employee_firstname:null} ${data.employeeInfo?data.employeeInfo.employee_surname:null}` ,
        supervisor: `${data.EmployeeReportToInfo?data.EmployeeReportToInfo.employee_firstname:null} ${data.EmployeeReportToInfo?data.EmployeeReportToInfo.employee_surname:null}` ,
        oldPosition:data.currentPosition?data.currentPosition.description:null,
        latestPosition:data.newPosition?data.newPosition.description:null,
        currentDesignation:data.currentDesignationInfo?data.currentDesignationInfo.description:null,
        latestDesignation:data.newDesignationInfo?data.newDesignationInfo.description:null,
        latestStructure:data.newLocationStructure?data.newLocationStructure.description:null,
        latestLocation:data.newLocationDetails?data.newLocationDetails.description:null}))};
    case TransferActionTypes.LOAD_AWAITING_DIRECT_SUCCESS:
      return { ...state, awaitingDirect: action.payload.map(data => Object.assign({}, data, {
        fullName: `${data.employeeInfo?data.employeeInfo.employee_firstname:null} ${data.employeeInfo?data.employeeInfo.employee_surname:null}` ,
        supervisor: `${data.EmployeeReportToInfo?data.EmployeeReportToInfo.employee_firstname:null} ${data.EmployeeReportToInfo?data.EmployeeReportToInfo.employee_surname:null}` ,oldPosition:data.currentPosition?data.currentPosition.description:null,
        latestPosition:data.newPosition?data.newPosition.description:null,
        currentDesignation:data.currentDesignationInfo?data.currentDesignationInfo.description:null,
        latestDesignation:data.newDesignationInfo?data.newDesignationInfo.description:null,
        latestStructure:data.newLocationStructure?data.newLocationStructure.description:null,
        latestLocation:data.newLocationDetails?data.newLocationDetails.description:null}))};
    case TransferActionTypes.LOAD_TREE_ROOT_SUCCESS:
      return { ...state, treeRoot: action.payload };
    case TransferActionTypes.LOAD_TREE_DETAILS_SUCCESS:
      return { ...state, treeDetails: action.payload };
    case TransferActionTypes.CLEAR_TREE_DETAILS:
      return { ...state, treeDetails: [] };
    case TransferActionTypes.LOAD_IMPORT_SUCCESS:
      return { ...state, import: action.payload };
    case TransferActionTypes.LOAD_STATUS_DATA_SUCCESS:
      return { ...state, status: action.payload };
    case TransferActionTypes.LOAD_BATCH_DATA_SUCCESS:
      return { ...state, batch: action.payload };
    case TransferActionTypes.LOAD_POSITION_DATA_SUCCESS:
      return { ...state, position: action.payload };
    case TransferActionTypes.LOAD_DESIGNATION_DATA_SUCCESS:
      return { ...state, designation: action.payload };
    case TransferActionTypes.LOAD_LOCATION_DATA_SUCCESS:
      return { ...state, location: action.payload };
    case TransferActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA_SUCCESS:
      return { ...state, specificStructure: action.payload };
    case TransferActionTypes.LOAD_SPECIFIC_TYPE_DATA_SUCCESS:
      return { ...state, specificType: action.payload };
    case TransferActionTypes.LOAD_COST_CENTER_SUCCESS:
      return { ...state, costCenter: action.payload };
    case TransferActionTypes.LOAD_GET_STRUCTURE_DATA_SUCCESS:
      return { ...state, getStructure: action.payload };
    case TransferActionTypes.LOAD_CURRENT_JOB_SUCCESS:
      return { ...state, currentJob: action.payload };;
    case TransferActionTypes.LOAD_PICKED:
      return { ...state, picked: action.payload };
    default: {
      return state;
    }
  }
}
