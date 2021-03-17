import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { LoadApprovedDataReferee, LoadAwaitingApprovalDataReferee, ShowEditorReferee, LoadDataReferee } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorHrReboardReferee, LoadDataHrReboardReferee } from "../../../store/hr-reboard-data";

@Injectable()
export class HrReboardPersonalRefereeService {

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
    this.store.dispatch(new ShowEditorHrReboardReferee());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadDataHrReboardReferee({ employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Personal Referee Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
