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
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { EducationalHistoryEditorService } from './educational-history-editor.service';
import {
  NotProcessingEducation,
  isProcessingEducation,
  SaveEducation,
  ProcessingEducation,
  getEducationInstitutions,
  LoadInstitutionsEducation,
  LoadAllInstitutionsEducation
} from '@nutela/store/modules/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { INationality } from '@nutela/models/platform/lookup';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-educational-history-editor',
  templateUrl: './educational-history-editor.component.html',
  styleUrls: ['./educational-history-editor.component.scss'],
  providers: [EducationalHistoryEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationalHistoryEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

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
    public fs: EducationalHistoryEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingEducation));
    this.institutionList$ = this.store.pipe(select(getEducationInstitutions));
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
      this.store.dispatch(new LoadInstitutionsEducation({countryCode: data.value}));
    } else {
      this.store.dispatch(new LoadAllInstitutionsEducation());
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

  onInstitutionDropdownOpened($event) {
    this.fs.formToolTips.institutionToolTip = ''
  }
  onQualificationDropdownOpened() {
    this.fs.formToolTips.qualificationToolTip = ''
  }
  onImageSelected($event) {
    console.log($event);
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
          const recordId = this.data ? this.data.edu_id : 0;

          this.store.dispatch(new ProcessingEducation());
          this.store.dispatch(
            new SaveEducation({
              data: <IEducation>this.fs.value,
              recordId: recordId,
              editMode: this.inEditMode()
            })
          );
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
    this.store.dispatch(new NotProcessingEducation());
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
