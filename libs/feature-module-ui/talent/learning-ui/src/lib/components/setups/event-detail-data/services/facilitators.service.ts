import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { IEventDetailFacilitators } from "@nutela/models/talent/learning";
import { LoadDataFacilitators, ShowEditorFacilitators } from "libs/feature-module-ui/talent/learning-ui/src/store";

@Injectable({
  providedIn: 'root'
})
export class FacilitatorsService {


  constructor(private store: Store<IEventDetailFacilitators>) {}

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
    this.store.dispatch(new ShowEditorFacilitators());
  }

  refreshData(eventDetailId: number) {
    this.store.dispatch(new LoadDataFacilitators({recordId: eventDetailId}));
    this.store.dispatch(new ShowToast({title: null, message: `Facilitators data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
