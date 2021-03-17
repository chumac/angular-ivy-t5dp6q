import { Component, OnInit,  ViewChild } from '@angular/core';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IWorkflowMap, ISystem } from '@nutela/models/foundation';
import { WorkflowMapEditorComponent } from './workflow-map-editor/workflow-map-editor.component';
import { LoadWorkflowMap,LoadWorkDefinition, ShowEditorWorkflowMap, DeleteWorkflowMap, HideEditorWorkflowMap, LoadSystemData, ProcessingWorkflowMap } from '../../store/workflow-map/workflow-map.actions';
import { showEditorWorkflowMap, getWorkflowMapApprovedData, IWorkflowMapState, getEntityData, getWorkDefinitionData, isProcessingWorkflowMap } from '../../store/workflow-map';
import { map } from 'rxjs/internal/operators/map';
import { ISelectOption } from '@nutela/models/core-data';
import { WorkFlowMapService } from './workflow-map.service';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { take } from 'rxjs/operators';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';




@Component({
  selector: 'x365-fm-plf-hrf-workflow-map',
  templateUrl: './workflow-map.component.html',
  styleUrls: ['./workflow-map.component.scss'],
  providers:[WorkFlowMapService]
})
export class WorkflowMapComponent implements OnInit {
  @ViewChild('editor') editor: WorkflowMapEditorComponent ;

  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  systemData$: Observable<ISelectOption[]>;
  workDefinition$: Observable<ISelectOption[]>;
  workflowMapData$: Observable<IWorkflowMap[]>;
  dropDownFilterValue:string;
 @ViewChild('workflowMapGrid') workflowMapGrid: IgxGridComponent;




  constructor(private store: Store<IWorkflowMapState>,
              private dialogBoxService: DialogBoxService,
              public workMapService: WorkFlowMapService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
    this.store.dispatch(new LoadWorkflowMap());
    this.store.dispatch(new LoadSystemData());
    this.store.dispatch(new LoadWorkDefinition());
    this.store.dispatch(new ProcessingWorkflowMap());

   }

 storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorWorkflowMap));
    this.systemData$ = this.store.pipe(select(getEntityData));
    this.workDefinition$= this.store.pipe(select(getWorkDefinitionData))
    this.workflowMapData$ = this.store.pipe(select(getWorkflowMapApprovedData));
    this.isProcessing$ = this.store.pipe(select(isProcessingWorkflowMap));
 }

 onAdd(){
  this.showEditor();
 }

 onRefreshedButtonClicked(){
  this.store.dispatch(new LoadWorkflowMap());
  this.store.dispatch(new ShowToast({title: null, message: ` Workflow Map was Refreshed Successfully.`, type: ToastTypes.INFO}));
 }

  showEditor(){
    this.store.dispatch(new ShowEditorWorkflowMap());
  }

  onCancelEditor(){
    this.store.dispatch(new HideEditorWorkflowMap());
  }

  getRowWorkflowMapData$(rowId: number): Observable<IWorkflowMap> {
    return this.workflowMapData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))

  }

  onEditIconClicked(row_id: number) {
    this.editor.data = null;

    this.getRowWorkflowMapData$(row_id).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorWorkflowMap());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteWorkflowMap({recordId: row_id}));
        }
      });
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.workflowMapGrid) {
      if (filterValue) {
        this.workflowMapGrid.clearFilter();
        this.workflowMapGrid.filteringLogic = FilteringLogic.Or;
        this.workflowMapGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
      else {
        this.workflowMapGrid.clearFilter();
        this.workflowMapGrid.filteringLogic = FilteringLogic.Or;
        this.workflowMapGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
