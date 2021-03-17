import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ToastTypes } from "@nutela/shared/app-global";
import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { LoadEventHallData, LoadEventScheduleData, ShowEditorPreRequisites, ShowEventScheduleEditor } from "libs/feature-module-ui/talent/learning-ui/src/store";
import { IEventSchedule } from "libs/models/talent/learning/src/lib/interfaces/schedule.interface";

@Injectable({
  providedIn: 'root'
})
export class EventScheduleService {

  constructor(private store: Store<IEventSchedule>) {}

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
    this.store.dispatch(new LoadEventHallData());
    this.store.dispatch(new ShowEventScheduleEditor());
  }

  refreshData(eventDetailId: number) {
    this.store.dispatch(new LoadEventScheduleData(eventDetailId));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }
}
