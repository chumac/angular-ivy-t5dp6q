
import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IContact } from "@nutela/models/workforce/employee-profiles";
import { DialogBoxComponent, HrzCommandTypes, DialogBoxCommandTypes, DialogService } from "@nutela/shared/ui";

import { ShowToast } from "@nutela/store/shared";
import { toastOptionsInformation } from "@nutela/core-services";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { ShowEditorContact, ShowViewerContact, DeleteAwaitingApprovalDataContact, getContactAwaitingApprovalData, LoadApprovedDataContact, LoadAwaitingApprovalDataContact } from "../../../../store/employee-detailed-area";
import { IEmployeesProfileState } from "../../../../store";
import { take } from "rxjs/operators";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  awaitingApprovalData$: Observable<IContact>;

  dialogBox: DialogBoxComponent = null;

  modalRef: MDBModalRef;

  constructor(private store: Store<IEmployeesProfileState>, private dialogService: DialogService) {
    this.awaitingApprovalData$ = this.store.pipe(select(getContactAwaitingApprovalData));
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
        this.deleteAwaitingApprovalData(employeeId);
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
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IContact) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorContact());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: `You have data awaiting approval. You must discard pending data before you can update your data again.`, options: toastOptionsInformation()}));
      }
    });
  }

  showViewer() {
    this.awaitingApprovalData$
    .pipe(take(1))
    .subscribe((data: IContact) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval.`, options: toastOptionsInformation()}));
      } else {
        this.store.dispatch(new ShowViewerContact());
      }
    });
  }

  deleteAwaitingApprovalData(employeeId) {
    this.awaitingApprovalData$
    .pipe(take(1))
    .subscribe((data: IContact) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, options: toastOptionsInformation()}));
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteAwaitingApprovalDataContact({ id: data.employeecontact_id, employeeId: employeeId }));
          }
        });
        // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`)
        //   .pipe(take(1))
        //   .subscribe((command: string) => {
        //     if (command === DialogBoxCommandTypes.COMMAND1) {
        //       this.store.dispatch(new DeleteAwaitingApprovalDataContact({ id: data.employeecontact_id ,employeeId:employeeId}));
        //     }
        //   });
      }
    });
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadApprovedDataContact({ employeeId: employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataContact({ employeeId: employeeId }));
    this.store.dispatch(new ShowToast({title: null, message: `Contact data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
