import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Location } from '@angular/common';
import {
  IgxGridComponent,
} from 'igniteui-angular';
import { ISalaryReviewPlanDetail } from '@nutela/models/compensation/payroll';
import { Observable, Subject } from 'rxjs';
import { ReviewPlanDetailEditorComponent } from './review-plan-detail-editor/review-plan-detail-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import {
  LoadingReviews,
  LoadReviewPlanDetails,
  ShowEditorReviewPlanDetail,
  HideEditorReviewPlanDetail,
  HideViewerReviewPlanDetail,
  RemoveReviewPlanDetail,

  isLoadingReviews,
  getReviewPlanDetails,
  showEditorReviewPlanDetail,
  showViewerReviewPlanDetail
} from '../../../../store/salary-review';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { ReviewPlanDetailsService } from './review-plan-details.service';
import { map, take } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'x365-fm-payrl-salary-review-plan-details',
  templateUrl: './review-plan-details.component.html',
  styleUrls: ['./review-plan-details.component.scss'],
  providers: [ReviewPlanDetailsService]
})
export class ReviewPlanDetailsComponent implements OnInit {
  selectedStatus: any;
  planDetails$: Observable<ISalaryReviewPlanDetail[]>;
  filteredReviewPlans$: Observable<ISalaryReviewPlanDetail[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  payrollProfileSelectOption$: Observable<ISelectOption[]>
  gradeSelectOption$: Observable<ISelectOption[]>
  statusOptions$: Observable<ISelectOption[]>
  defaultCurrencySelectOption$: Observable<ISelectOption[]>

  planId: number;
  allowCreate = true;
  selectedStatusValue = null;

  @ViewChild('editor') editor: ReviewPlanDetailEditorComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('filterByStatus') filterByStatus: SelectComponent;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: ReviewPlanDetailsService, private store: Store<IRootState>,
    public utilService: UtilService, private route: ActivatedRoute, private location: Location, private dialogService: DialogService) {
    titleService.setTitle(
      `${'Salary Review Plan Details'}${this.partialDocumentTitle}`
    );

    this.route.params.subscribe(v => {
      this.planId = v.planId;
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadingReviews())
    this.store.dispatch(new LoadReviewPlanDetails({planId: this.planId}));
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingReviews));
    this.planDetails$ = this.store.pipe(select(getReviewPlanDetails));
    this.showEditor$ = this.store.pipe(select(showEditorReviewPlanDetail));
    this.showViewer$ = this.store.pipe(select(showViewerReviewPlanDetail));
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

    this.service.search(this.grid, searchString, filterBy);
  }

  onAdd() {
    this.editor.reset();
    this.store.dispatch(new ShowEditorReviewPlanDetail());
  }

  onRefresh() {
    this.store.dispatch(new LoadReviewPlanDetails({planId: this.planId}));
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  getRowData$(rowId: number): Observable<ISalaryReviewPlanDetail> {
    return this.planDetails$.pipe(
      map(d => d.filter(v => v.salary_review_id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId: number) {
    // this.viewer.data = null;
    // this.getRowData$(rowId).pipe(take(1))
    //   .subscribe((result) => {
    //     this.viewer.data = result;
    //     this.store.dispatch(new ShowViewerReviewPlanDetail());
    //   }
    //   );
  }

  goBack() {
    this.location.back();
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorReviewPlanDetail());
      }
      );
  }

  onArchiveIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to archive this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new RemoveReviewPlanDetail({ recordId: rowId, planId: rowId }));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReviewPlanDetail());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReviewPlanDetail());
  }

}
