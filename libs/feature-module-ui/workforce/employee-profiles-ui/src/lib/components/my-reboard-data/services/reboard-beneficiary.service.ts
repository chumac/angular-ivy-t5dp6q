import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorReboardBeneficiary, LoadDataReboardBeneficiary } from "../../../store/my-reboard-data";

@Injectable()
export class ReboardBeneficiaryService {

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
    this.store.dispatch(new ShowEditorReboardBeneficiary());
  }

  refreshData() {
    this.store.dispatch(new LoadDataReboardBeneficiary());
    this.store.dispatch(new ShowToast({title: null, message: `Beneficiary Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
