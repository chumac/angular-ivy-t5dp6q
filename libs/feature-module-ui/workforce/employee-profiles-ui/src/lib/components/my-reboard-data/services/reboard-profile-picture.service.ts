import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IProfilePicture } from "@nutela/models/workforce/employee-profiles";
import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { IAppState } from "@nutela/store/app-state";
import { take } from "rxjs/operators";
import { ShowEditorReboardProfilePicture, LoadReboardProfilePicture, getReboardEmployeeId, ShowViewerReboardProfilePicture, getReboardProfilePicture } from "../../../store/my-reboard-data";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable()
export class ReboardProfilePictureService {
  profilePictureData$: Observable<IProfilePicture>;

  modalRef: MDBModalRef;

  constructor(private store: Store<IAppState>) {
    this.profilePictureData$ = this.store.pipe(select(getReboardProfilePicture));
  }

  commandProcessor(command: HrzCommandTypes) {
    switch (command) {
      case HrzCommandTypes.EDIT: {
        this.showEditor();
        break;
      }
      case HrzCommandTypes.VIEW: {
        this.showViewer();
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
    this.store.dispatch(new ShowEditorReboardProfilePicture());
  }

  showViewer() {
    this.profilePictureData$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (data) {
        this.store.dispatch(new ShowViewerReboardProfilePicture());
      } else {
        this.store.dispatch(new ShowToast({ title: null, message: `You don't have data to view.`, type: ToastTypes.INFO }));
      }
    });
  }

  refreshData() {
    // this.store.pipe(select(getReboardEmployeeId)).pipe(take(1))
    //   .subscribe((result) => {
    //     this.store.dispatch(new LoadReboardProfilePicture(result));
    //     this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
    //   }
    //   );
    this.store.dispatch(new LoadReboardProfilePicture());
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }
}
