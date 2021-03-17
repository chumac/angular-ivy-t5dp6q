
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

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ReboardProfilePictureEditorService } from './reboard-profile-picture-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { ImagePickerComponent, DialogService } from '@nutela/shared/ui';
import { IProfilePicture, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { take } from 'rxjs/operators';
import { isProcessingReboardProfilePicture, getReboardComprehensiveData, ProcessingReboardProfilePicture, SaveReboardProfilePicture, NotProcessingReboardProfilePicture } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-profile-picture-editor',
  templateUrl: './reboard-profile-picture-editor.component.html',
  styleUrls: ['./reboard-profile-picture-editor.component.scss'],
  providers: [ReboardProfilePictureEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReboardProfilePictureEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IProfilePicture;
  @Input() public employeeId: number;
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
  isProcessing$: Observable<boolean>;

  constructor(
    public fs: ReboardProfilePictureEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
  ) {
    super();
  }

  ngOnInit() {
   this.isProcessing$ = this.store.pipe(select(isProcessingReboardProfilePicture));
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
        employee_id: this.employeeId,
        image: data.data
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      employee_id: null,
      image: null
    });
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingReboardProfilePicture());
      this.store.dispatch(new SaveReboardProfilePicture(<IProfilePicture>this.fs.value));
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
    this.store.dispatch(new NotProcessingReboardProfilePicture());
    this.data = null;
    this.reset();
    this.imagePicker.removeFile();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
   // this.fs.init(this.data, this.employee_id);
  }

  ngOnDestroy() {}
}
