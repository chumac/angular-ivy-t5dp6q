import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ProcessFormDefinitionsEditorService } from './process-form-definitions-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import * as constants from '../../../../constants';
import { ISelectOption } from '@nutela/models/core-data';
import { IProcessFormDefinition, ICustomFormEligibility, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';
import { isProcessingProcessFormDefinition, ProcessingProcessFormDefinition, SaveProcessFormDefinition, AddProcessFormDefinition, NotProcessingProcessFormDefinition, getProcessFormArea } from '../../../../store/processes/process-form-definition';
import { IAppState } from '@nutela/store/app-state';
import { IWorkDefinition } from '@nutela/models/foundation';
import { getCustomFormEligibilityList, getCustomFormWorkFlowList } from '../../../../store/processes/custom-form';


@Component({
  selector: 'x365-fm-workforce-process-form-definitions-editor',
  templateUrl: './process-form-definitions-editor.component.html',
  styleUrls: ['./process-form-definitions-editor.component.scss'],
  providers: [ProcessFormDefinitionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ProcessFormDefinitionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IProcessFormDefinition;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  workFlowList$: Observable<IWorkDefinition[]>;
  areaList$: Observable<IProcessFormArea[]>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: ProcessFormDefinitionsEditorService, private store: Store<IAppState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingProcessFormDefinition));
    this.workFlowList$ = this.store.pipe(select(getCustomFormWorkFlowList));
    this.areaList$ = this.store.pipe(select(getProcessFormArea));


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

  onImageSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        title_art: data.data
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      title_art: null
    });
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingProcessFormDefinition());
        this.store.dispatch(new SaveProcessFormDefinition({data: <IProcessFormDefinition>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingProcessFormDefinition());
        this.store.dispatch(new AddProcessFormDefinition({data: <IProcessFormDefinition>this.fs.value }));
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
