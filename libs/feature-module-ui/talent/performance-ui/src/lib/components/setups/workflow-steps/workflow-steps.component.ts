import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IWorkflowStep } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorWorkflowStep, showViewerWorkflowStep, getWorkflowStepData, LoadDataWorkflowStep, ShowEditorWorkflowStep, HideEditorWorkflowStep, DeleteDataWorkflowStep, ShowViewerWorkflowStep } from '../../../store/setups';
import { WorkflowStepsEditorComponent } from './workflow-steps-editor/workflow-steps-editor.component';
import { WorkflowStepsViewerComponent } from './workflow-steps-viewer/workflow-steps-viewer.component';
import * as constants from '../../../constants';
import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { WorkFlowStepsService } from './workflow-steps.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'x365-fm-talent-workflow-steps',
  templateUrl: './workflow-steps.component.html',
  styleUrls: ['./workflow-steps.component.scss'],
  providers: [WorkFlowStepsService],
})
export class WorkflowStepsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  workflowStepData$: Observable<IWorkflowStep[]>;


  @ViewChild('editor') editor: WorkflowStepsEditorComponent;
  @ViewChild('viewer') viewer: WorkflowStepsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  dropDownFilterValue: string;
  currWorkFlowId: number = +this.route.snapshot.paramMap.get('id');


  constructor(private store: Store<IAppState>, private location: Location, private route: ActivatedRoute, public service: WorkFlowStepsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataWorkflowStep({workFlowId: this.currWorkFlowId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorWorkflowStep));
    this.showViewer$ = this.store.pipe(select(showViewerWorkflowStep));
    this.workflowStepData$ = this.store.pipe(select(getWorkflowStepData));
  }

  getRowData$(rowId: number): Observable<IWorkflowStep> {
    return this.workflowStepData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.workFlowId = this.currWorkFlowId;
    this.store.dispatch(new ShowEditorWorkflowStep());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataWorkflowStep({workFlowId: this.currWorkFlowId}));
    this.store.dispatch(new ShowToast({title: null, message: `Workflow Step Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.editor.workFlowId = this.currWorkFlowId;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorWorkflowStep());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerWorkflowStep()); 
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataWorkflowStep({recordId: rowId, workFlowId: this.currWorkFlowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorWorkflowStep());
  }

  onCancelViewer() {

  }

  goBack() {
    this.location.back();
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
