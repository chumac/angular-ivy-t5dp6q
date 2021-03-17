import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ReboardWorkHistoryEditorService } from './reboard-work-history-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogService } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';
import { isProcessingReboardWorkHistory, ProcessingReboardWorkHistory, SaveReboardWorkHistory, NotProcessingReboardWorkHistory, SaveUpdateReboardWorkHistory } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-work-history-editor',
  templateUrl: './reboard-work-history-editor.component.html',
  styleUrls: ['./reboard-work-history-editor.component.scss'],
  providers: [ReboardWorkHistoryEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReboardWorkHistoryEditorComponent  extends BaseFormComponent
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
    public fs: ReboardWorkHistoryEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingReboardWorkHistory));
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

      this.store.dispatch(new ProcessingReboardWorkHistory());
      this.data ? this.store.dispatch(new SaveUpdateReboardWorkHistory({ data: <IPreviousEmployer>this.fs.value, recordId })) :
        this.store.dispatch(new SaveReboardWorkHistory({ data: <IPreviousEmployer>this.fs.value }));
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
    this.store.dispatch(new NotProcessingReboardWorkHistory());
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
