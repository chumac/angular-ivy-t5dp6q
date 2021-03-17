import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IContact } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogBoxCommandTypes, DialogService } from "@nutela/shared/ui";
import { ShowEditorContact, ShowViewerContact, DeleteAwaitingApprovalDataContact, LoadApprovedDataContact, LoadAwaitingApprovalDataContact, getContactAwaitingApprovalData } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { IAppState } from "@nutela/store/app-state";
import { ToastTypes } from "@nutela/shared/app-global";
import { take } from "rxjs/internal/operators/take";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  dialogBox: DialogBoxComponent = null;

  modalRef: MDBModalRef;

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
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IContact) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorContact());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: `You have data awaiting approval. You must discard pending data before you can update your data again.`, type: ToastTypes.INFO}));
      }
    });
  }

  showViewer() {
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IContact) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval.`, type: ToastTypes.INFO}));
      } else {
        this.store.dispatch(new ShowViewerContact());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IContact) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, type: ToastTypes.INFO}));
        return false;
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteAwaitingApprovalDataContact());
          }
        });
        // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
        //   .subscribe((command: string) => {
        //     if (command === DialogBoxCommandTypes.COMMAND1) {
        //       this.store.dispatch(new DeleteAwaitingApprovalDataContact());
        //     }else {
        //       return false;
        //     }
        //   });
      }
    });
  }

  getAwaitingApprovalData(): Observable<IContact> {
    return this.store.pipe(take(1), select(getContactAwaitingApprovalData));
  }

  refreshData() {
    this.store.dispatch(new LoadApprovedDataContact());
    this.store.dispatch(new LoadAwaitingApprovalDataContact());
    this.store.dispatch(new ShowToast({title: null, message: `Contact Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
