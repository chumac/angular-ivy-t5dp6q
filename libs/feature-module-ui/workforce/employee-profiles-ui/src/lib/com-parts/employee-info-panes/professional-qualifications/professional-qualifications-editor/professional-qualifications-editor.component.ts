
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
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ProfessionalQualificationsEditorService } from './professional-qualifications-editor.service';
import {
  ProcessingProfessionalQualifications,
  SaveProfessionalQualifications,
  NotProcessingProfessionalQualifications,
  isProcessingProfessionalQualifications
} from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IQualification } from '@nutela/models/talent/learning';
import { getProfessionalInstitutions } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-professional-qualifications-editor',
  templateUrl: './professional-qualifications-editor.component.html',
  styleUrls: ['./professional-qualifications-editor.component.scss'],
  providers: [ProfessionalQualificationsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalQualificationsEditorComponent extends BaseFormComponent
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
    public fs: ProfessionalQualificationsEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {

    this.isProcessing$ = this.store.pipe(select(isProcessingProfessionalQualifications));
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
    this.dialogBoxService.show(`This action will submit the record for approval. Continue?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          if (this.fs.valid) {
            const recordId = this.data ? this.data.proqual_id : 0;

            this.store.dispatch(new ProcessingProfessionalQualifications());
            this.store.dispatch(
              new SaveProfessionalQualifications({
                data: <IProfessionalQualification>this.fs.value,
                recordId: recordId,
                editMode: this.inEditMode()
              })
            );
          } else {
            this.store.dispatch(
              new ShowToast({
                title: 'Correct the following Errors',
                message: this.getErrorMessage(),
                options: toastOptionsError()
              })
            );
          }
        }
      });
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
    this.store.dispatch(new NotProcessingProfessionalQualifications());
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
