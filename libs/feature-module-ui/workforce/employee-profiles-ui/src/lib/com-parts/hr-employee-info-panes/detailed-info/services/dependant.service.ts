import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { IEmployeesProfileState } from "../../../../store/root";
import { ShowEditorDependant, LoadApprovedDataDependant, LoadAwaitingApprovalDataDependant } from "../../../../store/employee-detailed-area";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class DependantService {


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
    this.store.dispatch(new ShowEditorDependant());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataDependant({employeeId: employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataDependant({employeeId: employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Dependant data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
