import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowEditorWorkHistory, LoadApprovedDataWorkHistory, LoadAwaitingApprovalDataWorkHistory, LoadDataWorkHistory } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorHrReboardWorkHistory, LoadDataHrReboardWorkHistory } from "../../../store/hr-reboard-data";

@Injectable()
export class HrReboardWorkHistoryService {

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
    this.store.dispatch(new ShowEditorHrReboardWorkHistory());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadDataHrReboardWorkHistory({ employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Work History Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
