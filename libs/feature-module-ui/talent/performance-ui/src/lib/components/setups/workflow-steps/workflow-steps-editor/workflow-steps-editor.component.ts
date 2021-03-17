import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { WorkflowStepsEditorService } from './workflow-steps-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IWorkflowStep } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingWorkflowStep, ProcessingWorkflowStep, SaveWorkflowStep, AddWorkflowStep, getDefinitionWorkflowStepData, LoadDefinitionWorkflowStep } from '../../../../store';
import { ISelectOption } from '@nutela/models/core-data';


@Component({
  selector: 'x365-fm-talent-workflow-steps-editor',
  templateUrl: './workflow-steps-editor.component.html',
  styleUrls: ['./workflow-steps-editor.component.scss'],
  providers: [WorkflowStepsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class WorkflowStepsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IWorkflowStep;
  @Input() public workFlowId: number;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  workflowDefinitionList$: Observable<ISelectOption[]>;
  roleOpts;
  stepOpts;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(changes['show'] && (this.show === true)) {
      this.fs.workflowId.setValue(this.workFlowId);
    }
  }

  constructor(public utilService: UtilService, public fs: WorkflowStepsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingWorkflowStep));
    this.workflowDefinitionList$ = this.store.pipe(select(getDefinitionWorkflowStepData));
    this.store.dispatch(new LoadDefinitionWorkflowStep());
    this.roleOpts = constants.roleOptions;
    this.stepOpts = constants.stepOptions;

  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingWorkflowStep());
        this.store.dispatch(new SaveWorkflowStep({data: <IWorkflowStep>this.fs.value, recordId: recordId, editMode: this.inEditMode(), workFlowId: this.workFlowId }));
      } else {
        this.store.dispatch(new ProcessingWorkflowStep());
        this.store.dispatch(new AddWorkflowStep({data: <IWorkflowStep>this.fs.value, workFlowId: this.workFlowId  }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
