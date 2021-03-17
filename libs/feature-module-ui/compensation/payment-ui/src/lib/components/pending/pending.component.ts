import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { Title } from '@angular/platform-browser';
import { PendingService } from './pending.service';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../store/root';
import { ICurrency, ISchedule, IPayDesk, IScheduleKnownType, IPayrollProfile } from '@nutela/models/compensation/payment';
import { map, take } from 'rxjs/operators';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { DxLookupComponent } from 'devextreme-angular';
import { ISubscriptions } from '@nutela/models/common';
import { ScheduleViewerComponent } from '../schedule-viewer/schedule-viewer.component';
import { IgxGridComponent } from 'igniteui-angular';
import { Router } from '@angular/router';
import { getNewScheduleData, getAwaitingSubmissionScheduleData, isLoadingPendingSchedule, showPendingScheduleEditor, showPendingScheduleViewer, getPaymentPlatformData, getPaymentSourceData, getCurrencyData, getPayrollProfileData, getPayrollSourceData, getAccountTypeData, LoadDataNewSchedule, LoadAwaitingSubmissionDataSchedule, LoadPaymentPlatformDataPendingSchedule, LoadCurrencyDataPendingSchedule, LoadPaymentSourceDataPendingSchedule, LoadPayrollProfileDataPendingSchedule, LoadPayrollSourceDataPendingSchedule, LoadAccountTypeDataPendingSchedule, LoadingDataPendingSchedule, ShowEditorPendingSchedule, DeletePendingSchedule, ShowViewerPendingSchedule, NotProcessingDataPendingSchedule, ArchivePendingSchedule, SubmitPendingSchedule, HideEditorPendingSchedule, HideViewerPendingSchedule, SubmittingDataPendingSchedule, isSubmittingPendingSchedule, ValidateRecordPendingSchedule } from '../../store/pending';
import { PendingEditorComponent } from './pending-editor/pending-editor.component';


@Component({
  selector: 'x365-fm-cmp-payment-schedule-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
  providers: [PendingService]
})
export class PendingComponent implements OnInit, OnDestroy {

  private subscriptions: ISubscriptions = {};

  showEditor$: Observable<boolean>;
  detailsExist$: Observable<boolean>;
  isProcessingDataGrid$: Observable<boolean>;
  isProcessingLoadObjectives$: Observable<boolean>;
  isSubmitting$: Observable<boolean>;
  isValidating$: Observable<boolean>;
  newScheduleData$: Observable<ISchedule[]>;
  awaitingSubmissionData$: Observable<ISchedule[]>;
  isLoading$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  payDeskSelectOption$: Observable<IPayDesk[]>;
  paymentSourceSelectOption$: Observable<IScheduleKnownType[]>;
  currencySelectOption$: Observable<ICurrency[]>;
  payrollProfileSelectOption$: Observable<IPayrollProfile[]>;
  payrollSourceSelectOption$: Observable<IScheduleKnownType[]>;
  accountTypeSelectOption$: Observable<IScheduleKnownType[]>;

