import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IPayment } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogService } from "@nutela/shared/ui";
import { ShowViewerPayment } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { IAppState } from "@nutela/store/app-state";
import { ToastTypes } from "@nutela/shared/app-global";
import { take } from "rxjs/internal/operators/take";
import { ShowEditorHrReboardPayment, LoadDataHrReboardPayment, getHrReboardPaymentData } from "../../../store/hr-reboard-data";

@Injectable()
export class HrReboardPaymentService {
  dialogBox: DialogBoxComponent = null;

  modalRef: MDBModalRef;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) { }

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
    this.getData().pipe(take(1)).subscribe((data: IPayment) => {
      console.log(data);
      if (!data) {
        this.store.dispatch(new ShowToast({ title: null, message: `Data not available at this point.`, type: ToastTypes.INFO }));
      } else {
        this.store.dispatch(new ShowEditorHrReboardPayment());
      }
    });
  }

  // showEditor() {
  //   this.getAwaitingApprovalData().pipe(take(1)).subscribe((data: IPayment) => {
  //     if (isUndefined(data)) {
  //       this.store.dispatch(new ShowEditorPayment());
  //     } else {
  //       this.store.dispatch(new ShowToast({title: null, message: `You have data awaiting approval. You must discard pending data before you can update your data again.`, type: ToastTypes.INFO}));
  //     }
  //   });
  // }

  showViewer() {
    this.getData().pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({ title: null, message: `Data not available at this point.`, type: ToastTypes.INFO}));
      } else {
        this.store.dispatch(new ShowViewerPayment());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.getData().pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `Data not available at this point. No record to delete.`, type: ToastTypes.INFO}));
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete this data?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            // this.store.dispatch(new DeleteDataReboardPayment());
          }
        });
      }
    });
  }

  getData(): Observable<IPayment> {
    return this.store.pipe(take(1), select(getHrReboardPaymentData));
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadDataHrReboardPayment({employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Payment Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
