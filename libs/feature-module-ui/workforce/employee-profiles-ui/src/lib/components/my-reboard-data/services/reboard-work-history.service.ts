import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowEditorWorkHistory, LoadApprovedDataWorkHistory, LoadAwaitingApprovalDataWorkHistory, LoadDataWorkHistory } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorReboardWorkHistory, LoadDataReboardWorkHistory } from "../../../store/my-reboard-data";

@Injectable()
export class ReboardWorkHistoryService {

  constructor(private store: Store<IAppState>) {}

  commandProcessor(command: HrzCommandTypes) {
    switch (command) {
      case HrzCommandTypes.ADD: {
        this.showEditor();
        break;
      }
      case HrzCommandTypes.REFRESH: {
        this.refreshData();
        break;
      }
      default:
        break;
    }
  }

  showEditor() {
    this.store.dispatch(new ShowEditorReboardWorkHistory());
  }

  refreshData() {
    this.store.dispatch(new LoadDataReboardWorkHistory());
    this.store.dispatch(new ShowToast({title: null, message: `Work History Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
