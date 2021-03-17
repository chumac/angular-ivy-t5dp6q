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
import { ShowEditorHrReboardIdentification, LoadDataHrReboardIdentification, LoadSignatureImageHrReboardIdentification, getHrReboardIdentificationData } from "../../../store/hr-reboard-data";
import { LoadComprehensiveData } from "../../../store/employee-detailed-area";

@Injectable()
export class HrReboardIdentificationService {

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
    this.getData().pipe(take(1)).subscribe((data: IIdentification) => {
      if (!data) {
        this.store.dispatch(new ShowToast({ title: null, message: `You don't have data to edit at this point.`, type: ToastTypes.INFO }));
      } else {
        this.store.dispatch(new ShowEditorHrReboardIdentification());
      }
    });
  }

  showViewer() {
    this.getData().pipe(take(1)).subscribe((data: IIdentification) => {
      if (!data) {
        this.store.dispatch(new ShowToast({ title: null, message: `You don't have data to view.`, type: ToastTypes.INFO }));
      } else {
        this.store.dispatch(new ShowViewerIdentification());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.getData().pipe(take(1)).subscribe((data: IIdentification) => {

      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, type: ToastTypes.INFO }));
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

  getData(): Observable<IIdentification> {
    return this.store.pipe(take(1), select(getHrReboardIdentificationData));
  }

  refreshData(employeeId) {
    this.store.dispatch(new LoadDataHrReboardIdentification({employeeId}));
    // this.store.dispatch(new LoadSignatureImageHrReboardIdentification());
    this.store.dispatch(new ShowToast({ title: null, message: `Identification Information data is being refreshed.`, type: ToastTypes.INFO }));
    this.store.dispatch(new LoadComprehensiveData({ employeeId }));
  }
}
