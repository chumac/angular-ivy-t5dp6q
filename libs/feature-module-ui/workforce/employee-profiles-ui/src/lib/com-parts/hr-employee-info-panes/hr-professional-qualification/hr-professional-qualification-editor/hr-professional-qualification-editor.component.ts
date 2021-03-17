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
import { ProfessionalQualificationsEditorService } from './professional-qualifications-editor.service';
import {
  ProcessingProfessionalQualifications,
  SaveProfessionalQualifications,
  NotProcessingProfessionalQualifications,
  isProcessingProfessionalQualifications
} from '../../../../store/employee-detailed-area';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IEmployeesProfileState } from '../../../../store/root';
import { take } from 'rxjs/operators';
import { getProfessionalInstitutions } from '@nutela/store/modules/foundation';


@Component({
  selector: 'x365-fm-workforce-hr-professional-qualification-editor',
  templateUrl: './hr-professional-qualification-editor.component.html',
  styleUrls: ['./hr-professional-qualification-editor.component.scss'],
  providers: [ProfessionalQualificationsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrProfessionalQualificationEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfessionalQualification;
  @Input() public employeeId: number;

  @Input() public selectOptionData: ISelectOptionData;
  @Input() public institutions: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;
  showRenewalDate: boolean = true;
  qualifications$: Observable<ISelectOption[]>;
  longTextTest: ISelectOption[] = [
    {
      label: 'This is a dummy long text I want to use to test this dropdown This is a dummy',
    value: '1'
    },
    {
    label: 'This is a dummy long text I want to use to test this dropdown',
    value: '1'
    },
  ]

  constructor(
    public fs: ProfessionalQualificationsEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
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

  onQualificationSelected(item: any) {
    this.fs.setToolTip('qualification', item.label)
  }

  onInstitutionSelected(item: any) {
    this.fs.setToolTip('institution', item.label)
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
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          const recordId = this.data ? this.data.proqual_id : 0;

          this.store.dispatch(new ProcessingProfessionalQualifications());
          this.store.dispatch(
            new SaveProfessionalQualifications({
              data: <IProfessionalQualification>this.fs.value,
              recordId: recordId,
              editMode: this.inEditMode(),
              employeeId: this.employeeId
            })
          );
        }
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
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

  onCancel() {
    this.store.dispatch(new NotProcessingProfessionalQualifications());
    this.data = null;
    this.reset();
    this.imagePicker.removeFile();
    this.cancelClick.emit();
  }

  reset() {
    // this.fs.f.reset();
    this.fs.form=this.fs.buildForm();
    this.fs.init(this.data);
    this.fs.resetToolTipTexts();
  }

  ngOnDestroy() {}
}
