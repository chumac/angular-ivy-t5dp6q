import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IPerformanceState, HideViewerObjectiveApproval, ShowViewerObjectiveApproval, getObjectiveApprovalWorkflowData, LoadObjectiveMasterDataObjectiveApproval, getObjectiveApprovalObjectiveMasterData, ShowEditorObjectiveApproval, showEditorObjectiveApproval, HideEditorObjectiveApproval, LoadPerspectivelistObjectiveApproval, getObjectiveApprovalPerspectiveList, showViewerObjectiveApproval, DeleteObjectiveApproval, LoadHrObjectiveMasterDataObjectiveApproval } from '../../../store';
import { IObjectiveMasterDto, IPerspective } from '@nutela/models/talent/performance';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError } from '@nutela/core-services';
import { map } from 'rxjs/internal/operators/map';
import { IgxGridComponent } from 'igniteui-angular';
import { ObjectiveMasterViewerComponent } from '../../common/objective-master-viewer/objective-master-viewer.component';
import { take } from 'rxjs/operators';
import { FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ObjectiveApprovalService } from './objective-approval.service';
import { ObjectiveMasterEditorComponent } from '../../common/objective-master-editor/objective-master-editor.component';
import { OBJECTIVE_APPROVAL_ACTION_CONSTS } from '../../../constants';


@Component({
  selector: 'x365-fm-talent-objective-approval',
  templateUrl: './objective-approval.component.html',
  styleUrls: ['./objective-approval.component.scss'],
  providers: [ObjectiveApprovalService],
})
export class ObjectiveApprovalComponent implements OnInit {

  @ViewChild('viewer') viewer: ObjectiveMasterViewerComponent;
  @ViewChild('editor') editor: ObjectiveMasterEditorComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  dropDownFilterValue: string;
  public objectivesDataGrid: IgxGridComponent;
  showViewer$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  perspectivelist$: Observable<IPerspective[]>;
  isProcessingDataGrid$: Observable<boolean>;
  objectivesMasterData$: Observable<IObjectiveMasterDto[]>;
  workflowData$: Observable<any>;
  workFlowMsgId: number;
  objectiveData = [];

  constructor(private store: Store<IPerformanceState>, public service: ObjectiveApprovalService, private dialogBoxService: DialogBoxService, public router: Router, private route: ActivatedRoute, public location: Location) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.route.params.subscribe( params => {
      this.objectiveData['employee_id'] = params['employeeId'];
      this.objectiveData['plan_id'] = params['planId'];
      const actionType: number = +params['actionType']
      if(actionType === OBJECTIVE_APPROVAL_ACTION_CONSTS.loadLMObjectives){
        this.store.dispatch(new LoadObjectiveMasterDataObjectiveApproval({ employee_id: params['employeeId'], plan_id: params['planId'] }));
      } else if(actionType === OBJECTIVE_APPROVAL_ACTION_CONSTS.loadHRObjectives) {
        this.store.dispatch(new LoadHrObjectiveMasterDataObjectiveApproval({ employee_id: params['employeeId'], plan_id: params['planId'] }));
      } else {
        this.goBack();
      }
    }); 
    this.store.dispatch(new LoadPerspectivelistObjectiveApproval());

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorObjectiveApproval));
    this.showViewer$ = this.store.pipe(select(showViewerObjectiveApproval));
    this.workflowData$ = this.store.pipe(select(getObjectiveApprovalWorkflowData));
    this.perspectivelist$ = this.store.pipe(select(getObjectiveApprovalPerspectiveList));
    this.objectivesMasterData$ = this.store.pipe(select(getObjectiveApprovalObjectiveMasterData));
  }

  onCancelViewer(){
    this.store.dispatch(new HideViewerObjectiveApproval());
  }

  onApproveButtonClicked() {}

  onDeclineButtonClicked() {}

  goBack() {
    this.location.back();
  }

  onViewIconClicked(rowId: number){
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerObjectiveApproval());
        }
      );
  }

  onAddButtonClicked() {
    if(this.objectiveData['plan_id']){
      this.editor.data = null;
      this.editor.planID = this.objectiveData['plan_id'];
      this.editor.reset();
      this.store.dispatch(new ShowEditorObjectiveApproval());
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Invalid plan', options: toastOptionsError()}))
    }
  }

  onEditIconClicked(rowId: number){
    if(this.objectiveData['plan_id']){
      this.editor.data = null;
      this.editor.planID = this.objectiveData['plan_id'];

      this.getRowData$(rowId).pipe(take(1))
        .subscribe((result) => {
            this.editor.data = result;
            this.editor.reset();
            this.store.dispatch(new ShowEditorObjectiveApproval());
          }
        );
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Invalid plan', options: toastOptionsError()}))
    }
  }

  onDeleteIconClicked(rowId: number) {
    if(this.objectiveData['plan_id']){

      this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteObjectiveApproval({recordId: rowId, approvalInfo: this.objectiveData}));
        }
      });

    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Invalid Plan', options: toastOptionsError()}))
    }
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorObjectiveApproval());
  }

  getRowData$(rowId: number): Observable<IObjectiveMasterDto> {
    return this.objectivesMasterData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
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

  ngOnDestroy() {   
  }

}
