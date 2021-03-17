import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IPayment } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogBoxCommandTypes, DialogService } from "@nutela/shared/ui";

import { ShowToast } from "@nutela/store/shared";
import { toastOptionsInformation } from "@nutela/core-services";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { IEmployeesProfileState } from "../../../../store";
import { getPaymentAwaitingApprovalData, ShowEditorPayment, ShowViewerPayment, DeleteAwaitingApprovalDataPayment, LoadApprovedDataPayment, LoadAwaitingApprovalDataPayment } from "../../../../store/employee-detailed-area";
import { ToastTypes } from "@nutela/shared/app-global";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  awaitingApprovalData$: Observable<IPayment>;

  dialogBox: DialogBoxComponent = null;

  modalRef: MDBModalRef;

  constructor(private store: Store<IEmployeesProfileState>, private dialogService: DialogService) {
    this.awaitingApprovalData$ = this.store.pipe(select(getPaymentAwaitingApprovalData));
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
        this.refreshData(employeeId);
        break;
      }
      default:
        break;
    }
  }

  showEditor() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorPayment());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: `You have data awaiting approval. You must discard pending data before you can update your data again.`, options: toastOptionsInformation()}));
      }
    });
  }

  showViewer() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval.`, options: toastOptionsInformation()}));
      } else {
        this.store.dispatch(new ShowViewerPayment());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, options: toastOptionsInformation()}));
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteAwaitingApprovalDataPayment({ employeeId: data.employeeInfo.employee_id, id: data.employeedetail_id }));
          }
        });
        // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
        //   .subscribe((command: string) => {
        //     if (command === DialogBoxCommandTypes.COMMAND1) {
        //       this.store.dispatch(new DeleteAwaitingApprovalDataPayment({ employeeId: data.employeeInfo.employee_id, id: data.employeedetail_id }));
        //     }
        //   });
      }
    });
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataPayment({ employeeId: employeeId }));
    this.store.dispatch(new LoadAwaitingApprovalDataPayment({ employeeId: employeeId }));
    this.store.dispatch(new ShowToast({title: null, message: `Payment data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
