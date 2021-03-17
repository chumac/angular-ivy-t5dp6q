import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { LoadApprovedDataFamily, LoadAwaitingApprovalDataFamily, ShowEditorFamily, LoadDataFamily } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorReboardFamily, LoadDataReboardFamily } from "../../../store/my-reboard-data";

@Injectable()
export class ReboardFamilyService {

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
    this.store.dispatch(new ShowEditorReboardFamily());
  }

  refreshData() {
    this.store.dispatch(new LoadDataReboardFamily());
    this.store.dispatch(new ShowToast({title: null, message: `Family Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
