import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { LoadApprovedDataReferee, LoadAwaitingApprovalDataReferee, ShowEditorReferee, LoadDataReferee } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class PersonalRefereeService {

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
    this.store.dispatch(new ShowEditorReferee());
  }

  refreshData() {
    this.store.dispatch(new LoadDataReferee());
    this.store.dispatch(new ShowToast({title: null, message: `Personal Referee Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
