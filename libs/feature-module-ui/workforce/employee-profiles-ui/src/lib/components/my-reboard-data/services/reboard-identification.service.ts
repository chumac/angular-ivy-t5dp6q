import { Injectable } from "@angular/core";

import { isUndefined } from 'util';
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { IIdentification } from "@nutela/models/workforce/employee-profiles";
import { HrzCommandTypes, DialogBoxCommandTypes, DialogService, DialogBoxModes } from "@nutela/shared/ui";
import { ShowEditorIdentification, ShowViewerIdentification, getIdentificationAwaitingApprovalData, DeleteAwaitingApprovalDataIdentification, showEditor, LoadApprovedDataIdentification, LoadAwaitingApprovalDataIdentification, LoadSignatureImage } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from "@nutela/store/shared";
import { IAppState } from "@nutela/store/app-state";
import { take } from "rxjs/internal/operators/take";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowEditorReboardIdentification, LoadDataReboardIdentification, LoadSignatureImageReboardIdentification, getReboardIdentificationData, ShowViewerReboardIdentification } from "../../../store/my-reboard-data";

@Injectable()
export class ReboardIdentificationService {

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
      case HrzCommandTypes.REFRESH: {
        this.refreshData();
        break;
      }
      default:
        break;
    }
  }

  showEditor() {
    this.store.dispatch(new ShowEditorReboardIdentification());
  }

  showViewer() {
    this.getData().pipe(take(1)).subscribe((data: IIdentification) => {
      if (!data) {
        this.store.dispatch(new ShowToast({ title: null, message: `You don't have data to view.`, type: ToastTypes.INFO }));
      } else {
        this.store.dispatch(new ShowViewerReboardIdentification());
      }
    });
  }

  getData(): Observable<IIdentification> {
    return this.store.pipe(take(1), select(getReboardIdentificationData));
  }

  refreshData() {
    this.store.dispatch(new LoadDataReboardIdentification());
    this.store.dispatch(new LoadSignatureImageReboardIdentification());
    this.store.dispatch(new ShowToast({title: null, message: `Identification Information data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
