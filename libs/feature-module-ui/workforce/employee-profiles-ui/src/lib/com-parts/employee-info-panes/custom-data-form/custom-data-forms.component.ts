import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorCustomDataForm, showViewerCustomDataForm, getCustomDataFormData, LoadDataCustomDataForm, ShowEditorCustomDataForm, HideEditorCustomDataForm, DeleteDataCustomDataForm, ShowViewerCustomDataForm, isProcessingCustomDataForm, ProcessingCustomDataForm, HideViewerCustomDataForm } from '@nutela/store/modules/workforce/employee-profiles';
import { CustomDataFormsEditorComponent } from './custom-data-forms-editor/custom-data-forms-editor.component';
import { CustomDataFormsViewerComponent } from './custom-data-forms-viewer/custom-data-forms-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { CustomDataFormsService } from './custom-data-forms.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, APPROVAL_STATUS } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ICustomDataForm } from '@nutela/models/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-workforce-custom-data-forms',
  templateUrl: './custom-data-forms.component.html',
  styleUrls: ['./custom-data-forms.component.scss'],
  providers: [CustomDataFormsService],

})
export class CustomDataFormsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  customDataFormData$: Observable<ICustomDataForm[]>;
  approvedData$: Observable<ICustomDataForm[]>;
  awaitingApprovalData$: Observable<ICustomDataForm[]>;


  @ViewChild('editor') editor: CustomDataFormsEditorComponent;
  @ViewChild('viewer') viewer: CustomDataFormsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>, public service: CustomDataFormsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataCustomDataForm());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCustomDataForm));
    this.showViewer$ = this.store.pipe(select(showViewerCustomDataForm));
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomDataForm));
    this.customDataFormData$ = this.store.pipe(select(getCustomDataFormData));
    this.approvedData$ = this.approvedDataList$();
    this.awaitingApprovalData$ = this.awaitingApprovalDataList$();
  
  }

  getRowData$(rowId: number): Observable<ICustomDataForm> {
    return this.customDataFormData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  approvedDataList$():Observable<ICustomDataForm[]>  {
    return this.customDataFormData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)));
  }

  awaitingApprovalDataList$():Observable<ICustomDataForm[]>  {
    return this.customDataFormData$
    .pipe(map(data => data.filter(val => val.approval_status !== APPROVAL_STATUS.approved)));
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();

    this.store.dispatch(new ShowEditorCustomDataForm());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Feedback Ratings Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowData: ICustomDataForm) {
    this.editor.data = null;
    this.editor.data = rowData;
    this.editor.reset();
    this.store.dispatch(new ShowEditorCustomDataForm());


    // this.getRowData$(rowId).pipe(take(1))
    //   .subscribe((result) => {
    //       this.editor.data = result;
    //       this.editor.reset();
    //       this.store.dispatch(new ShowEditorCustomDataForm());
    //     }
    //   );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCustomDataForm());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataCustomDataForm({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorCustomDataForm());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerCustomDataForm());
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
