import { Injectable } from "@angular/core";

import { Observable } from "rxjs/internal/Observable";
import { Store } from "@ngrx/store";

import { IContact } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogBoxService } from "@nutela/shared/ui";
import { ShowEditorEducation, LoadApprovedDataEducation, LoadAwaitingApprovalDataEducation, LoadDataEducation } from '@nutela/store/modules/workforce/employee-profiles';
import { MDBModalService, MDBModalRef } from "ng-uikit-pro-standard";
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class EducationalHistoryService {

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
    this.store.dispatch(new ShowEditorEducation());
  }

  refreshData() {
    this.store.dispatch(new LoadDataEducation());
    this.store.dispatch(new ShowToast({title: null, message: `Educational History Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
