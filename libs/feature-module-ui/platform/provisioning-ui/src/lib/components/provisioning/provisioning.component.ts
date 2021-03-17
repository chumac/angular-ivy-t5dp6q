import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable, pipe } from 'rxjs';
import { LoadProvisionedDataNewEmployee, getProvisionedData, showEditorNewEmployee, showViewerNewEmployee, ShowViewerNewEmployee, HideEditorNewEmployee, ShowEditorNewEmployee, HideViewerNewEmployee, NotProcessingNewEmployee, showEditorProvisionedEmployee, ShowEditorProvisionedEmployee, HideEditorProvisionedEmployee, isLoadingNewEmployee, LoadingNewEmployee } from '../../store/new-employee';
import { ProvisioningService } from '../../services/provisioning.service';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import { ISelectOption } from '@nutela/models/core-data';
import { getSelectOptionData, getActivePersonnel } from 'libs/store/modules/foundation/src/lib/select-option-data';
import { map, take } from 'rxjs/operators';
import { ProvisioningEmployeeEditorComponent } from './provisioning-employee-editor/provisioning-employee-editor.component';
import { ProvisionedEmployeeViewerComponent } from './provisioned-employee-viewer';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { Title } from '@angular/platform-browser';
import { IProvisioning } from '../../models/interfaces';
import { PROVISIONING_STATUS } from '../../constants/common';
import { ProvisionedEmployeeEditorComponent } from './provisioned-employee-editor/provisioned-employee-editor.component';


@Component({
  selector: 'x365-fm-plf-prov-provisioning',
  templateUrl: './provisioning.component.html',
  styleUrls: ['./provisioning.component.scss'],
  providers: [ProvisioningService],
})
export class ProvisioningComponent implements OnInit {

  provisioningStatus = PROVISIONING_STATUS;

  searchTerm: string;
  dropDownFilterValue: string;

  provisionedEmployees$: Observable<IProvisioning[]>;
  showEditor$: Observable<boolean>;
  showProvisionedEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  provisionedData$: Observable<IProvisioning[]>;
  activePersonnel$: Observable<ISelectOption[]>;

  @ViewChild('editor') editor: ProvisioningEmployeeEditorComponent;
  @ViewChild('provisionedEditor') provisionedEditor: ProvisionedEmployeeEditorComponent;
  @ViewChild('viewer') viewer: ProvisionedEmployeeViewerComponent;
  @ViewChild('provisionedDataGrid', { read: IgxGridComponent }) provisionedDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBySentTo') filterBySentTo: SelectComponent;
  @ViewChild('filterByCanFinalize') filterByCanFinalize: SelectComponent;
  @ViewChild('workflowEntity') workflowEntity: SelectComponent;
  @ViewChild("itemsAwaitingMyActionGrid") itemsAwaitingMyActionGrid: IgxGridComponent;

  private subscriptions: ISubscriptions = {};

  constructor( @Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: ProvisioningService, private store: Store<IAppState> ) {
    titleService.setTitle(
      `${'Provisioning Potal'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingNewEmployee());
    this.store.dispatch(new LoadProvisionedDataNewEmployee());
  }

  storeSelects() {
    this.isLoading$ = this.store.select(pipe(isLoadingNewEmployee));
    this.provisionedEmployees$ = this.store.select(pipe(getProvisionedData));
    this.provisionedData$ = this.store.select(pipe(getProvisionedData));
    this.showEditor$ = this.store.select(pipe(showEditorNewEmployee));
    this.showProvisionedEditor$ = this.store.select(pipe(showEditorProvisionedEmployee));
    this.showViewer$ = this.store.select(pipe(showViewerNewEmployee));
    this.selectOptionData$ = this.store.select(pipe(getSelectOptionData));
    this.activePersonnel$ = this.store.select(pipe(getActivePersonnel));
  }

  filter(term: string, filterValue: string) {
    if (this.provisionedDataGrid) {
      if (filterValue) {
        this.provisionedDataGrid.clearFilter();
        this.provisionedDataGrid.filteringLogic = FilteringLogic.Or;
        this.provisionedDataGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.provisionedDataGrid.clearFilter();
        this.provisionedDataGrid.filteringLogic = FilteringLogic.Or;
        this.provisionedDataGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  getRowData$(rowId: number): Observable<IProvisioning> {
    return this.provisionedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()), take(1))
  }

  onAdd() {
    this.store.dispatch(new ShowEditorNewEmployee())
  }

  onRefresh() {
    this.store.dispatch(new LoadingNewEmployee());
    this.store.dispatch(new LoadProvisionedDataNewEmployee());
    this.store.dispatch(new ShowToast({title: null, message: `Provisioned Employees data has been refreshed.`, type: ToastTypes.INFO}));
  }

  onEditIconClicked(rowId: number) {
    this.provisionedEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.provisionedEditor.data = result;
          this.provisionedEditor.reset();
          this.store.dispatch(new ShowEditorProvisionedEmployee());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerNewEmployee());
          this.store.dispatch(new NotProcessingNewEmployee());
        }
      );
  }

  isEditable(rowId: number):boolean {
    let status = false;

    this.subscriptions['status'] = this.getRowData$(rowId)
    .pipe(take(1)).subscribe((result) => {
          if (
            (result.rec_category !== null && result.rec_category == 0) &&
            (result.status !== null && result.status == 2)
            ) {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }
  onCancelEditor() {
    this.store.dispatch(new HideEditorNewEmployee());
    this.store.dispatch(new HideEditorProvisionedEmployee());
  }
  onCancelViewer() {
    this.store.dispatch(new HideViewerNewEmployee());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
