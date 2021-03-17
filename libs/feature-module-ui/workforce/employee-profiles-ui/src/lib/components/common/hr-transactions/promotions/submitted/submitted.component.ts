import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { SubmittedService } from './submitted.service';
import { IEmployeesProfileState } from '../../../../../store';
import { UtilService } from '@nutela/core-services';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { ISelectOption } from '@nutela/models/core-data';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { IPromotion } from '@nutela/models/workforce/employee-profiles';
import { take, map } from 'rxjs/operators';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { isLoadingPromotion, getPaygradeSelectOptionDataPromotion, getArrearsStatusDataPromotion, getPaygroupSelectOptionDataPromotion, LoadApprovedDataPromotion, LoadAwaitingApprovalDataPromotion, LoadPaygradeDataPromotion, LoadArrearsStatusDataPromotion, getApprovedDataPromotion, getAwaitingApprovalDataPromotion, getCurrentPaygradeSelectOptionDataPromotion, getCurrentPaygroupSelectOptionDataPromotion, LoadCurrentPaygradeDataPromotion, DeleteDataPromotion, ShowEditorPromotion, HideEditorPromotion, LoadingPromotion, ShowViewerPromotion, NotProcessingPromotion, showEditorPromotion, showViewerPromotion, HideViewerPromotion, getActionDataPromotion, LoadActionDataPromotion, LoadEmployeeCurrentGradePaygroupDataPromotion, LoadPaygroupDataPromotion } from '../../../../../store/hr-transactions/promotion';
import { PromotionEditorComponent } from '../promotion-editor/promotion-editor.component';
import { PromotionViewerComponent } from '../promotion-viewer';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-promotions-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.scss']
})
export class SubmittedComponent implements OnInit {

  approvedSubmittedData$: Observable<IPromotion[]>;
  awaitingApprovalSubmittedData$: Observable<IPromotion[]>;

  paygroupSelectOption$: Observable<ISelectOption[]>;
  paygradeSelectOption$: Observable<ISelectOption[]>;
  currentPaygroupSelectOption$: Observable<ISelectOption[]>;
  currentPaygradeSelectOption$: Observable<ISelectOption[]>;
  arrearsStatusSelectOption$: Observable<ISelectOption[]>;
  actionSelectOption$: Observable<ISelectOption[]>;
  activePersonnel$: Observable<ISelectOption[]>;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  @ViewChild('awaitingDataGrid') awaitingDataGrid: IgxGridComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('promotionEditor') promotionEditor: PromotionEditorComponent;
  @ViewChild('viewer') viewer: PromotionViewerComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: SubmittedService, private store: Store<IEmployeesProfileState>,
  public utilService: UtilService, public router: Router, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Submitted Promotions Transaction'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingPromotion));
    this.showEditor$ = this.store.pipe(select(showEditorPromotion));
    this.showViewer$ = this.store.pipe(select(showViewerPromotion));
    this.approvedSubmittedData$ = this.store.pipe(select(getApprovedDataPromotion));
    this.awaitingApprovalSubmittedData$ = this.store.pipe(select(getAwaitingApprovalDataPromotion))
    this.paygradeSelectOption$ = this.store.pipe(select(getPaygradeSelectOptionDataPromotion));
    this.paygroupSelectOption$ = this.store.pipe(select(getPaygroupSelectOptionDataPromotion));
    this.currentPaygradeSelectOption$ = this.store.pipe(select(getCurrentPaygradeSelectOptionDataPromotion));
    this.currentPaygroupSelectOption$ = this.store.pipe(select(getCurrentPaygroupSelectOptionDataPromotion));
    this.arrearsStatusSelectOption$ = this.store.pipe(select(getArrearsStatusDataPromotion));
    this.actionSelectOption$ = this.store.pipe(select(getActionDataPromotion));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingPromotion());
    this.store.dispatch(new LoadApprovedDataPromotion());
    this.store.dispatch(new LoadAwaitingApprovalDataPromotion());
    this.store.dispatch(new LoadPaygradeDataPromotion());
    this.store.dispatch(new LoadCurrentPaygradeDataPromotion());
    this.store.dispatch(new LoadArrearsStatusDataPromotion());
    this.store.dispatch(new LoadActionDataPromotion());
  }


  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if(this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }


    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.approvedDataGrid) {
      this.service.search(this.approvedDataGrid, searchString, filterBy);
    } else if(this.awaitingDataGrid) {
      this.service.search(this.awaitingDataGrid, searchString, filterBy);
    }
  }

  getRowData$(rowId: number): Observable<IPromotion> {
    return this.approvedSubmittedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingRowData$(rowId: number): Observable<IPromotion> {
    return this.awaitingApprovalSubmittedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }


  onRefresh() {
    this.store.dispatch(new LoadApprovedDataPromotion());
    this.store.dispatch(new LoadAwaitingApprovalDataPromotion());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
  }

  goBack() {
    this.router.navigate([`${STANDARD_ROUTES.hrPromotions}`])
  }

  onViewApprovedIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe(result => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPromotion());
          this.store.dispatch(new NotProcessingPromotion());
        }
      );
  }

  onViewAwaitingIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingRowData$(rowId).pipe(take(1))
      .subscribe(result => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPromotion());
          this.store.dispatch(new NotProcessingPromotion());
        }
      );
  }

  onEditIconClicked(rowId: number) {
    this.promotionEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        // this.store.dispatch(new LoadEmployeeCurrentGradePaygroupDataPromotion({employeeId: result.current_grade_id}));
        this.store.dispatch(new LoadPaygroupDataPromotion({gradeId: result.new_grade_id}));
        this.promotionEditor.data = result;
        this.promotionEditor.reset();
        this.store.dispatch(new ShowEditorPromotion());
        }
      );
  }

  onRemoveIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.getAwaitingRowData$(rowId).pipe(take(1))
          .subscribe(result => {
            this.store.dispatch(new DeleteDataPromotion({promotion_id: rowId}));
          })
        }
      });
  }


  onCancelPromotionEditor() {
    this.store.dispatch(new HideEditorPromotion())
  }
  onCancelViewer() {
    this.store.dispatch(new HideViewerPromotion())
  }

}
