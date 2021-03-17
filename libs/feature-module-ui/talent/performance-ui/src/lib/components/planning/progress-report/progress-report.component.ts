import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { IPerformanceState, LoadSingleProgressInfoProgressReport, getSingleProgressDefinitionInfo, ResetComponentProgressDefinition, ProcessingProgressReport, isProcessingProgressReport, RemoveProgressDefinition, SetLMStatusProgressDefinition, SetSelectedEmployeeId, getIsLMStatusProgressReport, getManageObjectivesObjectiveMasterData } from '../../../store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { getProgressDefinitionInfo, LoadProgressInfoProgressReport, ShowProgressDefinitionEditor, showEditorProgressDefinition, HideProgressDefinitionEditor, showEditorProgressTransaction, ShowProgressTransactionEditor, HideProgressTransactionEditor, getProgressTransactionInfo, getObjectiveByIdInfo } from '../../../store/planning';
import { IProgressDefinition, IObjectiveMasterDto, IObjectiveMaster } from '@nutela/models/talent/performance';
import { ProgressDefinitionEditorComponent } from '../../common/progress-definition-editor/progress-definition-editor.component';
import { ProgressTransactionEditorComponent } from '../../common/progress-transaction-editor/progress-transaction-editor.component';
import { IProgressTransaction } from 'libs/models/talent/performance/src/lib/interfaces/progress-transaction.interface';
import * as constants from '../../../constants';
import { getReportsToEmployeePhoto } from '@nutela/store/modules/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'x365-fm-talent-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.scss']
})
export class ProgressReportComponent implements OnInit, OnDestroy {

  @ViewChild('progressDefinitionEditor') progressDefinitionEditor: ProgressDefinitionEditorComponent;
  @ViewChild('progressTransactionEditor') progressTransactionEditor: ProgressTransactionEditorComponent;
  isProcessing$: Observable<boolean>;
  objectiveByIdInfo$: Observable<IObjectiveMasterDto>;
  progressDefinitionInfo$: Observable<IProgressDefinition[]>;
  singleProgressDefinition$: Observable<IProgressDefinition>;
  progressTransactionInfo$: Observable<IProgressTransaction[]>;
  showProgressDefinitionEditor$: Observable<boolean>;
  showProgressTransactionEditor$: Observable<boolean>;
  objectiveId: number;
  progressTypeConstants = constants.progressTypeOptions;
  reportsToEmployeePhoto$: Observable<any>;
  isLineManager$: Observable<boolean>;
  
  constructor(private store: Store<IPerformanceState>, private location: Location, private dialogBoxService: DialogBoxService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLineManager$ = this.store.pipe(select(getIsLMStatusProgressReport)); // state to know if user is a line manager
    this.isLineManager$.pipe(take(1)).subscribe((isLM) => {
      if(false){ //isLM === null || isLM === undefined
        this.router.navigate([constants.MANAGE_OBJECTIVES_URLs.manageObjectiveUrl], { skipLocationChange: false });
      } else {
        this.route.params.subscribe( params => this.objectiveId = params['id']);
        this.storeSelects();
        this.storeDispatches();
      }
    });
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingProgressReport());
    this.store.dispatch(new LoadSingleProgressInfoProgressReport(this.objectiveId));
    this.store.dispatch(new LoadProgressInfoProgressReport(this.objectiveId));

  }

  storeSelects() {
    this.progressDefinitionInfo$ = this.store.pipe(select(getProgressDefinitionInfo));
    this.singleProgressDefinition$ = this.store.pipe(select(getSingleProgressDefinitionInfo));
    this.isProcessing$ = this.store.pipe(select(isProcessingProgressReport));
    this.progressTransactionInfo$ = this.store.pipe(select(getProgressTransactionInfo));
    this.showProgressDefinitionEditor$ = this.store.pipe(select(showEditorProgressDefinition));
    this.showProgressTransactionEditor$ = this.store.pipe(select(showEditorProgressTransaction));
    this.objectiveByIdInfo$ = this.store.pipe(select(getObjectiveByIdInfo));
    this.reportsToEmployeePhoto$ = this.store.pipe(select(getReportsToEmployeePhoto));
  }

  onAddButtonClicked(){
    this.progressDefinitionEditor.reset();
    this.store.dispatch(new ShowProgressDefinitionEditor());
  }

  onAddTransactionButtonClicked(defData: IProgressDefinition){
    this.progressTransactionEditor.definitionData = defData;
    this.progressDefinitionEditor.data = null;
    this.progressDefinitionEditor.reset();
    this.store.dispatch(new ShowProgressTransactionEditor());
  }

  onCancelProgressDefinitionEditor(){
    this.store.dispatch(new HideProgressDefinitionEditor());
  }

  onCancelProgressTransactionEditor(){
    this.store.dispatch(new HideProgressTransactionEditor());
  }

  onDefinitionDeleteIconClicked(data){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new RemoveProgressDefinition({recordId: data.id, objectiveId: data?data.objectiveInfo.id: null}));
      }
    }); 
  }

  get isEmployee(): boolean  {
    return false;
  }

  onBackButtonClicked(){
    this.location.back();
  }

  ngOnDestroy() {   
    this.store.dispatch(new ResetComponentProgressDefinition());
    this.store.dispatch(new SetLMStatusProgressDefinition({ status: false })); // used to reset isLineManager state to false
    this.store.dispatch(new SetSelectedEmployeeId({ employeeId: null })); // used to reset selectedEmployee state to null

  } 

}
 