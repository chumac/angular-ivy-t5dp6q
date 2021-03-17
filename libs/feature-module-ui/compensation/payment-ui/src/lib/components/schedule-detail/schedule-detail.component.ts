import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { Title } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { ScheduleDetailService } from './schedule-detail.service';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../store/root';
import { IScheduleDetail, ICurrency, ISchedule } from '@nutela/models/compensation/payment';
import { UploadScheduleDetails, ShowEditorScheduleDetail, showEditorScheduleDetail, HideEditorScheduleDetail, getCurrencyData, getAccountTypeData, LoadCurrencyDataScheduleDetail, LoadAccountTypeDataScheduleDetail, getScheduleDetailData, getSingleScheduleData, isLoadingScheduleDetail, LoadingDataScheduleDetail, isUploadingScheduleDetail, ResetScheduleDetailData, HideViewerScheduleDetail, showViewerScheduleDetail, ShowViewerScheduleDetail, RequeueScheduleDetails, SubmitDataScheduleDetails, ValidatePaymentScheduleDetail, ValidateUploadScheduleDetail, ProcessPayrollScheduleDetails, ProcessingScheduleDetail, isProcessingScheduleDetail, LoadDataByIdSchedule, LoadDataScheduleDetail, SubmittingDataScheduleDetail, ResetingDataScheduleDetail, isValidatingRecordScheduleDetail, isSubmittingScheduleDetail, isRequeueingScheduleDetail, isResetingScheduleDetail, ValidatingRecordScheduleDetail, RequeueingDataScheduleDetail } from '../../store/schedule-details';
import { map, take } from 'rxjs/operators';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ScheduleDetailEditorComponent } from './schedule-detail-editor/schedule-detail-editor.component';
import { ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { DxLookupComponent } from 'devextreme-angular';
import { ScheduleDetailViewerComponent } from './schedule-detail-viewer/schedule-detail-viewer.component';
import { PayEditorComponent } from './pay-editor/pay-editor.component';
import { RouteUtilService } from '@nutela/core-services';

export interface IBreadcrumb {
  label: string;
  url: string;
  params?: any;
};

@Component({
  selector: 'x365-fm-cmp-payment-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss'],
  providers: [ScheduleDetailService]
})
export class ScheduleDetailComponent implements OnInit, OnDestroy {

  scheduleId: number;
  isUploadable: boolean;
  status: number;
  approvalStatus: number;

  showEditor$: Observable<boolean>;
  breadcrumbs: any;
  showViewer$: Observable<boolean>;

  isProcessingDataGrid$: Observable<boolean>;
  isValidatingRecord$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isSubmitting$: Observable<boolean>;
  isReseting$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isRequeueing$: Observable<boolean>;

  scheduleDetailData$: Observable<IScheduleDetail[]>;
  scheduleData$: Observable<ISchedule>;
  accountTypeSelectOption$: Observable<any[]>;
  currencySelectOption$: Observable<ICurrency[]>;

