import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { WorkHistoryEditorService } from './work-history-editor.service';
import { ProcessingWorkHistory, SaveWorkHistory, NotProcessingWorkHistory, isProcessingWorkHistory } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogBoxCommandTypes, DialogService } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-work-history-editor',
  templateUrl: './work-history-editor.component.html',
  styleUrls: ['./work-history-editor.component.scss'],
  providers: [WorkHistoryEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkHistoryEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPreviousEmployer;

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: WorkHistoryEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingWorkHistory));
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
        attach_document: data.content,
        img_extension: data.extension,
        img_size: data.size
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved(data: any) {
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

          this.store.dispatch(new ProcessingWorkHistory());
          this.store.dispatch(new SaveWorkHistory({ data: <IPreviousEmployer>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
        }
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  transformVal() {
    this.fs.startSalary.setValue(new Number(this.fs.startSalary.value).toLocaleString());
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingWorkHistory());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.form = this.fs.buildForm();
    this.filePicker.removeFile();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
