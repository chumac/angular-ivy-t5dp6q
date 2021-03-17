import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowEditorGuarantor, LoadApprovedDataGuarantor, LoadAwaitingApprovalDataGuarantor, LoadDataGuarantor } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class GuarantorService {

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
    this.store.dispatch(new ShowEditorGuarantor());
  }

  refreshData() {
    this.store.dispatch(new LoadDataGuarantor());
    this.store.dispatch(new ShowToast({title: null, message: `Guarantor Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
