import { Component, OnInit,  ViewChild } from '@angular/core';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Store, select } from '@ngrx/store';
import { WorkflowDefinitionEditorComponent } from './workflow-definition-editor/workflow-definition-editor.component';
import { Observable } from 'rxjs/internal/Observable';
import {  IWorkDefinition, IWorkDetails } from '@nutela/models/foundation';
import { IHRFoundationState } from '../../store/root';
import { LoadWorkDefinition, DeleteWorkDefinition, ShowEditorWorkDefinition, HideEditorWorkDefinition, ShowStepWorkDefinition, HideStepWorkDefinition, ProcessingWorkDefinition, NotProcessingWorkDefinition, LoadingWorkDefinition, SendBackTo} from '../../store/workflow-definition/work-definition.actions';
import { showEditorWorkDefinition, getWorkDefinitionApprovedData, showStepWorkDefinition, isLoadingWorkDefinition } from '../../store/workflow-definition';
import { AddstepComponent } from './addstep/addstep.component';
import { map, take } from 'rxjs/operators';
import { WorkflowDetailsComponent } from '../workflow-details/workflow-details.component';
import { getWorkDetailsData } from '../../store/workflow-details/work-details.selectors';
import { AddStepService } from './addstep/addstep.service';
import { WorkFlowDefinitionService } from './workflow-definition.service';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { Router } from '@angular/router';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { WorkFlowDetailsService } from '../workflow-details/workflow-details.service';
import { ClearWorkDetails } from '../../store/workflow-details';



@Component({
  selector: 'x365-fm-plf-hrf-workflow-definition',
  templateUrl: './workflow-definition.component.html',
  styleUrls: ['./workflow-definition.component.scss'],
  providers:[WorkFlowDefinitionService, WorkFlowDetailsService]
})
export class WorkflowDefinitionComponent implements OnInit {

  @ViewChild('editor') editor: WorkflowDefinitionEditorComponent ;
  @ViewChild('addeditor') addeditor: AddstepComponent;
  @ViewChild('details') details: WorkflowDetailsComponent ;

  showEditor$: Observable<boolean>;
  showStep$:   Observable<boolean>;
  isLoading$: Observable<boolean>;
  workflowDefinitionData$: Observable<IWorkDefinition[]>;
  workDetails$: Observable<IWorkDetails[]>;
  dropDownFilterValue:string;
 @ViewChild('workflowGrid') workflowGrid: IgxGridComponent;

  public id:number;


  constructor(private store: Store<IHRFoundationState>,
              private dialogBoxService: DialogBoxService,
              public fs: AddStepService,
              public workflowService:WorkFlowDefinitionService,
              public detailService:WorkFlowDetailsService,
              private router:Router) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
    this.store.dispatch(new LoadWorkDefinition());
    this.store.dispatch(new LoadingWorkDefinition());
   }

 storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorWorkDefinition));
    this.showStep$ =this.store.pipe(select(showStepWorkDefinition));
    this.workflowDefinitionData$ = this.store.pipe(select(getWorkDefinitionApprovedData));
    this.workDetails$=this.store.pipe(select(getWorkDetailsData));
    this.isLoading$ = this.store.pipe(select(isLoadingWorkDefinition));
 }

 onAdd(){
  this.showEditor();
 }

 onRefreshedButtonClicked(){
  this.store.dispatch(new LoadWorkDefinition());
  this.store.dispatch(new ShowToast({title: null, message: ` Workflow definition was Refreshed Successfully.`, type: ToastTypes.INFO}));
}

  showEditor(){
    this.store.dispatch(new ShowEditorWorkDefinition());
  }

  onCancelEditor(){
    this.store.dispatch(new HideEditorWorkDefinition());
  }

  onCancelStep(){
    this.store.dispatch(new HideStepWorkDefinition());
  }

  getRowWorkDefinitionData$(rowId: number): Observable<IWorkDefinition> {
    console.log('data row', rowId);
    return this.workflowDefinitionData$.pipe(
      map(d => d.filter(v => v.wflow_id === rowId)),
      map(e => e.shift()))
  }

   onEditIconClicked(row_id: number) {
    console.log('onclick event', row_id);
    this.editor.data = null;

    this.getRowWorkDefinitionData$(row_id).pipe(take(1))
      .subscribe((result) => {
        console.log(result);
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorWorkDefinition());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteWorkDefinition({recordId: row_id}));
        }
      });
  }


  onViewDetailIconClicked(row_id:number){
    this.store.dispatch(new ClearWorkDetails());
    this.getRowWorkDefinitionData$(row_id).pipe(take(1))
    .subscribe((result) => {
      // console.log(result);
    this.store.dispatch(new SendBackTo({description:result.description, Id:row_id}));
    } );
    this.router.navigate([`${STANDARD_ROUTES.workflowDetails}/${row_id}`]);
  }

  handleRowSelection(rowId){
    // console.log('igx',event.cell.row.rowData.wflow_id);
    // let row_id = event.cell.row.rowData.wflow_id;
    // this.store.dispatch(new SendBackTo({description:event.cell.row.rowData.description, Id:event.cell.row.rowData.wflow_id}));
    // this.router.navigate([`/d/platform/foundation/admin/workflow-definition-details/${row_id}`]);
    this.getRowWorkDefinitionData$(rowId).pipe(take(1))
    .subscribe((result) => {
      // console.log(result);
    this.store.dispatch(new SendBackTo({description:result.description, Id:rowId}));
    } );
    this.router.navigate([`${STANDARD_ROUTES.workflowDetails}/${rowId}`]);
  }


  onAddIconClicked(rowId:number){
    this.id = rowId;
    this.store.dispatch(new ShowStepWorkDefinition());
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.workflowGrid) {
      if (filterValue) {
        this.workflowGrid.clearFilter();
        this.workflowGrid.filteringLogic = FilteringLogic.Or;
        this.workflowGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.workflowGrid.clearFilter();
        this.workflowGrid.filteringLogic = FilteringLogic.Or;
        this.workflowGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
