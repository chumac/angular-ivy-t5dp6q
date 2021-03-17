import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { IEmployeesProfileState } from "../../../../store/root";
import { ActivatedRoute } from "@angular/router";
import { ShowEditorGuarantor, LoadApprovedDataGuarantor, LoadAwaitingApprovalDataGuarantor } from "../../../../store/employee-detailed-area";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class GuarantorService {


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
    this.store.dispatch(new ShowEditorGuarantor());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataGuarantor({employeeId:employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataGuarantor({employeeId:employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Personal Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
