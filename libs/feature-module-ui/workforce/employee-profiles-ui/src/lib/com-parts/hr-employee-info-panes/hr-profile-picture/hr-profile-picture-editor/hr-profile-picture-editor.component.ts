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

import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError, toastOptionsInformation } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ProfilePictureEditorService } from './profile-picture-editor.service';
// import { ProcessingImage, getComprehensiveData, SaveEmployeePhoto, isProcessingImage, NotProcessingImage } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IProfilePicture, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { isUndefined } from 'util';
import { getComprehensiveData, ProcessingImage, SaveEmployeePhoto, NotProcessingImage, isProcessingImage } from '../../../../store/employee-detailed-area';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-hr-profile-picture-editor',
  templateUrl: './hr-profile-picture-editor.component.html',
  styleUrls: ['./hr-profile-picture-editor.component.scss'],
  providers: [ProfilePictureEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrProfilePictureEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfilePicture;

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      // this.fs.init(this.data, this.employee_id);
    }
    if (this.show == false) {
      this.imagePicker.removeFile();
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;
  @ViewChild('fileImagePicker') fileImagePicker: ImagePickerComponent;

  employee_id: number;
  isProcessing$: Observable<boolean>;
  comprehensiveData$: Observable<IComprehensiveData>;

  constructor(
    public fs: ProfilePictureEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
   this.isProcessing$ = this.store.pipe(select(isProcessingImage));
   this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
   this.comprehensiveData$.subscribe((data: IComprehensiveData) => {
    if (data) {
      const comprehensiveData = <IComprehensiveData>(data);
      this.employee_id = comprehensiveData.employee_id;
    } else {
      // this.store.dispatch(
      //   new ShowToast({
      //     title: null,
      //     message:
      //       'Error !!!',
      //     options: toastOptionsInformation()
      //   })
      // );
    }
  });
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onImageSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        employee_id: this.employee_id,
        image: data.data
      });
      if (this.fs.employeeId.value === null || this.fs.employeeId.value === '') {
        this.fs.employeeId.setValue(this.employee_id);
      }
    }
  }

  onFileImageSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        employee_id: this.employee_id,
        image_personal: data.data
      });
      if (this.fs.employeeId.value === null || this.fs.employeeId.value === '') {
        this.fs.employeeId.setValue(this.employee_id);
      }
    }
  }

  onFileRemoved() {
    this.fs.patch({
      employee_id: null,
      image: null
    });
  }

  onFileImageRemoved() {
    this.fs.patch({
      employee_id: null,
      image_personal: null
    });
  }

  onSubmit() {

    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingImage());
          this.store.dispatch(new SaveEmployeePhoto({ employeeId: this.employee_id, data: <IProfilePicture>this.fs.value }));
        }
      });
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
    this.store.dispatch(new NotProcessingImage());
    this.data = null;
    this.reset();
    this.imagePicker.removeFile();
    this.fileImagePicker.removeFile();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
   // this.fs.init(this.data, this.employee_id);
  }

  ngOnDestroy() {}
}
