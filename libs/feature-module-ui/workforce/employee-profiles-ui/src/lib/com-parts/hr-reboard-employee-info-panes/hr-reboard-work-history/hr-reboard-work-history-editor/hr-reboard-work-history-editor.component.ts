import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { HrReboardWorkHistoryEditorService } from './hr-reboard-work-history-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogService } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';
import { SaveHrReboardWorkHistory, SaveUpdateHrReboardWorkHistory, isProcessingHrReboardWorkHistory, ProcessingHrReboardWorkHistory, NotProcessingHrReboardWorkHistory } from '../../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-work-history-editor',
  templateUrl: './hr-reboard-work-history-editor.component.html',
  styleUrls: ['./hr-reboard-work-history-editor.component.scss'],
  providers: [HrReboardWorkHistoryEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrReboardWorkHistoryEditorComponent  extends BaseFormComponent
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
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: HrReboardWorkHistoryEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingHrReboardWorkHistory));
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

      const recordId = this.data ? this.data.prev_id : 0;

      this.store.dispatch(new ProcessingHrReboardWorkHistory());
      this.data ? this.store.dispatch(new SaveUpdateHrReboardWorkHistory({ data: <IPreviousEmployer>this.fs.value, recordId, employeeId: this.employeeId})) :
      this.store.dispatch(new SaveHrReboardWorkHistory({ data: <IPreviousEmployer>this.fs.value, employeeId: this.employeeId }));

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
    this.store.dispatch(new NotProcessingHrReboardWorkHistory());
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
