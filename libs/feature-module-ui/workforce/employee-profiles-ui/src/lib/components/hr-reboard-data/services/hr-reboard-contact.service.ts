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
import { ShowEditorHrReboardContact, getHrReboardContactData, LoadDataHrReboardContact } from "../../../store/hr-reboard-data";
import { LoadComprehensiveData } from "../../../store/employee-detailed-area";

@Injectable()
export class HrReboardContactService {
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
    this.getData().pipe(take(1)).subscribe((data: IContact) => {
      if (!data) {
        this.store.dispatch(new ShowToast({ title: null, message: `Data not available at this point.`, type: ToastTypes.INFO }));
      } else {
        this.store.dispatch(new ShowEditorHrReboardContact());
      }
    });
  }

  showViewer() {
    this.getData().pipe(take(1)).subscribe((data: IContact) => {
      if (!data) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data to view.`, type: ToastTypes.INFO}));
      } else {
        this.store.dispatch(new ShowViewerContact());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.getData().pipe(take(1)).subscribe((data: IContact) => {
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
      }
    });
  }

  getData(): Observable<IContact> {
    return this.store.pipe(take(1), select(getHrReboardContactData));
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadDataHrReboardContact({employeeId}));
    this.store.dispatch(new ShowToast({ title: null, message: `Contact Information data is being refreshed.`, type: ToastTypes.INFO }));
    this.store.dispatch(new LoadComprehensiveData({employeeId}));
  }
}
