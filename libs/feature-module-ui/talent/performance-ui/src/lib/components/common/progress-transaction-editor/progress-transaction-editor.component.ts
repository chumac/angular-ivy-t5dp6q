import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ProgressTransactionEditorService } from './progress-transaction-editor.service';
import { IPerformanceState, ProcessingLoadObjectives, isProcessingLoadObjectives, SaveLoadObjectives, LoadWeightBalance, getWeightBalance, ProcessingManageObjectives, SaveManageObjectives, EditManageObjectives, isProcessingManageObjectives, isProcessingProgressReport } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IObjectiveDto, IPerspective, IObjectiveMasterDto, IProgressDefinition, IProgressTransaction } from '@nutela/models/talent/performance';
import { DxLookupComponent } from 'devextreme-angular';
import * as constants from '../../../constants';
import { SaveProgressTransaction, ProcessingProgressReport } from '../../../store/planning';

@Component({
  selector: 'x365-fm-talent-progress-transaction-editor',
  templateUrl: './progress-transaction-editor.component.html',
  styleUrls: ['./progress-transaction-editor.component.scss'],
  providers: [ProgressTransactionEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressTransactionEditorComponent  extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public definitionData: IProgressDefinition;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  progressTypeOptions = constants.progressTypeOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: ProgressTransactionEditorService, private store: Store<IPerformanceState>) {
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

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        doc_binary: data.content,
        doc_extension: data.extension,
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved(data: any) {
    this.fs.patch({
      doc_binary: '',
      doc_extension: '',
    });
  }

  onCancel() {
    this.reset();
    this.cancelClick.emit();
  }

  onSubmit(){
    if (this.fs.valid) {
      this.fs.progressTypeId.setValue(this.definitionData.id);
      // this.fs.progressType.setValue(this.definitionData.progress_type);
      this.store.dispatch(new ProcessingProgressReport());
      this.store.dispatch(new SaveProgressTransaction({progressTransData: <IProgressTransaction>this.fs.value, objectiveId: this.definitionData.objectiveInfo.id}));
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
