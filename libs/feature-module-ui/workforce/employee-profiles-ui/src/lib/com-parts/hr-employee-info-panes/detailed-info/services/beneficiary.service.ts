import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowEditorHRBeneficiary, LoadAwaitingApprovalDataHRBeneficiary, LoadApprovedDataHRBeneficiary } from "../../../../store/employee-detailed-area";
import { IEmployeesProfileState } from "../../../../store/root";
import { ActivatedRoute } from "@angular/router";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowToast } from "@nutela/store/shared";

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

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
    this.store.dispatch(new ShowEditorHRBeneficiary());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataHRBeneficiary({employeeId: employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataHRBeneficiary({employeeId: employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Beneficiary data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
