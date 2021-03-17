import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IGeneral } from "@nutela/models/workforce/employee-profiles";
import { HrzCommandTypes, DialogBoxCommandTypes, DialogService } from "@nutela/shared/ui";
import { ShowEditorGeneral, ShowViewerGeneral, getGeneralAwaitingApprovalData, DeleteAwaitingApprovalDataGeneral, LoadApprovedDataGeneral, LoadAwaitingApprovalDataGeneral } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { IAppState } from "@nutela/store/app-state";
import { take } from "rxjs/internal/operators/take";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorReboardGeneral, LoadDataReboardGeneral, getReboardGeneralData, ShowViewerReboardGeneral } from "../../../store/my-reboard-data";

@Injectable()
export class ReboardPersonalInformationService {

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
    this.store.dispatch(new ShowEditorReboardGeneral());
  }
  // showEditor() {
  //   this.getData().pipe(take(1)).subscribe((data: IGeneral) => {
  //     if (isUndefined(data)) {
  //       this.store.dispatch(new ShowEditorGeneral());
  //     } else {
  //       this.store.dispatch(new ShowToast({title: null, message: `You have data awaiting approval. You must discard pending data before you can update your data again.`, type: ToastTypes.INFO}));
  //     }
  //   });
  // }

  showViewer() {
    this.getData().pipe(take(1)).subscribe((data: IGeneral) => {
      if (!data) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data to view.`, type: ToastTypes.INFO}));
      } else {
        this.store.dispatch(new ShowViewerReboardGeneral());
      }
    });
  }

  deleteAwaitingApprovalData() {
    this.getData().pipe(take(1)).subscribe((data: IGeneral) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowToast({title: null, message: `You don't have data awaiting approval. No record to delete.`, type: ToastTypes.INFO}));
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
    return this.store.pipe(take(1), select(getReboardGeneralData));
  }

  refreshData() {
    this.store.dispatch(new LoadDataReboardGeneral());
    this.store.dispatch(new ShowToast({title: null, message: `Personal Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
