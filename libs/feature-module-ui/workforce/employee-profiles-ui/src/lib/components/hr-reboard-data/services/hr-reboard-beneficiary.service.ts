import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorHrReboardBeneficiary, LoadDataHrReboardBeneficiary } from "../../../store/hr-reboard-data";
import { LoadComprehensiveData } from "../../../store/employee-detailed-area";

@Injectable()
export class HrReboardBeneficiaryService {

  constructor(private store: Store<IAppState>) {}

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
    this.store.dispatch(new ShowEditorHrReboardBeneficiary());
  }

  refreshData(employeeId) {
    this.store.dispatch(new LoadDataHrReboardBeneficiary({employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Beneficiary Information is being refreshed.`, type: ToastTypes.INFO}));
    this.store.dispatch(new LoadComprehensiveData({employeeId}));
  }
}
