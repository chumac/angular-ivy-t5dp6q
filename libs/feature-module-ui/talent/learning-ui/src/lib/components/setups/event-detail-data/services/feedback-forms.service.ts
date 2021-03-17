import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { IEventDetailFeedbackForms } from "@nutela/models/talent/learning";
import { LoadDataFeedbackForms, ShowEditorFeedbackForms } from "libs/feature-module-ui/talent/learning-ui/src/store";

@Injectable({
  providedIn: 'root'
})
export class FeedbackFormsService {


  constructor(private store: Store<IEventDetailFeedbackForms>) {}

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
    this.store.dispatch(new ShowEditorFeedbackForms());
  }

  refreshData(eventDetailId: number) {
    this.store.dispatch(new LoadDataFeedbackForms({recordId: eventDetailId}));
    this.store.dispatch(new ShowToast({title: null, message: `Feedback Forms data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