  @ViewChild('editor') editor: ScheduleDetailEditorComponent;
  @ViewChild('payEditor') payEditor: PayEditorComponent;
  @ViewChild('viewer') viewer: ScheduleDetailViewerComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: DxLookupComponent;
  @ViewChild('scheduleDetailDataGrid') scheduleDetailDataGrid: IgxGridComponent;
  @ViewChild('file') file: ElementRef;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: ScheduleDetailService, private store: Store<IRootState>, private dialogBoxService: DialogBoxService, public route: ActivatedRoute, private router: Router, private routeUtil: RouteUtilService) {

    titleService.setTitle(
      `${'Payment Schedule Detail'}${this.partialDocumentTitle}`
    );


  }

  ngOnInit() {
    this.initialize();
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorScheduleDetail));
    this.showViewer$ = this.store.pipe(select(showViewerScheduleDetail));

    this.isLoading$ = this.store.pipe(select(isLoadingScheduleDetail));
    this.isProcessing$ = this.store.pipe(select(isProcessingScheduleDetail));
    this.isProcessingDataGrid$ = this.store.pipe(select(isUploadingScheduleDetail));
    this.isValidatingRecord$ = this.store.pipe(select(isValidatingRecordScheduleDetail));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingScheduleDetail));
    this.isRequeueing$ = this.store.pipe(select(isRequeueingScheduleDetail));
    this.isReseting$ = this.store.pipe(select(isResetingScheduleDetail));

    this.currencySelectOption$ = this.store.pipe(select(getCurrencyData));
    this.accountTypeSelectOption$ = this.store.pipe(select(getAccountTypeData));
    this.scheduleDetailData$ = this.store.pipe(select(getScheduleDetailData));
    this.scheduleData$ = this.store.pipe(select(getSingleScheduleData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataByIdSchedule({ scheduleID: this.scheduleId }));
    this.store.dispatch(new LoadCurrencyDataScheduleDetail());
    this.store.dispatch(new LoadingDataScheduleDetail());
    this.store.dispatch(new LoadAccountTypeDataScheduleDetail());
  }

  initialize() {
    this.assignScheduleId();
    this.storeDispatches();
    this.storeSelects();
    this.getScheduleStatus()
  };

  assignScheduleId() {
    this.route.params.subscribe(v => {
      this.scheduleId = v.id;
    });
  };

  getScheduleStatus() {
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        this.approvalStatus = val.approval_status;
        this.status = val.status;
      }
    })
  };

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.scheduleDetailDataGrid) {
      this.service.search(
        this.scheduleDetailDataGrid,
        searchString,
        filterBy
      );
    }
  };

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    let ext = (target.files[0].name.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1];
    if (ext.trim() === 'xlsx') {

      if (target.files.length !== 1) {
        this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'Cannot use multiple files', type: ToastTypes.ERROR }))
      }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const resFilename = target.files[0].name;

        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = <IScheduleDetail[]>(XLSX.utils.sheet_to_json(ws));
        this.store.dispatch(new UploadScheduleDetails({ detailData: data, scheduleID: this.scheduleId }));
      };
      reader.readAsBinaryString(target.files[0]);

    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File Format not supported', type: ToastTypes.ERROR }))
    }

  };

  onRefresh() {
    this.store.dispatch(new LoadingDataScheduleDetail());
    this.store.dispatch(new LoadDataByIdSchedule({ scheduleID: this.scheduleId }));
    this.store.dispatch(new LoadDataScheduleDetail({ scheduleID: this.scheduleId }));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  };

  isGridEmpty(): boolean {
    let stutus: boolean = false;
    this.scheduleDetailData$.pipe(take(1)).subscribe(val => {
      stutus = (val.length === 0);
    });

    return stutus;
  };

  awaitingSubmission(): boolean {
    let isNotSubmitted: boolean = false;
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        isNotSubmitted = (val.approval_status === 1 && val.status === 1);
      }
    });

    return isNotSubmitted;
  }

  onResetButtonClicked() {
    this.dialogBoxService.show(`Are you sure you want to reset this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ResetingDataScheduleDetail());
          this.store.dispatch(new ResetScheduleDetailData({ scheduleID: this.scheduleId }));
        }
      });
  };

  onSubmitButtonClicked() {
    this.dialogBoxService.show(`Are you sure you want to submit this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new SubmittingDataScheduleDetail());
          this.store.dispatch(new SubmitDataScheduleDetails({ scheduleID: this.scheduleId }));
        }
      });
  };

  canValidate(): boolean {
    let approvedButNotValidated: boolean = false;
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        approvedButNotValidated = (val.approval_status === 2 && val.status === 3);
      }
    });

    return approvedButNotValidated;
  };

  disableSubmitButton(): boolean {
    let status: boolean = false;
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        status = !val.is_validated;
      }
    });

    return status;
  };

  onValidateButtonClicked() {
    this.store.dispatch(new ProcessingScheduleDetail());
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        this.store.dispatch(new ValidatePaymentScheduleDetail({ scheduleID: val.id }));
      }
    })
  };

  canValidateBeforeSubmit(): boolean {
    let approvedButNotValidated: boolean = false;
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        approvedButNotValidated = !val.is_validated;
      }
    });

    return approvedButNotValidated;
  }

  onValidateBeforeSubmitButtonClicked() {
    this.store.dispatch(new ValidatingRecordScheduleDetail());
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        this.store.dispatch(new ValidateUploadScheduleDetail({ scheduleID: val.id }));
      }
    })
  };

  canPay(): boolean {
    let status: boolean = false;
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        status = (val.approval_status === 2 && val.status === 4);
      }
    });

    return status;
  };

  onPayButtonClicked() {
    this.payEditor.amount = null;
    this.payEditor.scheduleId = null;
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        this.payEditor.amount = val.total_value;
        this.payEditor.scheduleId = val.id;
        this.payEditor.onShowForm();
      }
    });
  };


  isCompletedAndCanRequeue(): boolean {
    let canRequeue: boolean = false;
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        canRequeue = (val.approval_status === 2 && val.status === 6);
      }
    });

    return canRequeue;
  };
  onRequeueButtonClicked() {
    this.dialogBoxService.show(`Are you sure you want to requeue records?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new RequeueingDataScheduleDetail());
          this.store.dispatch(new RequeueScheduleDetails({ scheduleID: this.scheduleId }));
        }
      });
  };

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerScheduleDetail());
      }
      );
  }

  getRowData$(rowId: number): Observable<IScheduleDetail> {
    return this.scheduleDetailData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.editor.scheduleId = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.scheduleId = this.scheduleId;
        this.editor.reset();
        this.store.dispatch(new ShowEditorScheduleDetail());
      }
      );
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorScheduleDetail());
  };

  onCancelViewer() {
    this.store.dispatch(new HideViewerScheduleDetail());
  };

  goBack() {
    this.scheduleData$.pipe(take(1)).subscribe(val => {
      if (val) {
        if (val.approval_status === 1 && val.status <= 2) {
          this.router.navigate([STANDARD_ROUTES.pending]);
        } else if (val.approval_status > 1 && val.status > 2) {
          this.router.navigate([STANDARD_ROUTES.processing]);
        }
      }
    })

  }

  onProcessClick(e) {
    this.store.dispatch(new LoadingDataScheduleDetail());
    this.store.dispatch(new ProcessPayrollScheduleDetails({ scheduleID: e }));
  }

  ngOnDestroy() {
  }

}
