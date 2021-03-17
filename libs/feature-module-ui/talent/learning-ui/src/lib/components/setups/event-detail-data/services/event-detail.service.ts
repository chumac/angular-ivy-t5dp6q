import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { IEventDetailData } from "@nutela/models/talent/learning";
import { GetDataEventDetail } from "libs/feature-module-ui/talent/learning-ui/src/store";

@Injectable({
  providedIn: 'root'
})
export class EventDetailService {


  constructor(private store: Store<IEventDetailData>) {}

  commandProcessor(command: HrzCommandTypes, eventDetailId: number) {
    switch (command) {
      case HrzCommandTypes.REFRESH: {
        this.refreshData(eventDetailId);
        break;
      }
      default:
        break;
    }
  }

  refreshData(eventDetailId: number) {
    this.store.dispatch(new GetDataEventDetail({ recordId: eventDetailId }));
    this.store.dispatch(new ShowToast({title: null, message: `Event Detail data is being refreshed.`, type: ToastTypes.INFO}));
  }
}
