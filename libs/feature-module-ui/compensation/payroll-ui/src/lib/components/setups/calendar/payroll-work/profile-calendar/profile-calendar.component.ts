import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ShowToast } from '@nutela/store/shared';
import { Location } from '@angular/common';
import { isProcessingCalendar, isLoadingCalendar, LoadingCalendar, getSingleCalendar, LoadSingleCalendar, showEditorProfileCalendar, ResetProfileCalendar, ShowEditorProfileCalendar, HideEditorProfileCalendar, ProcessingCalendar } from '../../../../../store/calendar';
import { ToastTypes } from '@nutela/shared/app-global';
import { select, Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { IRootState } from '../../../../../store/root';
import { Title } from '@angular/platform-browser';
import { ProfileCalendarEditorComponent } from './profile-calendar-editor/profile-calendar-editor.component';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { IProfileCalendar } from '@nutela/models/compensation/payroll';
import { ProfileCalendarService } from './profile-calendar.service';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'x365-fm-payrl-profile-calendar',
  templateUrl: './profile-calendar.component.html',
  styleUrls: ['./profile-calendar.component.scss'],
  providers: [ProfileCalendarService]
})
export class ProfileCalendarComponent implements OnInit {
  profileCalendar$: Observable<IProfileCalendar[]>;
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  payrollProfileId: number;

  @ViewChild('editor') editor: ProfileCalendarEditorComponent;
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
    titleService.setTitle(`${'Calendar'}${this.partialDocumentTitle}`)
    this.route.params.subscribe(v => {
      this.payrollProfileId = v.id;
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
     this.store.dispatch(new LoadingCalendar())
    this.store.dispatch(new LoadSingleCalendar({calendarId: this.payrollProfileId}));
   }

  storeSelects() {
    this.profileCalendar$ = this.store.pipe(select(getSingleCalendar));
    this.isLoading$ = this.store.pipe(select(isLoadingCalendar));
    this.isProcessing$ = this.store.pipe(select(isProcessingCalendar));
    this.showEditor$ = this.store.pipe(select(showEditorProfileCalendar))
  }

  getRowData$(rowId: number): Observable<IProfileCalendar> {
    return this.profileCalendar$.pipe(
      map(d => d.filter(v => v.calendar_id === rowId)),
      map(e => e.shift()))
  }

  onReset(){
    this.store.dispatch(new ProcessingCalendar());
    this.store.dispatch(new ResetProfileCalendar({payrollProfileId: this.payrollProfileId}));
  }

  onEditIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(val => {
      this.editor.data = val;
      this.editor.reset();
      this.store.dispatch(new ShowEditorProfileCalendar());
  })

}

onRefresh(){
  this.storeDispatches();
this.store.dispatch(new ShowToast({title: null, message: ` Calendar data is being refreshed.`, type: ToastTypes.INFO}));
}

goBack(){
  this.location.back();
}

onCancelEditor(){
 this.store.dispatch(new HideEditorProfileCalendar());
}

search() {


}

}

