import { Component, OnInit, OnDestroy, Input, Output, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IWorkDefinition } from '@nutela/models/foundation';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { WorkflowDefinitionEditorService } from './workflow-definition-editor.service';
import { IHRFoundationState } from '../../../store/root';
import { isProcessingWorkDefinition } from '../../../store/workflow-definition/work-definition.selectors';
import { ProcessingWorkDefinition, SaveWorkDefinition, NotProcessingWorkDefinition, UpdateWorkDefinition } from '../../../store/workflow-definition';
import { ShowToast } from '@nutela/store/shared';





@Component({
  selector: 'x365-fm-plf-hrf-workflow-definition-editor',
  templateUrl: './workflow-definition-editor.component.html',
  styleUrls: ['./workflow-definition-editor.component.scss']
})
export class WorkflowDefinitionEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IWorkDefinition;


  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  isProcessing$: Observable<boolean>;
  constructor(
    public fs: WorkflowDefinitionEditorService,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingWorkDefinition));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      if (this.fs.valid) {
        console.log(this.fs.value);
        const recordId = this.data? this.data.wflow_id: 0;
        this.store.dispatch(new ProcessingWorkDefinition());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveWorkDefinition({data: this.fs.value, recordId: recordId}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateWorkDefinition({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingWorkDefinition());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }
}
