import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {
  IgxGridComponent,
} from 'igniteui-angular';
import { IPayGroup } from '@nutela/models/compensation/payroll';
import { Observable, Subject } from 'rxjs';
import { PayGroupEditorComponent } from './pay-group-editor/pay-group-editor.component';
import { PayGroupViewerComponent } from './pay-group-viewer/pay-group-viewer.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadPayGroupData, LoadingPayGroup, getPayGroup, isLoadingPayGroup, showEditorPayGroup, ShowEditorPayGroup, HideEditorPayGroup, LoadPayrollProfileSelectOptionPaygroup, getPayrollProfileSelectOptionPayGroup, LoadGradeSelectOptionPaygroup, getGradeSelectOptionPayGroup, LoadConfirmationStatusData, getConfirmationStatus, LoadCurrencyData, getCurrencies, LoadFilteredPayGroup, ArchivePayGroup, getPayGroupFiltered, ShowViewerPayGroup, showViewerPayGroup, HideViewerPayGroup  } from '../../../../store/dependencies/pay-group';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { PaygroupsService } from './pay-groups.service';
import { map, take, takeUntil } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';


@Component({
  selector: 'x365-fm-payrl-pay-groups',
  templateUrl: './pay-groups.component.html',
  styleUrls: ['./pay-groups.component.scss'],
  providers: [PaygroupsService]
})
export class PayGroupsComponent implements OnInit {
  selectedStatus: any;
  paygroupData$: Observable<IPayGroup[]>;
  filteredPaygroupData$: Observable<IPayGroup[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  // hasRole$: Observable<boolean>;
  payrollProfileSelectOption$: Observable<ISelectOption[]>
  gradeSelectOption$: Observable<ISelectOption[]>
  confirmationSelectOption$: Observable<ISelectOption[]>
  defaultCurrencySelectOption$: Observable<ISelectOption[]>

  allowCreate = true;
  selectedStatusValue = null;

  @ViewChild('editor') editor: PayGroupEditorComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('awaitingApprovalDataGrid') awaitingApprovalDataGrid: IgxGridComponent;
  @ViewChild('viewer') viewer: PayGroupViewerComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('filterByStatus') filterByStatus: SelectComponent;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: PaygroupsService, private store: Store<IRootState>,
    public utilService: UtilService, private dialogService: DialogService) {
    titleService.setTitle(
      `${'Payment Groups Management'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadPayGroupData());
    this.store.dispatch(new LoadingPayGroup())
    this.store.dispatch(new LoadPayrollProfileSelectOptionPaygroup())
    this.store.dispatch(new LoadGradeSelectOptionPaygroup())
    this.store.dispatch(new LoadConfirmationStatusData())
    this.store.dispatch(new LoadCurrencyData())

    this.paygroupData$.pipe(takeUntil(this.destroy$)).subscribe(val => {
      if (val.length) {
        this.destroy$.next(true);
        console.log(val)
        this.store.dispatch(new LoadFilteredPayGroup({ statusId: undefined }))
      }
    })
  }

  storeSelects() {
    this.paygroupData$ = this.store.pipe(select(getPayGroup));
    this.filteredPaygroupData$ = this.store.pipe(select(getPayGroupFiltered));
    this.isLoading$ = this.store.pipe(select(isLoadingPayGroup));
    this.showEditor$ = this.store.pipe(select(showEditorPayGroup));
    this.showViewer$ = this.store.pipe(select(showViewerPayGroup));
    this.payrollProfileSelectOption$ = this.store.pipe(select(getPayrollProfileSelectOptionPayGroup));
    this.gradeSelectOption$ = this.store.pipe(select(getGradeSelectOptionPayGroup));
    this.confirmationSelectOption$ = this.store.pipe(select(getConfirmationStatus));
    this.defaultCurrencySelectOption$ = this.store.pipe(select(getCurrencies));
    // this.hasRole$ = this.store.pipe(select(hasPaygroupAdminRole));
  }


  filter(event) {
    this.store.dispatch(new LoadFilteredPayGroup({statusId: +event.value}))
    this.selectedStatus = event.value;
    this.allowCreate = true;
    if (+event.value === 2) {
      this.allowCreate = false;
    }
  }
  onClearFilter(event) {
    console.log(event)
    this.store.dispatch(new LoadFilteredPayGroup({ statusId: null }));
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
    this.editor.setConfirmationStatus(this.selectedStatus)
    this.store.dispatch(new ShowEditorPayGroup());
  }

  onRefresh() {
    console.log(this.selectedStatusValue);
    this.store.dispatch(new LoadPayGroupData());
    this.store.dispatch(new LoadFilteredPayGroup({ statusId: null }))
    this.store.dispatch(new ShowToast({ title: null, message: ` PayGroup data is being refreshed.`, type: ToastTypes.INFO }));
  }

  getRowData$(rowId: number): Observable<IPayGroup> {
    return this.paygroupData$.pipe(
      map(d => d.filter(v => v.paygroup_id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerPayGroup());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorPayGroup());
      }
      );
  }

  onUpdateRateIconClicked(rowId: number) {

  }

  onArchiveIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to archive this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ArchivePayGroup({ recordId: rowId }));
      }
    });
  }

  onViewAwaitingIconClicked(rowId: number) {

  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPayGroup());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPayGroup());
  }

}
