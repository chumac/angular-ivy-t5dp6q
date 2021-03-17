import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IWorkflowDefinition } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorWorkflowDefinition, showViewerWorkflowDefinition, getWorkflowDefinitionData, LoadDataWorkflowDefinition, ShowEditorWorkflowDefinition, HideEditorWorkflowDefinition, DeleteDataWorkflowDefinition, ShowViewerWorkflowDefinition } from '../../../store/setups';
import { WorkflowDefinitionsEditorComponent } from './workflow-definitions-editor/workflow-definitions-editor.component';
import { WorkflowDefinitionsViewerComponent } from './workflow-definitions-viewer/workflow-definitions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { WorkflowDefinitionsService } from './workflow-definitions.service';
import { Router } from '@angular/router';


@Component({
  selector: 'x365-fm-talent-workflow-definitions',
  templateUrl: './workflow-definitions.component.html',
  styleUrls: ['./workflow-definitions.component.scss'],
  providers: [WorkflowDefinitionsService],
})
export class WorkflowDefinitionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  workflowDefinitionData$: Observable<IWorkflowDefinition[]>;

  @ViewChild('editor') editor: WorkflowDefinitionsEditorComponent;
  @ViewChild('viewer') viewer: WorkflowDefinitionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string

  constructor(private store: Store<IAppState>, private router: Router, public service: WorkflowDefinitionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataWorkflowDefinition());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorWorkflowDefinition));
    this.showViewer$ = this.store.pipe(select(showViewerWorkflowDefinition));
    this.workflowDefinitionData$ = this.store.pipe(select(getWorkflowDefinitionData));
  }

  getRowData$(rowId: number): Observable<IWorkflowDefinition> {
    return this.workflowDefinitionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorWorkflowDefinition());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataWorkflowDefinition());
    this.store.dispatch(new ShowToast({title: null, message: `Workflow Definition Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.eligibiltyRule = result.eligibility_rule;
          this.editor.reset();
          this.store.dispatch(new ShowEditorWorkflowDefinition());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerWorkflowDefinition());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataWorkflowDefinition({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  onSetupStepsIconClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.workflowStepsSetup}/${rowId}`]);
  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorWorkflowDefinition());
  }

  onCancelViewer() {

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
