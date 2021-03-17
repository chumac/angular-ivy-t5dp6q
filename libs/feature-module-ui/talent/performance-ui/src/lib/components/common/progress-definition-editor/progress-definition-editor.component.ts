import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ProgressDefinitionEditorService } from './progress-definition-editor.service';
import { IPerformanceState, ProcessingLoadObjectives, isProcessingLoadObjectives, SaveLoadObjectives, LoadWeightBalance, getWeightBalance, ProcessingManageObjectives, SaveManageObjectives, EditManageObjectives, isProcessingManageObjectives } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IProgressDefinition } from '@nutela/models/talent/performance';
import { DxLookupComponent } from 'devextreme-angular';
import * as constants from '../../../constants';
import { SaveProgressDefinition, ProcessingProgressReport, isProcessingProgressReport } from '../../../store/planning';

@Component({
  selector: 'x365-fm-talent-progress-definition-editor',
  templateUrl: './progress-definition-editor.component.html',
  styleUrls: ['./progress-definition-editor.component.scss'],
  providers: [ProgressDefinitionEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ProgressDefinitionEditorComponent  extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public objectiveId: any;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  progressTypeOptions = constants.progressTypeOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: ProgressDefinitionEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingProgressReport));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() { 
    this.reset();
    this.cancelClick.emit();
  }

  onSubmit(){
    if (this.fs.valid) {
      this.fs.objectiveId.setValue(this.objectiveId);
      this.store.dispatch(new ProcessingProgressReport());
      this.store.dispatch(new SaveProgressDefinition({progressDefData: <IProgressDefinition>this.fs.value}));
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }


}
