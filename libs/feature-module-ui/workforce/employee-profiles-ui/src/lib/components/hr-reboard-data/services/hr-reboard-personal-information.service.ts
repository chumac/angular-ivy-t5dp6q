import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IGeneral } from "@nutela/models/workforce/employee-profiles";
import { HrzCommandTypes, DialogBoxCommandTypes, DialogService } from "@nutela/shared/ui";
import { ShowEditorGeneral, ShowViewerGeneral, getGeneralAwaitingApprovalData, DeleteAwaitingApprovalDataGeneral, LoadApprovedDataGeneral, LoadAwaitingApprovalDataGeneral } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { toastOptionsInformation } from "@nutela/core-services";
import { IAppState } from "@nutela/store/app-state";
import { take } from "rxjs/internal/operators/take";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorHrReboardGeneral, LoadDataHrReboardGeneral, getHrReboardGeneralData, ShowViewerHrReboardGeneral } from "../../../store/hr-reboard-data";

@Injectable()
export class HrReboardPersonalInformationService {

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
    this.getData().pipe(take(1)).subscribe((data: IGeneral) => {
      console.log(data);
      if (!data) {
        this.store.dispatch(new ShowToast({ title: null, message: `Data not available at this point.`, type: ToastTypes.INFO }));
      } else {
        this.store.dispatch(new ShowEditorHrReboardGeneral());
      }
    });
  }

  showViewer() {
    this.getData().pipe(take(1)).subscribe((data: IGeneral) => {
      if (!data) {
        this.store.dispatch(new ShowToast({title: null, message: `There are no data to view.`, type: ToastTypes.INFO}));
      } else {
        this.store.dispatch(new ShowViewerHrReboardGeneral());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.getData().pipe(take(1)).subscribe((data: IGeneral) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `There are no data awaiting approval. No record to delete.`, type: ToastTypes.INFO}));
      } else {
        this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteAwaitingApprovalDataGeneral({ recordId: data.ess_emp_id }));
          }
        });
        // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`)
        // .pipe(take(1)).subscribe((command: string) => {
        //     if (command === DialogBoxCommandTypes.COMMAND1) {
        //       this.store.dispatch(new DeleteAwaitingApprovalDataGeneral({recordId: data.ess_emp_id}));
        //     }
        //   });
      }
    });
  }

  getData(): Observable<IGeneral> {
    return this.store.pipe(take(1), select(getHrReboardGeneralData));
  }

  refreshData(employeeId) {
    this.store.dispatch(new LoadDataHrReboardGeneral({employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Personal Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
