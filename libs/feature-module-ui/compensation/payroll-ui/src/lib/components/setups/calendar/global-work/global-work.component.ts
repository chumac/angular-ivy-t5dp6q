import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ShowToast } from '@nutela/store/shared';
import { Location } from '@angular/common';
import { isProcessingCalendar, isLoadingCalendar, LoadingCalendar, LoadDataCalendar, showEditorCalendar, ShowEditorCalendar, HideEditorCalendar, getCalendarGlobal, showViewerCalendar, ShowViewerCalendar, HideViewerCalendar } from '../../../../store/calendar';
import { ToastTypes } from '@nutela/shared/app-global';
import { select, Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { IRootState } from '../../../../store/root';
import { Title } from '@angular/platform-browser';
import { CalendarEditorComponent } from '../calendar-editor/calendar-editor.component';
import { CalendarViewerComponent } from '../calendar-viewer/calendar-viewer.component';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { ICalendar } from '@nutela/models/compensation/payroll';
import { ProfileCalendarService } from './global-work.service';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'x365-fm-payrl-calendar-global-work',
  templateUrl: './global-work.component.html',
  styleUrls: ['./global-work.component.scss'],
  providers: [ProfileCalendarService]
})
export class GlobalWorkComponent implements OnInit {
  calendarData$: Observable<ICalendar[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  payrollProfileId: number;

  @ViewChild('editor') editor: CalendarEditorComponent;
  @ViewChild('editor') viewer: CalendarViewerComponent;
  @ViewChild('calendar') calendar: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IRootState>,
    private location: Location,
    public profileCalendarService:ProfileCalendarService,
  ) {
    titleService.setTitle(`${'Global Calendar'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
     this.store.dispatch(new LoadingCalendar())
    this.store.dispatch(new LoadDataCalendar({workType: 'global'}));
   }

  storeSelects() {
    this.calendarData$ = this.store.pipe(select(getCalendarGlobal));
    this.isLoading$ = this.store.pipe(select(isLoadingCalendar));
    this.isProcessing$ = this.store.pipe(select(isProcessingCalendar));
    this.showEditor$ = this.store.pipe(select(showEditorCalendar))
    this.showViewer$ = this.store.pipe(select(showViewerCalendar))
  }

  getRowData$(rowId: number): Observable<ICalendar> {
    return this.calendarData$.pipe(
      map(d => d.filter(v => v.calendar_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(val => {
      this.editor.data = val;
      this.editor.reset();
      this.store.dispatch(new ShowEditorCalendar());
  })

}

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerCalendar());
      }
      );
  }


  onAdd() {
    this.store.dispatch(new ShowEditorCalendar());
  }

onRefresh(){
  this.storeDispatches();
this.store.dispatch(new ShowToast({title: null, message: ` Calendar data is being refreshed.`, type: ToastTypes.INFO}));
}

goBack(){
  this.location.back();
}

onCancelEditor(){
 this.store.dispatch(new HideEditorCalendar());
}

onCancelViewer(){
 this.store.dispatch(new HideViewerCalendar());
}

search() {


}

}

