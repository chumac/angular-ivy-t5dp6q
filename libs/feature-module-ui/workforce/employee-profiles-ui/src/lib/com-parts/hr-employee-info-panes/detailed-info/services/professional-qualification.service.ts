import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { IEmployeesProfileState } from "../../../../store/root";
import { ActivatedRoute } from "@angular/router";
import { ShowEditorProfessionalQualifications, LoadApprovedDataProfessionalQualifications, LoadAwaitingApprovalDataProfessionalQualifications } from "../../../../store/employee-detailed-area";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";


@Injectable({
  providedIn: 'root'
})
export class ProfessionalQualificationService {


  constructor(private store: Store<IEmployeesProfileState>,) {}

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
    this.store.dispatch(new ShowEditorProfessionalQualifications());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataProfessionalQualifications({employeeId: employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataProfessionalQualifications({employeeId: employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Professional qualification data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
