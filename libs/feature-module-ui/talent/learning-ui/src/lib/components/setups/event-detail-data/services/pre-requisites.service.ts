import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { IEventDetailPreRequisites } from "@nutela/models/talent/learning";
import { LoadDataPreRequisites, ShowEditorPreRequisites } from "libs/feature-module-ui/talent/learning-ui/src/store";

@Injectable({
  providedIn: 'root'
})
export class PreRequisitesService {


  constructor(private store: Store<IEventDetailPreRequisites>) {}

  commandProcessor(command: HrzCommandTypes, eventDetailId: number) {
    switch (command) {
      case HrzCommandTypes.ADD: {
        this.showEditor();
        break;
      }
      case HrzCommandTypes.REFRESH: {
        this.refreshData(eventDetailId);
        break;
      }
      default:
        break;
    }
  }

  showEditor() {
    this.store.dispatch(new ShowEditorPreRequisites());
  }

  refreshData(eventDetailId: number) {
    this.store.dispatch(new LoadDataPreRequisites({recordId: eventDetailId}));
    this.store.dispatch(new ShowToast({title: null, message: `Pre Requisites data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
