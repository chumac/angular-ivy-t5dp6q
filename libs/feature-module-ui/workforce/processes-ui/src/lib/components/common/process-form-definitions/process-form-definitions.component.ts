import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorProcessFormDefinition, showViewerProcessFormDefinition, getProcessFormDefinitionData, LoadDataProcessFormDefinition, ShowEditorProcessFormDefinition, HideEditorProcessFormDefinition, DeleteDataProcessFormDefinition, ShowViewerProcessFormDefinition, isProcessingProcessFormDefinition, ProcessingProcessFormDefinition, HideViewerProcessFormDefinition, LoadAreaProcessFormDefinition } from '../../../store/processes/process-form-definition';
import { ProcessFormDefinitionsEditorComponent } from './process-form-definitions-editor/process-form-definitions-editor.component';
import { ProcessFormDefinitionsViewerComponent } from './process-form-definitions-viewer/process-form-definitions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ProcessFormDefinitionsService } from './process-form-definitions.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, APPROVAL_STATUS } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IProcessFormDefinition } from '@nutela/models/workforce/employee-profiles';
import { LoadWorkFlowListCustomForm } from '../../../store/processes/custom-form';
import { Router } from '@angular/router';
import { PROCESS_FORM_DEFINITION_URLs } from '../../../constants';


@Component({
  selector: 'x365-fm-workforce-process-form-definitions',
  templateUrl: './process-form-definitions.component.html',
  styleUrls: ['./process-form-definitions.component.scss'],
  providers: [ProcessFormDefinitionsService],

})
export class ProcessFormDefinitionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  processFormDefinitionData$: Observable<IProcessFormDefinition[]>;
  approvedData$: Observable<IProcessFormDefinition[]>;
  awaitingApprovalData$: Observable<IProcessFormDefinition[]>;


  @ViewChild('editor') editor: ProcessFormDefinitionsEditorComponent;
  @ViewChild('viewer') viewer: ProcessFormDefinitionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private router: Router, private store: Store<IAppState>, public service: ProcessFormDefinitionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataProcessFormDefinition());
    this.store.dispatch(new LoadWorkFlowListCustomForm());
    this.store.dispatch(new LoadAreaProcessFormDefinition());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorProcessFormDefinition));
    this.showViewer$ = this.store.pipe(select(showViewerProcessFormDefinition));
    this.isProcessing$ = this.store.pipe(select(isProcessingProcessFormDefinition));
    this.processFormDefinitionData$ = this.store.pipe(select(getProcessFormDefinitionData));  
  }

  getRowData$(rowId: number): Observable<IProcessFormDefinition> {
    return this.processFormDefinitionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();

    this.store.dispatch(new ShowEditorProcessFormDefinition());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Custom Process Definitions information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorProcessFormDefinition());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerProcessFormDefinition());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataProcessFormDefinition({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  onAttachFormIconClicked(rowId: number) {
    this.router.navigate([`${PROCESS_FORM_DEFINITION_URLs.customProcessMapUrl}/${rowId}`], { skipLocationChange: false }); 
  }


  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorProcessFormDefinition());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerProcessFormDefinition());
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
