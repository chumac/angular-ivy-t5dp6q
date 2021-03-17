import { Component, OnInit, ViewChild, ElementRef, Inject, EventEmitter, Output } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { DxLookupComponent } from 'devextreme-angular';
import { ISchedule, IScheduleKnownType, IPayDesk, ICurrency, IPayrollProfile } from '@nutela/models/compensation/payment';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { CompletedService } from './completed.service';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../store/root';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ISubscriptions } from '@nutela/models/common';
import { ScheduleViewerComponent } from '../schedule-viewer/schedule-viewer.component';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { getCompletedScheduleData, LoadDataCompletedSchedule, isLoadingCompletedSchedule, showCompletedScheduleViewer, LoadingDataCompletedSchedule, ArchiveCompletedSchedule, HideViewerCompletedSchedule, ShowViewerCompletedSchedule } from '../../store/completed';

@Component({
  selector: 'x365-fm-cmp-payment-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
  providers: [CompletedService]
})
export class CompletedComponent implements OnInit {

  private subscriptions: ISubscriptions = {};
  hasPayrollProfile: boolean;
  isSubmitted: boolean = false;

  @ViewChild("completedDataGrid") completedDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: DxLookupComponent;
  @ViewChild('viewer') viewer: ScheduleViewerComponent;

  @Output() showForm = new EventEmitter<any>();

  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isSaving$: Observable<boolean>;
  allScheduleData$: Observable<ISchedule[]>;
  completedData$: Observable<ISchedule[]>;
  awaitingApprovalData$: Observable<ISchedule[]>;
  payDeskSelectOption$: Observable<IPayDesk[]>;
  paymentSourceSelectOption$: Observable<IScheduleKnownType[]>;
  currencySelectOption$: Observable<ICurrency[]>;
  payrollProfileSelectOption$: Observable<IPayrollProfile[]>;
  payrollSourceSelectOption$: Observable<IScheduleKnownType[]>;
  accountTypeSelectOption$: Observable<IScheduleKnownType[]>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: CompletedService, private store: Store<IRootState>, private route: Router, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Payment Schedule'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  showModal() {
  }

  storeSelects() {
    this.completedData$ = this.store.pipe(select(getCompletedScheduleData));
    this.isLoading$ = this.store.pipe(select(isLoadingCompletedSchedule));
    this.showViewer$ = this.store.pipe(select(showCompletedScheduleViewer));
  };

  storeDispatches() {
    this.store.dispatch(new LoadingDataCompletedSchedule());
    this.store.dispatch(new LoadDataCompletedSchedule());
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

    if (this.completedDataGrid) {
      this.service.search(this.completedDataGrid, searchString, filterBy);
    };
  };

  onRefresh() {
    this.store.dispatch(new LoadDataCompletedSchedule());
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));

  };

  getRowData$(rowId: number): Observable<ISchedule> {
    return this.completedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  };

  onViewDetailIconClicked(rowID: number) {
    this.route.navigate([`${STANDARD_ROUTES.scheduleDetail}/${rowID}`]);
  };

  onViewIconClicked(rowID: number) {
    this.viewer.data = null;
    this.getRowData$(rowID).pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCompletedSchedule());
        }
      });
  };

  onAbandonIconClicked(rowID: number) {
    this.dialogBoxService.show(`Are you sure you want to Archive this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new LoadingDataCompletedSchedule());
          this.store.dispatch(new ArchiveCompletedSchedule({ recordId: rowID }));
        }
      });
  };

  onCancelViewer() {
    this.store.dispatch(new HideViewerCompletedSchedule());
  };
}
