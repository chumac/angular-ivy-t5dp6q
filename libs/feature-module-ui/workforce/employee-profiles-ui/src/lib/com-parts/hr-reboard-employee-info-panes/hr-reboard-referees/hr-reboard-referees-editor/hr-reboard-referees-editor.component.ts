
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  IReferee
} from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { HrReboardRefereesEditorService } from './hr-reboard-referees-editor.service';
import * as constants from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { FilePickerComponent, ImagePickerComponent, DialogService } from '@nutela/shared/ui';
import { isProcessingHrReboardReferee, ProcessingHrReboardReferee, SaveHrReboardReferee, NotProcessingHrReboardReferee, SaveUpdateHrReboardReferee } from '../../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-referees-editor',
  templateUrl: './hr-reboard-referees-editor.component.html',
  styleUrls: ['./hr-reboard-referees-editor.component.scss'],
  providers: [HrReboardRefereesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrReboardRefereesEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public employeeId: number;

  @Input() public data: IReferee;

  @Input() public selectOptionData: ISelectOptionData;
  @Input() public institutions: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: HrReboardRefereesEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingHrReboardReferee));
    this.toggleStatusGender();
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onTitleSelected($event) {
    this.setTitleByGender($event.label);
    this.toggleStatusGender();
  }

  setTitleByGender(title: string) {
    if (title === constants.TITLE.mr) {
      this.fs.gender.setValue(constants.GENDER.male);
    } else if (
      title === constants.TITLE.miss ||
      title === constants.TITLE.mrs ||
      title === constants.TITLE.ms
    ) {
      this.fs.gender.setValue(constants.GENDER.female);
    }
  }

  toggleStatusGender() {
    if (this.isGenderNeutral()) {
      this.fs.gender.enable();
    } else {
      this.fs.gender.disable();
    }
  }

  isGenderNeutral(): boolean {
    const title = this.fs.title.value || '';

    if (title === constants.TITLE.dr) {
      return true;
    } else {
      return false;
    }
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        attach_document: data.content,
        img_extension_document: data.extension,
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  getNumberError(message: string) {
    this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: message, type: ToastTypes.ERROR }));
  }

  onFileRemoved() {
    this.fs.patch({
      attach_document: null,
      img_extension_passport: '',
    });
  }

  onImageSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        passport_picture: data.data,
        img_extension_passport: data.fileExt || FILE_EXTENSIONS.png,
        img_size: data.size
      });
    }
  }

  onImageRemoved() {
    this.fs.patch({
      passport_picture: null,
      img_extension_passport: '',
      img_size: null
    });
  }

  onSubmit() {
    this.fs.convertToLowerCase();
    if (this.fs.valid) {
      const recordId = this.data ? this.data.ref_id : 0;

      this.store.dispatch(new ProcessingHrReboardReferee());
      this.data ? this.store.dispatch(new SaveUpdateHrReboardReferee({ data: <IReferee>this.fs.value, recordId, employeeId: this.employeeId })) :
        this.store.dispatch(new SaveHrReboardReferee({ data: <IReferee>this.fs.value, employeeId: this.employeeId }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(
      this.validate(this.fs.f, this.fs.validationMessages)
    );
  }

  onCancel() {
    this.store.dispatch(new NotProcessingHrReboardReferee());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.filePicker.removeFile();
    this.imagePicker.removeFile();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}
}
