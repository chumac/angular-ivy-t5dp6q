import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Location } from '@angular/common';
import {
  IgxGridComponent,
} from 'igniteui-angular';
import { ISalaryReviewPlan } from '@nutela/models/compensation/payroll';
import { Observable, Subject } from 'rxjs';
import { ReviewPlanEditorComponent } from './review-plan-editor/review-plan-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import {
  LoadingReviews,
  LoadReviewPlans,
  ReverseReviewPlan,
  ShowEditorReviewPlan,
  HideEditorReviewPlan,
  HideViewerReviewPlan,
  ArchiveReviewPlan,

  isLoadingReviews,
  getReviewPlans,
  showEditorReviewPlan,
  showViewerReviewPlan,
  ShowViewerReviewPlan,
  ExecuteReviewPlan
} from '../../../../store/salary-review';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { ReviewPlansService } from './review-plans.service';
import { map, take, takeUntil } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewPlanViewerComponent } from './review-plan-viewer/review-plan-viewer.component';


@Component({
  selector: 'x365-fm-payrl-salary-review-plans',
  templateUrl: './review-plans.component.html',
  styleUrls: ['./review-plans.component.scss'],
  providers: [ReviewPlansService]
})
export class ReviewPlansComponent implements OnInit {

  reviewPlans$: Observable<ISalaryReviewPlan[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  groupId: number;
  profileId: number;
  allowCreate = true;
  selectedStatusValue = null;

  @ViewChild('editor') editor: ReviewPlanEditorComponent;
  @ViewChild('viewer') viewer: ReviewPlanViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: ReviewPlansService, private store: Store<IRootState>, private route: ActivatedRoute, private router: Router, private location: Location,
    public utilService: UtilService, private dialogService: DialogService) {
    titleService.setTitle(
      `${'Salary Review Plans'}${this.partialDocumentTitle}`
    );

    this.route.params.subscribe(v => {
      this.groupId = v.groupId;
      this.profileId = v.profileId;
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadingReviews())
    this.store.dispatch(new LoadReviewPlans({groupId: this.groupId, profileId: this.profileId}));
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingReviews));
    this.reviewPlans$ = this.store.pipe(select(getReviewPlans));
    this.showEditor$ = this.store.pipe(select(showEditorReviewPlan));
    this.showViewer$ = this.store.pipe(select(showViewerReviewPlan));
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
    this.store.dispatch(new ShowEditorReviewPlan());
  }

  onRefresh() {
    this.store.dispatch(new LoadReviewPlans({groupId: this.groupId, profileId: this.profileId}));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  getRowData$(rowId: number): Observable<ISalaryReviewPlan> {
    return this.reviewPlans$.pipe(
      map(d => d.filter(v => v.salary_review_id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerReviewPlan());
      }
      );
  }

  onViewDetailsClicked(rowId: number) {
    this.router.navigate([STANDARD_ROUTES.salaryReviewPlanDetails, rowId])
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorReviewPlan());
      }
      );
  }

  onArchiveIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to archive this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ArchiveReviewPlan({ recordId: rowId, groupId: this.groupId, profileId: this.profileId }));
      }
    });
  }

  onExecuteClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to execute this plan?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ExecuteReviewPlan({ recordId: rowId, groupId: this.groupId, profileId: this.profileId  }));
      }
    });
  }

  onReverseClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to reverse this plan?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ReverseReviewPlan({ recordId: rowId, groupId: this.groupId, profileId: this.profileId  }));
      }
    });
  }

  goBack() {
    this.location.back();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReviewPlan());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReviewPlan());
  }

}
