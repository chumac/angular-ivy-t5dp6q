import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ICalendar, IProfile } from '@nutela/models/compensation/payroll';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { IgxGridComponent } from 'igniteui-angular';
import { LoadingCalendar, getCalendar, isLoadingCalendar, showEditorCalendar, getPayrollProfilesCalendar, LoadPayrollProfilesCalendar } from '../../../../store/calendar';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PayrollWorkService } from './payroll-work.service';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-payrl-calendar-payroll-work',
  templateUrl: './payroll-work.component.html',
  styleUrls: ['./payroll-work.component.scss'],
  providers: [PayrollWorkService]
})
export class CalendarComponent implements OnInit {
  calendarData$: Observable<ICalendar[]>;
  payrollProfiles$: Observable<IProfile[]>;
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('calendarGrid') calendarGrid: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private router: Router,
    public payrollWorkService: PayrollWorkService,
    private store: Store<IRootState>,
  ) {
    titleService.setTitle(`${'Payroll Profiles Calendar'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
     this.store.dispatch(new LoadPayrollProfilesCalendar());
    this.store.dispatch(new LoadingCalendar())
   }

  storeSelects() {
    this.payrollProfiles$ = this.store.pipe(select(getPayrollProfilesCalendar));
    this.calendarData$ = this.store.pipe(select(getCalendar));
    this.isLoading$ = this.store.pipe(select(isLoadingCalendar));
    this.showEditor$ = this.store.pipe(select(showEditorCalendar))
  }


// onAdd(){
// this.store.dispatch(new ShowEditorCalendar());
// }


onViewCalendarIconClicked(rowId: number){
// this.router.navigate([`${STANDARD_ROUTES.notification}`])
  this.router.navigate([`${STANDARD_ROUTES.profileCalendar}/${rowId}`])
}

onRefresh(){
this.storeDispatches()
this.store.dispatch(new ShowToast({title: null, message: ` Profile data is being refreshed.`, type: ToastTypes.INFO}));
}

search() {
  let filterBy: string = '';
  const searchString = this.searchInput.nativeElement.value;

  if (this.filterBy) {
    filterBy = <string>this.filterBy.value;
  }

  if (this.calendarGrid) {
    this.payrollWorkService.search(this.calendarGrid, searchString, filterBy);
  }
}


}

