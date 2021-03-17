import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {
  IgxGridComponent,
} from 'igniteui-angular';
import { ISalaryReviewGroup } from '@nutela/models/compensation/payroll';
import { Observable, Subject } from 'rxjs';
import { ReviewGroupEditorComponent } from './review-group-editor/review-group-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../store/root/root.state';
import {
  LoadFilteredReviewGroups,
  LoadingReviews,
  LoadReviewGroups,
  ShowEditorReviewGroup,
  HideEditorReviewGroup,
  HideViewerReviewGroup,
  ArchiveReviewGroup,
  ExecuteReviewGroup,
  ReverseReviewGroup,
  LoadStatusListReviewGroups,

  isLoadingReviews,
  getReviewGroups,
  getReviewGroupsFiltered,
  showEditorReviewGroup,
  showViewerReviewGroup,
  NotLoadingReviews,
  getStatusListReviewGroups
} from '../../../store/salary-review';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { ReviewGroupsService } from './review-groups.service';
import { map, take, takeUntil } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { Router } from '@angular/router';


@Component({
  selector: 'x365-fm-payrl-salary-review-groups',
  templateUrl: './review-groups.component.html',
  styleUrls: ['./review-groups.component.scss'],
  providers: [ReviewGroupsService]
})
export class ReviewGroupsComponent implements OnInit {
  selectedStatus = 0;
  reviewGroups$: Observable<ISalaryReviewGroup[]>;
  filteredReviewGroups$: Observable<ISalaryReviewGroup[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  payrollProfileSelectOption$: Observable<ISelectOption[]>
  gradeSelectOption$: Observable<ISelectOption[]>
  statusOptions$: Observable<ISelectOption[]>
  defaultCurrencySelectOption$: Observable<ISelectOption[]>

  allowCreate = true;

  @ViewChild('editor') editor: ReviewGroupEditorComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('filterByStatus') filterByStatus: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: ReviewGroupsService, private store: Store<IRootState>, private router: Router,
    public utilService: UtilService, private dialogService: DialogService) {
    titleService.setTitle(
      `${'Salary Review Groups'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.loadInitialFilter();

  }


  storeDispatches() {
    this.store.dispatch(new LoadingReviews())
    this.store.dispatch(new LoadReviewGroups());
    this.store.dispatch(new LoadStatusListReviewGroups());
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingReviews));
    this.reviewGroups$ = this.store.pipe(select(getReviewGroups));
    this.statusOptions$ = this.store.pipe(select(getStatusListReviewGroups));
    this.filteredReviewGroups$ = this.store.pipe(select(getReviewGroupsFiltered));
    this.showEditor$ = this.store.pipe(select(showEditorReviewGroup));
    this.showViewer$ = this.store.pipe(select(showViewerReviewGroup));
  }


  loadInitialFilter() {
    this.reviewGroups$.subscribe(val => {
      this.store.dispatch(new NotLoadingReviews())
      console.log({ val })
      console.log(this.selectedStatus)
      this.store.dispatch(new LoadFilteredReviewGroups({ statusId: this.selectedStatus }))
    })
  }

  onStatusSelected(event: any) {
    console.log(event)
    this.store.dispatch(new LoadFilteredReviewGroups({statusId: +event.value}))
    this.allowCreate = true;
    if (+event.value === 2) {
      this.allowCreate = false;
    }
  }

  onClearFilter(event) {
    console.log(event)
    this.store.dispatch(new LoadFilteredReviewGroups({ statusId: null }));
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
    this.store.dispatch(new ShowEditorReviewGroup());
  }

  onRefresh() {
    this.store.dispatch(new LoadReviewGroups());
    this.store.dispatch(new LoadFilteredReviewGroups({ statusId: null }))
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  getRowData$(rowId: number): Observable<ISalaryReviewGroup> {
    return this.reviewGroups$.pipe(
      map(d => d.filter(v => v.salary_review_id === rowId)),
      map(e => e.shift()))
  }

  onConfigureIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(val => {
      this.router.navigate([STANDARD_ROUTES.salaryReviewPlans, rowId, val.payroll_profile_id])
    })
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorReviewGroup());
      }
      );
  }

  onExecuteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to Execute this review group?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ExecuteReviewGroup({ recordId: rowId }));
      }
    });
  }

  onReverseIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to reverse this reveiew?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ReverseReviewGroup({ recordId: rowId }));
      }
    });
  }

  onArchiveIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to archive this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ArchiveReviewGroup({ recordId: rowId }));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReviewGroup());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReviewGroup());
  }

}
