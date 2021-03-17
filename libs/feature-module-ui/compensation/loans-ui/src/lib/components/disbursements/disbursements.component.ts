import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ISelectOption } from '@nutela/models/core-data';
import { IDisbursed } from '@nutela/models/compensation/loans';
import { DisbursementEditorComponent } from './disbursement-editor/disbursement-editor.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { Title } from '@angular/platform-browser';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Store, select } from '@ngrx/store';
import { showEditorDisbursement, getDataDisbursements, LoadDataDisbursements, ShowEditorDisbursement, HideEditorDisbursement, isLoadingDisbursements, LoadingDisbursements, getDisbursedDataDisbursements, LoadDataDisbursed, NotProcessingDisbursements, HideViewerDisbursement, ShowViewerDisbursement, showViewerDisbursement } from '../../store/disbursements';
import { getActivePersonnel } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DisbursementsService } from './disbursements.service';
import { map, take } from 'rxjs/operators';
import { DisbursementViewerComponent } from './disbursement-viewer';
import { ILoanState } from '../../store';
import { DISBURSE_STATUS } from '../../constants';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-loans-disbursements',
  templateUrl: './disbursements.component.html',
  styleUrls: ['./disbursements.component.scss'],
  providers: [DisbursementsService],
})
export class DisbursementsComponent implements OnInit {

  dropDownFilterValue: string;
  disburseStatus = DISBURSE_STATUS;

  showDisbursementEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  disbursementsData$: Observable<IDisbursed[]>;
  disbursedData$: Observable<IDisbursed[]>;
  activePersonnel$: Observable<ISelectOption[]>;


  @ViewChild('disbursementEditor') disbursementEditor: DisbursementEditorComponent;

  @ViewChild("disbursementsDataGrid") disbursementsDataGrid: IgxGridComponent;
  @ViewChild("disbursedDataGrid") disbursedDataGrid: IgxGridComponent;
  @ViewChild('viewer') viewer: DisbursementViewerComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: DisbursementsService, private store: Store<ILoanState>, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Loan Disbursements'}${this.partialDocumentTitle}`
    );
   }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingDisbursements));
    this.showDisbursementEditor$ = this.store.pipe(select(showEditorDisbursement));
    this.showViewer$ = this.store.pipe(select(showViewerDisbursement));
    this.disbursementsData$ = this.store.pipe(select(getDataDisbursements));
    this.disbursedData$ = this.store.pipe(select(getDisbursedDataDisbursements));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDisbursements());
    this.store.dispatch(new LoadDataDisbursements());
    this.store.dispatch(new LoadDataDisbursed());
  }

  getRowData$(rowId: number): Observable<IDisbursed> {
    return this.disbursementsData$.pipe(
      map(d => d.filter(v => v.loan_det_id === rowId)),
      map(e => e.shift()))
  }

  getDisbursedData$(rowId: number): Observable<IDisbursed> {
    return this.disbursedData$.pipe(
      map(d => d.filter(v => v.loan_det_id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {
    this.store.dispatch(new ShowEditorDisbursement())
  }

  onDisburseIconClicked(rowId: number){
    this.disbursementEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.disbursementEditor.data = result;
          this.disbursementEditor.reset();
          this.store.dispatch(new ShowEditorDisbursement())
        }
      );
  }

  onViewDisbursedIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getDisbursedData$(rowId)
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerDisbursement());
          this.store.dispatch(new NotProcessingDisbursements());
        }
      );
   }


  onRefresh() {
    this.store.dispatch(new LoadDataDisbursements());
    this.store.dispatch(new LoadDataDisbursed());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
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

    if (this.disbursementsDataGrid) {
      this.service.search(
        this.disbursementsDataGrid,
        searchString,
        filterBy
      );
    } else if (this.disbursedDataGrid) {
      this.service.search(
        this.disbursedDataGrid,
        searchString,
        filterBy
      )
    }
  }


  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {

      }
    });
  }
  onCancelEditor() {
    this.store.dispatch(new HideEditorDisbursement());
  }
  onCancelViewer() {
    this.store.dispatch(new HideViewerDisbursement())
  }

  unsubscribe() {

  }

  ngOnDestroy() {
    this.unsubscribe();

  }
}
