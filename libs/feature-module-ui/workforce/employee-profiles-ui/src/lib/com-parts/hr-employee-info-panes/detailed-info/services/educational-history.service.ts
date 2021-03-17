import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { DialogBoxComponent, HrzCommandTypes, DialogService } from "@nutela/shared/ui";
import { IEmployeesProfileState } from "../../../../store/root";
import { ActivatedRoute } from "@angular/router";
import { ShowEditorEducation, LoadApprovedDataEducation, LoadAwaitingApprovalDataEducation } from "../../../../store/employee-detailed-area";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";


@Injectable({
  providedIn: 'root'
})
export class EducationalHistoryService {


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
    this.store.dispatch(new ShowEditorEducation());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataEducation({employeeId: employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataEducation({employeeId: employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Educational History data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
