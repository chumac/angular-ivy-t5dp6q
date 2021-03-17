import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastTypes } from '@nutela/shared/app-global';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { DeleteEventSchedule, getEventHallData, getEventScheduleData, isLoadingEventSchedule, LoadEventHallData, LoadEventScheduleData, ShowEventScheduleEditor, showEventScheduleEditor, showEventScheduleView, ShowEventScheduleView } from 'libs/feature-module-ui/talent/learning-ui/src/store/setups/event-detail-data/Schedule';
import { IEventHall } from 'libs/models/talent/learning/src/lib/interfaces/event-hall.interface';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ScheduleEditorComponent } from '../../event-detail-common-part/schedule/schedule-editor/schedule-editor.component';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'x365-fm-talent-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  eventScheduleData$: Observable<IEventSchedule[]>;
  eventHallData$: Observable<IEventHall[]>;
  isLoading$: Observable<boolean>;
  showEventScheduleEditor$: Observable<boolean>;
  showEventScheduleView$: Observable<boolean>;
  dropDownFilterValue: string;


  @Input() eventDetailId: number;
  @Input() isReview: number;

  subscribe: any;

  @ViewChild("eventScheduleDataGrid") eventScheduleDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("eventSchedulerEditor") eventSchedulerEditor: ScheduleEditorComponent;
  @ViewChild("eventSchedulerView") eventSchedulerView: ScheduleViewComponent;

  constructor(
    public service: ScheduleService,
    private store: Store<IAppState>,
    private dialogBoxService: DialogBoxService,
    private router: Router) {

  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingEventSchedule));
    this.eventScheduleData$ = this.store.pipe(select(getEventScheduleData));
    this.eventHallData$ = this.store.pipe(select(getEventHallData));
    this.showEventScheduleEditor$ = this.store.pipe(select(showEventScheduleEditor));
    this.showEventScheduleView$ = this.store.pipe(select(showEventScheduleView));
  }

  storeDispatches() {
    this.store.dispatch(new LoadEventScheduleData(this.eventDetailId));
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

    if (this.eventScheduleDataGrid) {
      this.service.search(
        this.eventScheduleDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onEditIconClicked(rowId: number) {
    this.eventSchedulerEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.eventSchedulerEditor.data = result;
        this.eventSchedulerEditor.reset();
        this.store.dispatch(new LoadEventHallData())
        this.store.dispatch(new ShowEventScheduleEditor());
      }
      );
  }

  getRowData$(rowId: number): Observable<IEventSchedule> {
    return this.eventScheduleData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId) {
    this.eventSchedulerView.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.eventSchedulerView.data = result;
        this.store.dispatch(new ShowEventScheduleView());
      }
      );
  }

  onDeleteIconClicked(row_id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteEventSchedule({ schedule_id: row_id,eventId : this.eventDetailId }));
          // this.store.dispatch(new LoadEventScheduleData(this.eventDetailId));
        }
      });
  }

}
