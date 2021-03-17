import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService, formatDate, ExternalLookupService } from '@nutela/core-services';
import { ReboardPersonalInfoEditorService } from './reboard-personal-info-editor.service';
import { IAppState } from '@nutela/store/app-state';
import {ISelectOption, IStateSelectOption} from '@nutela/models/core-data';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import * as constants from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { FilePickerComponent, DialogService, ImagePickerComponent } from '@nutela/shared/ui';
import { getCountries, blockUpdatesToGender, blockUpdatesToDateOfBirth } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';
import { isProcessingReboardGeneral, SaveReboardGeneral, ProcessingReboardGeneral, NotProcessingReboardGeneral, SaveUpdateReboardGeneral } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-personal-info-editor',
  templateUrl: './reboard-personal-info-editor.component.html',
  styleUrls: ['./reboard-personal-info-editor.component.scss'],
  providers: [ReboardPersonalInfoEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReboardPersonalInfoEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGeneral;

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
      this.toggleStatusGenderMaidenNameWeddingAnniversary();
    }
    if(this.show && this.data) {
      this.setBirthCountryLists(this.data);
      this.setNationalityLists(this.data);
    }
    if (this.show == false) {
      this.imagePicker.removeFile();
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;
  approvedData$: Observable<IGeneral>;
  blockUpdatesToDateOfBirth$: Observable<string>;
  blockUpdatesToGender$: Observable<string>;

  countries$: Observable<ISelectOption[]>;
  birthStateList$: Observable<IStateSelectOption[]>;
  birthCityList$: Observable<ISelectOption[]>;

  stateOfOriginList$: Observable<IStateSelectOption[]>;
  lgaList$: Observable<ISelectOption[]>;

  constructor(
    public fs: ReboardPersonalInfoEditorService,
    public utilService: UtilService,
    private externalLookupService: ExternalLookupService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.cd.markForCheck();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingReboardGeneral));
    this.countries$ = this.store.pipe(select(getCountries));
    this.blockUpdatesToDateOfBirth$ = this.store.pipe(select(blockUpdatesToDateOfBirth));
    this.blockUpdatesToGender$ = this.store.pipe(select(blockUpdatesToGender));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true
    } else {
      return false;
    }
  }
  onTitleSelected($event) {
    this.setTitleByGender($event.label);
    this.toggleStatusGenderMaidenNameWeddingAnniversary();
  }

  onGenderSelected($event) {
    this.toggleStatusGenderMaidenNameWeddingAnniversary();
  }

  onMaritalStatusSelected($event) {
    this.toggleStatusGenderMaidenNameWeddingAnniversary();
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

  isGenderNeutral(): boolean {
    const title = this.fs.title.value || '';

    if (title === constants.TITLE.dr) {
      return true;
    } else {
      return false;
    }
  }

  isMaidenNameInputRequired(): boolean {
    const title = this.fs.title.value || '';
    const gender = this.fs.gender.value || '';
    const maritalStatus = this.fs.maritalStatus.value || '';

    if (title === constants.TITLE.miss) {
      return false;
    } else if (
      (maritalStatus === constants.MARITAL_STATUS.married &&
        gender === constants.GENDER.female) ||
      (maritalStatus === constants.MARITAL_STATUS.divorced &&
        gender === constants.GENDER.female) ||
      (maritalStatus === constants.MARITAL_STATUS.separated &&
        gender === constants.GENDER.female)
    ) {
      return true;
    } else {
      return false;
    }
  }

  isWeddingAnniversaryInputRequired(): boolean {
    const title = this.fs.title.value || '';
    const maritalStatus = this.fs.maritalStatus.value || '';

    if (
      maritalStatus === constants.MARITAL_STATUS.married &&
      title !== constants.TITLE.miss
    ) {
      return true;
    } else {
      return false;
    }
  }

  toggleStatusGenderMaidenNameWeddingAnniversary() {
    this.toggleStatusGender();
    this.toggleStatusMaidenName();
    this.toggleStatusWeddingAnniversary();
  }

  toggleStatusGender() {
    if (this.isGenderNeutral()) {
      this.fs.gender.enable();
    } else {
      this.fs.gender.disable();
    }
  }

  toggleStatusMaidenName() {
    if (this.isMaidenNameInputRequired()) {
      this.fs.maidenName.enable();
    } else {
      this.fs.maidenName.disable();
    }
  }

  toggleStatusWeddingAnniversary() {
    if (this.isWeddingAnniversaryInputRequired()) {
      this.fs.weddingAnniversary.enable();
    } else {
      this.fs.weddingAnniversary.disable();
    }
  }

  onBirthCountrySelected($event) {
    this.birthStateList$ = this.externalLookupService.loadStateList($event.value);
    this.fs.birthState.setValue(null);
    this.fs.birthCity.setValue(null);
  }

  onBirthStateSelected($event) {
    this.birthCityList$ = this.externalLookupService.loadCityList($event.value);
    this.fs.birthCity.setValue(null);
  }

  onNationalitySelected($event) {
    this.stateOfOriginList$ = this.externalLookupService.loadStateList($event.value);
    this.fs.stateOfOrigin.setValue(null);
    this.fs.lga.setValue(null);
  }

  onStateSelected($event) {
    this.lgaList$ = this.externalLookupService.loadLGAList($event.value);
    this.fs.lga.setValue(null);
  }

  setBirthCountryLists(data: IGeneral) {
    if (data.BirthCountryInfo) {
      let countryId = data.BirthCountryInfo.nationality_id;
      if (countryId) {
        this.birthStateList$ = this.externalLookupService.loadStateList(countryId);
      }
    };

    if (data.BirthStateInfo) {
      let stateId = data.BirthStateInfo.state_id;
      if (stateId) {
        this.birthCityList$ = this.externalLookupService.loadCityList(stateId);
      }
    }
  }

  setNationalityLists(data: IGeneral) {
    console.log(data.NationalityInfo ? data.NationalityInfo : data)
    if (data.NationalityInfo) {
      let countryId = data.NationalityInfo.nationality_id;
      if (countryId) {
        this.stateOfOriginList$ = this.externalLookupService.loadStateList(countryId);
      }
    }

    if (data.StateInfo) {
      let stateId = data.StateInfo.state_id;
      if (stateId) {
        this.lgaList$ = this.externalLookupService.loadLGAList(stateId);
      }
    }
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        additional_document: data.content,
        img_extension: data.extension,
        img_size: data.size
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onImageSelected($event) {
    const data = $event;
    console.log(data);
    if (data) {
      this.fs.patch({
        image_profile: data.data
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      image_profile: null
    });
  }

  onSubmit() {

    if (this.fs.valid) {
      this.store.dispatch(new ProcessingReboardGeneral());

      this.fs.dateOfBirth.setValue(formatDate(this.fs.dateOfBirth.value));
      this.store.dispatch(new SaveUpdateReboardGeneral({ data: <IGeneral>this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingReboardGeneral());
    this.reset();
    this.filePicker.removeFile();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
