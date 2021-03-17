import { Component, OnInit, OnDestroy, Input, Output, SimpleChanges, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import {  IWorkflowMap, ISystem, IWorkDefinition } from '@nutela/models/foundation';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IHRFoundationState } from '../../../store/root';
import { WorkflowMapEditorService } from './workflow-map-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { NotProcessingWorkflowMap, ProcessingWorkflowMap, SaveWorkflowMap, isProcessingWorkflowMap } from '../../../store/workflow-map';

@Component({
  selector: 'x365-fm-plf-hrf-workflow-map-editor',
  templateUrl: './workflow-map-editor.component.html',
  styleUrls: ['./workflow-map-editor.component.scss'],
  providers: [ WorkflowMapEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowMapEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IWorkflowMap;
  @Input() public sysOption: ISystem[];
  @Input() public workOption: IWorkDefinition[];

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    // console.log('opt',this.sysOption);
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }

  }
  isProcessing$: Observable<boolean>;
  constructor(
    public fs: WorkflowMapEditorService,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingWorkflowMap));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {

      console.log('form value', this.fs.value);
      if (this.fs.valid) {
      //  const recordId = this.fs.Work_id.value;
      const recordId=this.data? this.data.wflow_id:0;
        this.store.dispatch(new ProcessingWorkflowMap());
        this.store.dispatch(new SaveWorkflowMap({data: this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
      }
      else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingWorkflowMap());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

  onWork($event){
    console.log('event from console workdef', $event.value);
  }
  onSystem($event){
    console.log('event from console system', $event.value);
  }
}
