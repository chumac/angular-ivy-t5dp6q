import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { IEmployeesProfileState } from "../../../../store/root";
import { ActivatedRoute } from "@angular/router";
import { ShowEditorFamily, LoadApprovedDataFamily, LoadAwaitingApprovalDataFamily } from "../../../../store/employee-detailed-area";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class FamilyService {


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
    this.store.dispatch(new ShowEditorFamily());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataFamily({employeeId:employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataFamily({employeeId:employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Family data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
