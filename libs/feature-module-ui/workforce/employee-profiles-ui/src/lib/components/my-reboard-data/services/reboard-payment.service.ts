import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IPayment } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogService } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { IAppState } from "@nutela/store/app-state";
import { ToastTypes } from "@nutela/shared/app-global";
import { take } from "rxjs/internal/operators/take";
import { ShowEditorReboardPayment, LoadDataReboardPayment, getReboardPaymentData, ShowViewerReboardPayment } from "../../../store/my-reboard-data";

@Injectable()
export class ReboardPaymentService {
  dialogBox: DialogBoxComponent = null;

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
        this.deleteData();
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
    this.getData().pipe(take(1)).subscribe((data: IPayment) => {
      console.log(data);
      if (!data) {
        this.store.dispatch(new ShowToast({ title: null, message: `Data not available at this point.`, type: ToastTypes.INFO }));
      } else {
        this.store.dispatch(new ShowEditorReboardPayment());
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
      if (!data) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval.`, type: ToastTypes.INFO}));
      } else {
        this.store.dispatch(new ShowViewerReboardPayment());
      }
    });
  }

  deleteData() {
    this.getData().pipe(take(1)).subscribe((data: IPayment) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, type: ToastTypes.INFO}));
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            // this.store.dispatch(new DeleteDataPayment());
          }
        });
        // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
        //   .subscribe((command: string) => {
        //     if (command === DialogBoxCommandTypes.COMMAND1) {
        //       this.store.dispatch(new DeleteDataPayment());
        //     }
        //   });
      }
    });
  }

  getData(): Observable<IPayment> {
    return this.store.pipe(take(1), select(getReboardPaymentData));
  }

  refreshData() {
    this.store.dispatch(new LoadDataReboardPayment());
    this.store.dispatch(new ShowToast({title: null, message: `Payment Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
