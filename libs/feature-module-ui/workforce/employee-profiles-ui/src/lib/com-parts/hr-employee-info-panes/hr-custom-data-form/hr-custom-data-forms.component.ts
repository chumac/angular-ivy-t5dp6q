import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorHrCustomDataForm, showViewerHrCustomDataForm, getHrCustomDataFormData, LoadDataHrCustomDataForm, ShowEditorHrCustomDataForm, HideEditorHrCustomDataForm, DeleteDataHrCustomDataForm, ShowViewerHrCustomDataForm, isProcessingHrCustomDataForm, ProcessingHrCustomDataForm, HideViewerHrCustomDataForm } from '../../../store/employee-detailed-area';
import { HrCustomDataFormsEditorComponent } from './hr-custom-data-forms-editor/hr-custom-data-forms-editor.component';
import { HrCustomDataFormsViewerComponent } from './hr-custom-data-forms-viewer/hr-custom-data-forms-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { HrCustomDataFormsService } from './hr-custom-data-forms.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, APPROVAL_STATUS } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IHrCustomDataForm } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../store';


@Component({
  selector: 'x365-fm-workforce-hr-custom-data-forms',
  templateUrl: './hr-custom-data-forms.component.html',
  styleUrls: ['./hr-custom-data-forms.component.scss'],
  providers: [HrCustomDataFormsService],

})
export class HrCustomDataFormsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  hrCustomDataFormData$: Observable<IHrCustomDataForm[]>;
  approvedData$: Observable<IHrCustomDataForm[]>;
  awaitingApprovalData$: Observable<IHrCustomDataForm[]>;

  @Input() employeeId: number;
  @Input() data: any;

  @ViewChild('editor') editor: HrCustomDataFormsEditorComponent;
  @ViewChild('viewer') viewer: HrCustomDataFormsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private store: Store<IEmployeesProfileState>, public service: HrCustomDataFormsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrCustomDataForm({employeeId: this.employeeId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrCustomDataForm));
    this.showViewer$ = this.store.pipe(select(showViewerHrCustomDataForm));
    this.isProcessing$ = this.store.pipe(select(isProcessingHrCustomDataForm));
    this.hrCustomDataFormData$ = this.store.pipe(select(getHrCustomDataFormData));
    this.approvedData$ = this.approvedDataList$();
    this.awaitingApprovalData$ = this.awaitingApprovalDataList$();
  
  }

  getRowData$(rowId: number): Observable<IHrCustomDataForm> {
    return this.hrCustomDataFormData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  approvedDataList$():Observable<IHrCustomDataForm[]>  {
    return this.hrCustomDataFormData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)));
  }

  awaitingApprovalDataList$():Observable<IHrCustomDataForm[]>  {
    return this.hrCustomDataFormData$
    .pipe(map(data => data.filter(val => val.approval_status !== APPROVAL_STATUS.approved)));
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();

    this.store.dispatch(new ShowEditorHrCustomDataForm());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Custom data Information is being refreshed.`, type: ToastTypes.INFO}));
  }

  onEditIconClicked(rowData: IHrCustomDataForm) {
    this.editor.data = null;
    this.editor.data = rowData;
    this.editor.reset();
    this.store.dispatch(new ShowEditorHrCustomDataForm());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerHrCustomDataForm());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataHrCustomDataForm({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrCustomDataForm());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrCustomDataForm());
  }

  filter(term: string, filterValue: string) {
    if (this.grid) {
      if (filterValue) {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filterGlobal(
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


  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