  @ViewChild('editor') editor: PendingEditorComponent;
  @ViewChild('viewer') viewer: ScheduleViewerComponent;
  @ViewChild('file') file: ElementRef;
  @ViewChild("newDataGrid") newDataGrid: IgxGridComponent;
  @ViewChild("awaitingSubmissionDataGrid") awaitingSubmissionDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: DxLookupComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: PendingService, private store: Store<IRootState>, private dialogBoxService: DialogBoxService, private route: Router) {
    titleService.setTitle(
      `${'Payment Schedule'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.newScheduleData$ = this.store.pipe(select(getNewScheduleData))
    this.awaitingSubmissionData$ = this.store.pipe(select(getAwaitingSubmissionScheduleData))
    this.isLoading$ = this.store.pipe(select(isLoadingPendingSchedule));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingPendingSchedule));
    this.showEditor$ = this.store.pipe(select(showPendingScheduleEditor));
    this.showViewer$ = this.store.pipe(select(showPendingScheduleViewer));
    this.payDeskSelectOption$ = this.store.pipe(select(getPaymentPlatformData));
    this.paymentSourceSelectOption$ = this.store.pipe(select(getPaymentSourceData));
    this.currencySelectOption$ = this.store.pipe(select(getCurrencyData));
    this.payrollProfileSelectOption$ = this.store.pipe(select(getPayrollProfileData));
    this.payrollSourceSelectOption$ = this.store.pipe(select(getPayrollSourceData));
    this.accountTypeSelectOption$ = this.store.pipe(select(getAccountTypeData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataNewSchedule());
    this.store.dispatch(new LoadAwaitingSubmissionDataSchedule());
    this.store.dispatch(new LoadPaymentPlatformDataPendingSchedule())
    this.store.dispatch(new LoadPaymentSourceDataPendingSchedule())
    this.store.dispatch(new LoadCurrencyDataPendingSchedule())
    this.store.dispatch(new LoadPayrollProfileDataPendingSchedule())
    this.store.dispatch(new LoadPayrollSourceDataPendingSchedule())
    this.store.dispatch(new LoadAccountTypeDataPendingSchedule())
    this.store.dispatch(new LoadingDataPendingSchedule())
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

    if (this.newDataGrid) {
      this.service.search(
        this.newDataGrid,
        searchString,
        filterBy
      );
    } else if (this.awaitingSubmissionDataGrid) {
      this.service.search(this.awaitingSubmissionDataGrid, searchString, filterBy);
    }
  };

  getRowData$(rowId: number): Observable<ISchedule> {
    return this.newScheduleData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingRowData$(rowId: number): Observable<ISchedule> {
    return this.awaitingSubmissionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {
    this.store.dispatch(new ShowEditorPendingSchedule());
  }

  onRefresh() {
    this.store.dispatch(new LoadDataNewSchedule());
    this.store.dispatch(new LoadAwaitingSubmissionDataSchedule());
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));

  }

  recordValidated(rowId: number): boolean {
    let status = false;

    this.subscriptions['status'] = this.getAwaitingRowData$(rowId)
      .pipe(take(1)).subscribe((result) => {
        if (result) {
          status = result.is_validated
        }
      }
      );

    return status;
  };

  onValidateIconClicked(rowID: number) {
    this.dialogBoxService.show(`Are you sure you want to Delete this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new SubmittingDataPendingSchedule());
          this.store.dispatch(new ValidateRecordPendingSchedule({ recordId: rowID }));
        }
      });
  }

  isDeleteableAndUnploaded(rowId: number): boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
      .pipe(take(1)).subscribe((result) => {
        (result.approval_status === 1 && result.status === 0) ? status = true : status = false;
      }
      );

    return status;
  }

  isSubmitable(rowId: number): boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
      .pipe(take(1)).subscribe((result) => {
        (result.approval_status === 1 && result.status === 1) ? status = true : status = false;
      }
      );

    return status;
  }

  isEditable(rowId: number): boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
      .pipe(take(1)).subscribe((result) => {
        if (result.approval_status === 1) {
          (result.status == 0 || result.status == 1) ? status = true : status = false;
        } else {
          status = false;
        }
      }
      );

    return status;
  };

  onDeleteIconClicked(rowID: number) {
    this.dialogBoxService.show(`Are you sure you want to Delete this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new SubmittingDataPendingSchedule());
          this.store.dispatch(new DeletePendingSchedule({ recordId: rowID }));
        }
      });
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorPendingSchedule());
      }
      );
  }


  onViewIconClicked(rowID: number) {
    this.viewer.data = null;
    this.getRowData$(rowID).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerPendingSchedule());
        this.store.dispatch(new NotProcessingDataPendingSchedule());
      }
      );
  }

  onViewAwaitingIconClicked(rowID: number) {
    this.viewer.data = null;
    this.getAwaitingRowData$(rowID).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerPendingSchedule());
        this.store.dispatch(new NotProcessingDataPendingSchedule());
      }
      );
  }



  onViewDetailIconClicked(rowID: number) {
    this.route.navigate([`${STANDARD_ROUTES.scheduleDetail}/${rowID}`]);
  };

  onAbandonIconClicked(rowID: number) {
    this.dialogBoxService.show(`Are you sure you want to Abandon this process?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new SubmittingDataPendingSchedule());
          this.store.dispatch(new ArchivePendingSchedule({ recordId: rowID }));
        }
      });
  };

  onSubmitIconClicked(rowID: number) {
    this.store.dispatch(new SubmittingDataPendingSchedule());
    this.store.dispatch(new SubmitPendingSchedule({ recordId: rowID }))
  };

  onCancelEditor() {
    this.store.dispatch(new HideEditorPendingSchedule());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPendingSchedule());
  }

  ngOnDestroy() {
    // this.store.dispatch(new ResetComponentScheduleDetails());
  }

}
