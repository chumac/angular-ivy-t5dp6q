import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IProfilePicture } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogBoxCommandTypes, DialogService } from "@nutela/shared/ui";
import { getProfilePictureAwaitingApproval, ShowEditorProfilePicture, ShowViewerProfilePicture, LoadProfilePicture, LoadAwaitingApprovalProfilePicture, DeleteAwaitingApprovalProfilePicture } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { toastOptionsInformation } from "@nutela/core-services";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { IAppState } from "@nutela/store/app-state";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  awaitingApprovalData$: Observable<IProfilePicture>;

  dialogBox: DialogBoxComponent = null;

  modalRef: MDBModalRef;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {
    this.awaitingApprovalData$ = this.store.pipe(select(getProfilePictureAwaitingApproval));
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
      case HrzCommandTypes.DELETE: {
        this.deleteAwaitingApprovalData();
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
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorProfilePicture());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: `You have data awaiting approval. You must discard pending data before you can update your data again.`, options: toastOptionsInformation()}));
      }
    });
  }

  showViewer() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval.`, options: toastOptionsInformation()}));
      } else {
        this.store.dispatch(new ShowViewerProfilePicture());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, options: toastOptionsInformation()}));
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteAwaitingApprovalProfilePicture(data.ess_emp_id));
          }
        });
        // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
        //   .subscribe((command: string) => {
        //     if (command === DialogBoxCommandTypes.COMMAND1) {
        //       this.store.dispatch(new DeleteAwaitingApprovalProfilePicture(data.ess_emp_id));
        //     }
        //   });
      }
    });
  }

  refreshData() {
    this.store.dispatch(new LoadAwaitingApprovalProfilePicture());
  }
}
