
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
  IProfessionalQualification
} from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ReboardProQualificationsEditorService } from './reboard-pro-qualifications-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { getProfessionalInstitutions } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';
import { isProcessingReboardProfessionalQualifications, ProcessingReboardProfessionalQualifications, SaveReboardProfessionalQualifications, NotProcessingReboardProfessionalQualifications, SaveUpdateReboardProfessionalQualifications } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-pro-qualifications-editor',
  templateUrl: './reboard-pro-qualifications-editor.component.html',
  styleUrls: ['./reboard-pro-qualifications-editor.component.scss'],
  providers: [ReboardProQualificationsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReboardProQualificationsEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfessionalQualification;

  @Input() public selectOptionData: ISelectOptionData;
  @Input() public institutions: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;
  qualifications$: Observable<ISelectOption[]>;

  constructor(
    public fs: ReboardProQualificationsEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {

    this.isProcessing$ = this.store.pipe(select(isProcessingReboardProfessionalQualifications));
    this.qualifications$ = this.store.pipe(select(getProfessionalInstitutions));

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
        certificate_picture: data.data,
        img_extension: data.extension || FILE_EXTENSIONS.png,
        img_size: data.size
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      certificate_picture: null,
      img_extension: '',
      img_size: null
    });
  }

  onSubmit() {
    if (this.fs.valid) {
      const recordId = this.data ? this.data.proqual_id : 0;

      this.store.dispatch(new ProcessingReboardProfessionalQualifications());
      this.data ? this.store.dispatch(new SaveUpdateReboardProfessionalQualifications({ data: <IProfessionalQualification>this.fs.value, recordId })) :
        this.store.dispatch(new SaveReboardProfessionalQualifications({ data: <IProfessionalQualification>this.fs.value }));
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(),
          type: ToastTypes.ERROR
        })
      );
    }
  }

  onQualificationDropdownOpened($event) {
    this.fs.formToolTips.qualificationToolTip = '';
  }

  onInstitutionDropdownOpened($event) {
    this.fs.formToolTips.institutionToolTip = '';
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(
      this.validate(this.fs.f, this.fs.validationMessages)
    );
  }

  onQualificationSelected(item: any) {
    this.fs.setToolTip('qualification', item.label)
  }

  onInstitutionSelected(item: any) {
    this.fs.setToolTip('institution', item.label)
  }

  onCancel() {
    this.store.dispatch(new NotProcessingReboardProfessionalQualifications());
    this.data = null;
    this.reset();
    this.imagePicker.removeFile();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
    this.fs.resetToolTipTexts();
  }

  ngOnDestroy() {}
}
