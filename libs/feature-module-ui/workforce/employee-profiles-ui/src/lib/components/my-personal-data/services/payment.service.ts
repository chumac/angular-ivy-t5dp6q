import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IPayment } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogBoxCommandTypes, DialogService } from "@nutela/shared/ui";
import { ShowEditorPayment, ShowViewerPayment, getPaymentAwaitingApprovalData, DeleteAwaitingApprovalDataPayment, showEditor, LoadApprovedDataPayment, LoadAwaitingApprovalDataPayment } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { toastOptionsInformation } from "@nutela/core-services";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { IAppState } from "@nutela/store/app-state";
import { ToastTypes } from "@nutela/shared/app-global";
import { take } from "rxjs/internal/operators/take";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
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
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorPayment());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: `You have data awaiting approval. You must discard pending data before you can update your data again.`, type: ToastTypes.INFO}));
      }
    });
  }

  showViewer() {
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval.`, type: ToastTypes.INFO}));
      } else {
        this.store.dispatch(new ShowViewerPayment());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, type: ToastTypes.INFO}));
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteAwaitingApprovalDataPayment());
          }
        });
        // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
        //   .subscribe((command: string) => {
        //     if (command === DialogBoxCommandTypes.COMMAND1) {
        //       this.store.dispatch(new DeleteAwaitingApprovalDataPayment());
        //     }
        //   });
      }
    });
  }

  getAwaitingApprovalData(): Observable<IPayment> {
    return this.store.pipe(take(1), select(getPaymentAwaitingApprovalData));
  }

  refreshData() {
    this.store.dispatch(new LoadApprovedDataPayment());
    this.store.dispatch(new LoadAwaitingApprovalDataPayment());
    this.store.dispatch(new ShowToast({title: null, message: `Payment Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
