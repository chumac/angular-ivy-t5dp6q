import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { WorkHistoryEditorService } from './work-history-editor.service';
import { ProcessingHRWorkHistory, SaveHRWorkHistory, NotProcessingHRWorkHistory,
         isProcessingHRWorkHistory } from '../../../../store/employee-detailed-area';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogBoxCommandTypes, DialogService } from '@nutela/shared/ui';
import { IEmployeesProfileState } from '../../../../store/root';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-hr-work-history-editor',
  templateUrl: './hr-work-history-editor.component.html',
  styleUrls: ['./hr-work-history-editor.component.scss'],
  providers: [WorkHistoryEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrWorkHistoryEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public employeeId: number;

  @Input() public data: IPreviousEmployer;

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

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: WorkHistoryEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingHRWorkHistory));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onFileSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        attach_document: data.content,
        img_extension: data.extension,
        img_size: data.size
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onImageSelected($event){
    const data = $event;
    if (data) {
      this.fs.patch({
        attach_document: data.content,
        img_extension: data.extension,
        img_size: data.size
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      attach_document: null,
      img_extension: '',
      img_size: null
    });
  }


  onSubmit() {
    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          const recordId = this.data ? this.data.prev_id : 0;
          console.log('data', this.data);
          this.store.dispatch(new ProcessingHRWorkHistory());
          this.store.dispatch(new SaveHRWorkHistory({ data: <IPreviousEmployer>this.fs.value, recordId: recordId, editMode: this.inEditMode(), employeeId: this.employeeId }));
        }
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingHRWorkHistory());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.filePicker.removeFile();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
