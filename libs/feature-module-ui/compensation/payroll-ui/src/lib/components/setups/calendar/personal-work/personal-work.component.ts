import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ShowToast } from '@nutela/store/shared';
import { Location } from '@angular/common';
import { isProcessingCalendar, isLoadingCalendar, LoadingCalendar, getCalendarEmployee, LoadDataCalendar, showEditorCalendar, ShowEditorCalendar, HideEditorCalendar, showViewerCalendar, ShowViewerCalendar, HideViewerCalendar } from '../../../../store/calendar';
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
import { PersonalWorkService } from './personal-work.service';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';

@Component({
  selector: 'x365-fm-payrl-calendar-personal-work',
  templateUrl: './personal-work.component.html',
  styleUrls: ['./personal-work.component.scss'],
  providers: [PersonalWorkService]
})
export class PersonalWorkComponent implements OnInit {
  calendarData$: Observable<ICalendar[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;

  payrollProfileId: number;

  @ViewChild('editor') editor: CalendarEditorComponent;
  @ViewChild('viewer') viewer: CalendarViewerComponent;
  @ViewChild('calendar') calendar: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IRootState>,
    private location: Location,
    public PersonalWorkService:PersonalWorkService,
  ) {
    titleService.setTitle(`${'Employee Calendar'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
     this.store.dispatch(new LoadingCalendar())
     this.store.dispatch(new LoadDataCalendar({ workType: 'personal' }));
   }

  storeSelects() {
    this.calendarData$ = this.store.pipe(select(getCalendarEmployee));
    this.isLoading$ = this.store.pipe(select(isLoadingCalendar));
    this.isProcessing$ = this.store.pipe(select(isProcessingCalendar));
    this.showEditor$ = this.store.pipe(select(showEditorCalendar))
    this.showViewer$ = this.store.pipe(select(showViewerCalendar))
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
  }

  getRowData$(rowId: number): Observable<ICalendar> {
    return this.calendarData$.pipe(
      map(d => d.filter(v => v.calendar_id === rowId)),
      map(e => e.shift()))
  }

  onAdd(){
    this.store.dispatch(new ShowEditorCalendar());
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

