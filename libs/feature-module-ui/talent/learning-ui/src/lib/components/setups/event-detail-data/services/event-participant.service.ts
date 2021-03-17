import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IEventParticipants } from "@nutela/models/talent/learning";
import { ToastTypes } from "@nutela/shared/app-global";
import { HrzCommandTypes } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { LoadEventParticipantCriteriaKeyData, LoadEventParticipantEmployee, LoadEventParticipantSchedule, LoadEventParticipantsData, LoadEventParticipantSource, ShowEventParticipantCriteria, ShowEventParticipantsEditor } from "libs/feature-module-ui/talent/learning-ui/src/store";

@Injectable({
    providedIn: 'root'
})
export class EventParticipantService {

    constructor(private store: Store<IEventParticipants>) { }

    commandProcessor(command: HrzCommandTypes, eventDetailId: number) {
        switch (command) {
            case HrzCommandTypes.ADD: {
                this.showEditor(eventDetailId);
                break;
            }
            case HrzCommandTypes.REFRESH: {
                this.refreshData(eventDetailId);
                break;
            }
            case HrzCommandTypes.PARTICIPANT_WITH_CRITERIA: {
                this.participantCriteria(eventDetailId);
                break;
            }
            default:
                break;
        }
    }

    showEditor(eventDetailId: number) {
        this.store.dispatch(new LoadEventParticipantSource())
        this.store.dispatch(new LoadEventParticipantEmployee())
        this.store.dispatch(new LoadEventParticipantSchedule(eventDetailId))
        this.store.dispatch(new ShowEventParticipantsEditor());
    }

    refreshData(eventDetailId: number) {
        this.store.dispatch(new LoadEventParticipantsData(eventDetailId));
        this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
    }

    participantCriteria(eventDetailId: number) {
        this.store.dispatch(new LoadEventParticipantCriteriaKeyData());
        this.store.dispatch(new ShowEventParticipantCriteria());
    }
}
