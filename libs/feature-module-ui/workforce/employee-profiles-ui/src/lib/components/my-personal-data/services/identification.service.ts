import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IIdentification } from "@nutela/models/workforce/employee-profiles";
import { HrzCommandTypes, DialogBoxCommandTypes, DialogService, DialogBoxModes } from "@nutela/shared/ui";
import { ShowEditorIdentification, ShowViewerIdentification, getIdentificationAwaitingApprovalData, DeleteAwaitingApprovalDataIdentification, showEditor, LoadApprovedDataIdentification, LoadAwaitingApprovalDataIdentification, LoadSignatureImage } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { toastOptionsInformation, UtilService } from "@nutela/core-services";
import { IAppState } from "@nutela/store/app-state";
import { take } from "rxjs/internal/operators/take";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {

  constructor(private store: Store<IAppState>, private dialogService: DialogService) { }

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
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IIdentification) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorIdentification());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: `You have data awaiting approval. You must discard pending data before you can update your data again.`, options: toastOptionsInformation()}));
      }
    });
  }

  showViewer() {
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IIdentification) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval.`, options: toastOptionsInformation()}));
      } else {
        this.store.dispatch(new ShowViewerIdentification());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IIdentification) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, options: toastOptionsInformation()}));
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteAwaitingApprovalDataIdentification());
          }
        });
        // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`, DialogBoxModes.MODAL).pipe(take(1))
        //   .subscribe((command: string) => {
        //     if (command === DialogBoxCommandTypes.COMMAND1) {
        //       this.store.dispatch(new DeleteAwaitingApprovalDataIdentification());
        //     }
        //   });
      }
    });
  }

  getAwaitingApprovalData(): Observable<IIdentification> {
    return this.store.pipe(take(1), select(getIdentificationAwaitingApprovalData));
  }

  refreshData() {
    this.store.dispatch(new LoadApprovedDataIdentification());
    this.store.dispatch(new LoadAwaitingApprovalDataIdentification());
    this.store.dispatch(new LoadSignatureImage());
    this.store.dispatch(new ShowToast({title: null, message: `Identification Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
