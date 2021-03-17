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
  IEducation
} from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { HrReboardEduHistoryEditorService } from './hr-reboard-edu-history-editor.service';
import { ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { INationality } from '@nutela/models/platform/lookup';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { take } from 'rxjs/operators';
import { NotProcessingHrReboardEducation, ProcessingHrReboardEducation, SaveHrReboardEducation, LoadInstitutionsHrReboardEducation, LoadAllInstitutionsHrReboardEducation, isProcessingHrReboardEducation, getHrReboardEducationInstitutions, SaveUpdateHrReboardEducation } from '../../../../store/hr-reboard-data';


@Component({
  selector: 'x365-fm-workforce-hr-reboard-edu-history-editor',
  templateUrl: './hr-reboard-edu-history-editor.component.html',
  styleUrls: ['./hr-reboard-edu-history-editor.component.scss'],
  providers: [HrReboardEduHistoryEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrReboardEduHistoryEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public employeeId: number;

  @Input() public data: IEducation;

  @Input() public selectOptionData: ISelectOptionData;
  @Input() public institutions: ISelectOption[];
  @Input() public countryList: ISelectOption[];
  @Input() public courses: ISelectOption[];
  @Input() public faculties: ISelectOption[];
  @Input() public departments: ISelectOption[];
  @Input() public allowFacultyChoiceList: any;
  @Input() public allowDepartmentChoiceList: any;
  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;
  @ViewChild('institutionLookup') institutionLookup: DxLookupComponent;


  isProcessing$: Observable<boolean>;
  institutionList$: Observable<INationality[]>;

  constructor(
    public fs: HrReboardEduHistoryEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingHrReboardEducation));
    this.institutionList$ = this.store.pipe(select(getHrReboardEducationInstitutions));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCountrySelected(data) {
    if(data.value){
      this.store.dispatch(new LoadInstitutionsHrReboardEducation({countryCode: data.value}));
    } else {
      this.store.dispatch(new LoadAllInstitutionsHrReboardEducation());
    }
  }

  onInstitutionSelected(data: any) {
    this.fs.setToolTip('institution', data.component.innerText);
    this.fs.location.setValue(this.institutionLookup.selectedItem?this.institutionLookup.selectedItem.city_location:null);
  }

  onQualificationSelected(data: any) {
    this.fs.setToolTip('qualification', data.label);
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        certificate_picture: data.content,
        img_extension: data.extension,
        img_size: data.size
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onInstitutionDropdownOpened() {
    this.fs.formToolTips.institutionToolTip = ''
  }
  onQualificationDropdownOpened() {
    this.fs.formToolTips.qualificationToolTip = ''
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
      const recordId = this.data ? this.data.edu_id : 0;

      this.store.dispatch(new ProcessingHrReboardEducation());
      this.data ? this.store.dispatch(new SaveUpdateHrReboardEducation({ data: <IEducation>this.fs.value, recordId, employeeId: this.employeeId })) : this.store.dispatch(new SaveHrReboardEducation({ data: <IEducation>this.fs.value, employeeId: this.employeeId }));
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
    this.store.dispatch(new NotProcessingHrReboardEducation());
    this.data = null;
    this.reset();

    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.imagePicker.removeFile();
    this.fs.init(this.data);
    this.fs.resetToolTipTexts();
  }

  ngOnDestroy() {}
}
