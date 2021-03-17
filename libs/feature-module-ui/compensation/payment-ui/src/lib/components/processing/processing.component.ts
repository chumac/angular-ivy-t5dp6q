import { Component, OnInit, ViewChild, ElementRef, Inject, EventEmitter, Output } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { DxLookupComponent } from 'devextreme-angular';
import { ISchedule, IScheduleKnownType, IPayDesk, ICurrency, IPayrollProfile } from '@nutela/models/compensation/payment';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ProcessingService } from './processing.service';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../store/root';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ISubscriptions } from '@nutela/models/common';
import { ScheduleViewerComponent } from '../schedule-viewer/schedule-viewer.component';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { isLoadingProcessingSchedule, LoadingDataProcessingSchedule, LoadDataProcessingSchedule, getProcessingScheduleData, showProcessingScheduleViewer, ShowViewerProcessingSchedule, HideViewerProcessingSchedule, getAwaitingApprovalData, LoadDataAwaitingApproval, ArchiveProcessingSchedule } from '../../store/processing';

@Component({
  selector: 'x365-fm-cmp-payment-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
  providers: [ProcessingService]
})
export class ProcessingComponent implements OnInit {

  private subscriptions: ISubscriptions = {};
  hasPayrollProfile: boolean;
  isSubmitted: boolean = false;

  @ViewChild("processingDataGrid") processingDataGrid: IgxGridComponent;
  @ViewChild("awaitingApprovalDataGrid") awaitingApprovalDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: DxLookupComponent;
  @ViewChild('viewer') viewer: ScheduleViewerComponent;


  @Output() showForm = new EventEmitter<any>();

  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  processingData$: Observable<ISchedule[]>;
  awaitingApprovalData$: Observable<ISchedule[]>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: ProcessingService, private store: Store<IRootState>, private route: Router, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Processing Schedule'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  showModal() {
  }

  storeSelects() {
    this.processingData$ = this.store.pipe(select(getProcessingScheduleData));
    this.awaitingApprovalData$ = this.store.pipe(select(getAwaitingApprovalData));
    this.isLoading$ = this.store.pipe(select(isLoadingProcessingSchedule));
    this.showViewer$ = this.store.pipe(select(showProcessingScheduleViewer));
  };

  storeDispatches() {
    this.store.dispatch(new LoadingDataProcessingSchedule());
    this.store.dispatch(new LoadDataProcessingSchedule());
    this.store.dispatch(new LoadDataAwaitingApproval());
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

    if (this.processingDataGrid) {
      this.service.search(this.processingDataGrid, searchString, filterBy);
    } else if (this.awaitingApprovalDataGrid) {
      this.service.search(this.awaitingApprovalDataGrid, searchString, filterBy);
    };
  };

  onRefresh() {
    this.store.dispatch(new LoadDataProcessingSchedule());
    this.store.dispatch(new LoadDataAwaitingApproval());
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  };

  getRowData$(rowId: number): Observable<ISchedule> {
    return this.processingData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  };

  getAwaitingRowData$(rowId: number): Observable<ISchedule> {
    return this.awaitingApprovalData$.pipe(
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
          this.viewer.hasPayrollProfile = (result.payroll_profile_id !== null);
          this.viewer.isSubmitted = (result.approval_status >= 1 && result.status >= 2);
          this.store.dispatch(new ShowViewerProcessingSchedule());
        }
      });
  };

  onViewAwaitingIconClicked(rowID: number) {
    this.viewer.data = null;
    this.getAwaitingRowData$(rowID).pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.viewer.data = result;
          this.viewer.hasPayrollProfile = (result.payroll_profile_id !== null);
          this.viewer.isSubmitted = (result.approval_status >= 1 && result.status >= 2);
          this.store.dispatch(new ShowViewerProcessingSchedule());
        }
      });
  };

  onAbandonIconClicked(rowID: number) {
    this.dialogBoxService.show(`Are you sure you want to Archive this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new LoadingDataProcessingSchedule());
          this.store.dispatch(new ArchiveProcessingSchedule({ recordId: rowID }));
        }
      });
  };

  onCancelViewer() {
    this.store.dispatch(new HideViewerProcessingSchedule());
  };

}
