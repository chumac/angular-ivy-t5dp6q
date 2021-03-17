import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { IgxGridComponent } from 'igniteui-angular';
import { DeleteEventParticipant, getEventParticipantEmployeeData, getEventParticipantScheduleData, getEventParticipantsData, getEventParticipantSourceData, ILearningState, isLoadingEventParticipants, LoadEventParticipantEmployee, LoadEventParticipantSchedule, LoadEventParticipantsData, LoadEventParticipantSource, ShowEventParticipantsEditor, showEventParticipantsEditor, showEventParticipantsView, ShowEventParticipantsView } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { IEventParticiantEmployee, IEventParticiantSchedule, IEventParticiantSource, IEventParticipants } from 'libs/models/talent/learning/src/lib/interfaces/event-participants.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EventDetailParticipantsEditorComponent } from './event-detail-participants-editor/event-detail-participants-editor.component';
import { EventDetailParticipantsViewComponent } from './event-detail-participants-view/event-detail-participants-view.component';
import { EventParticipantsService } from './event-detail-participants.service';

@Component({
  selector: 'x365-fm-talent-event-detail-participants',
  templateUrl: './event-detail-participants.component.html',
  styleUrls: ['./event-detail-participants.component.scss']
})
export class EventDetailParticipantsComponent implements OnInit {

  eventParticipantData$: Observable<IEventParticipants[]>;
  eventParticipantSource$: Observable<IEventParticiantSource[]>;
  eventParticipantEmployee$: Observable<IEventParticiantEmployee[]>;
  eventParticipantSchedule$: Observable<IEventParticiantSchedule[]>;
  dropDownFilterValue: string;
  isLoading$: Observable<boolean>;
  showEventParticipantsEditor$: Observable<boolean>;
  showEventParticipantsView$: Observable<boolean>;

  @Input() eventDetailId: number;
  @Input() isReview: number;

  subscribe: any;

  @ViewChild("eventParticipantDataGrid") eventParticipantDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("eventParticipantsEditor") eventParticipantsEditor: EventDetailParticipantsEditorComponent;
  @ViewChild("eventParticipantsView") eventParticipantsView: EventDetailParticipantsViewComponent;

  constructor(
    public service: EventParticipantsService,
    private store: Store<ILearningState>,
    private dialogBoxService: DialogBoxService,
    private router: Router) {

  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingEventParticipants));
    this.eventParticipantData$ = this.store.pipe(select(getEventParticipantsData));
    this.eventParticipantSource$ = this.store.pipe(select(getEventParticipantSourceData));
    this.eventParticipantEmployee$ = this.store.pipe(select(getEventParticipantEmployeeData));
    this.eventParticipantSchedule$ = this.store.pipe(select(getEventParticipantScheduleData));
    this.showEventParticipantsEditor$ = this.store.pipe(select(showEventParticipantsEditor));
    this.showEventParticipantsView$ = this.store.pipe(select(showEventParticipantsView));
  }

  storeDispatches() {
    this.store.dispatch(new LoadEventParticipantsData(this.eventDetailId));
  }

  onEditIconClicked(rowId: number) {
    this.eventParticipantsEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.eventParticipantsEditor.data = result;
        this.eventParticipantsEditor.reset();
        this.store.dispatch(new LoadEventParticipantSource())
        this.store.dispatch(new LoadEventParticipantEmployee())
        this.store.dispatch(new LoadEventParticipantSchedule(this.eventDetailId))
        this.store.dispatch(new ShowEventParticipantsEditor());
      }
      );
  }

  getRowData$(rowId: number): Observable<IEventParticipants> {
    return this.eventParticipantData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId) {
    this.eventParticipantsView.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.eventParticipantsView.data = result;
        this.store.dispatch(new ShowEventParticipantsView());
      }
      );
  }

  onDeleteIconClicked(row_id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteEventParticipant({ id: row_id,eventId : this.eventDetailId }));
        }
      });
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.eventParticipantDataGrid) {
      this.service.search(
        this.eventParticipantDataGrid,
        searchString,
        filterBy
      );
    }
  }

}
