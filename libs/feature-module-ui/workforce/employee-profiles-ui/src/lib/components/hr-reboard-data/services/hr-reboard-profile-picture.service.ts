import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IProfilePicture } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogService } from "@nutela/shared/ui";
import { getProfilePictureAwaitingApproval, ShowEditorProfilePicture, ShowViewerProfilePicture, LoadProfilePicture, LoadAwaitingApprovalProfilePicture, DeleteAwaitingApprovalProfilePicture } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { IAppState } from "@nutela/store/app-state";
import { take } from "rxjs/operators";
import { ShowEditorHrReboardProfilePicture, LoadHrReboardProfilePicture, ShowViewerHrReboardProfilePicture } from "../../../store/hr-reboard-data";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable()
export class HrReboardProfilePictureService {
  awaitingApprovalData$: Observable<IProfilePicture>;

  dialogBox: DialogBoxComponent = null;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {
    this.awaitingApprovalData$ = this.store.pipe(select(getProfilePictureAwaitingApproval));
  }

  commandProcessor(command: HrzCommandTypes, employeeId: number) {
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

  clearSelected


  showEditor() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({ title: null, message: `There are no data awaiting approval.`, type: ToastTypes.INFO }));
      } else {
        this.store.dispatch(new ShowEditorHrReboardProfilePicture());
      }
    });
  }

  showViewer() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `There are no data awaiting approval.`, type: ToastTypes.INFO}));
      } else {
        this.store.dispatch(new ShowViewerHrReboardProfilePicture());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `There are no data awaiting approval. No record to delete.`, type: ToastTypes.INFO}));
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
    // this.store.dispatch(new LoadHrReboardProfilePicture());
  }
}
