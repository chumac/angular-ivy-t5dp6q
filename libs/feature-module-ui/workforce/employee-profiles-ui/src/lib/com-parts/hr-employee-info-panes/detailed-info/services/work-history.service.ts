import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { ActivatedRoute } from "@angular/router";
import { IEmployeesProfileState } from "../../../../store/root";
import { ShowEditorHRWorkHistory, LoadApprovedDataHRWorkHistory, LoadAwaitingApprovalDataHRWorkHistory } from "../../../../store/employee-detailed-area";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class WorkHistoryService {

  constructor(private store: Store<IEmployeesProfileState>) {}

  commandProcessor(command: HrzCommandTypes, employeeId: number) {
    switch (command) {
      case HrzCommandTypes.ADD: {
        this.showEditor();
        break;
      }
      case HrzCommandTypes.REFRESH: {
        this.refreshData(employeeId);
        break;
      }
      default:
        break;
    }
  }

  showEditor() {
    this.store.dispatch(new ShowEditorHRWorkHistory());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataHRWorkHistory({employeeId: employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataHRWorkHistory({employeeId: employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Work history data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
