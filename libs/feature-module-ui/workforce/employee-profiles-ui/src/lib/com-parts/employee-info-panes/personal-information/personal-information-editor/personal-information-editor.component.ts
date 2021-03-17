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

import { UtilService, toastOptionsError, formatDate, ExternalLookupService } from '@nutela/core-services';
import { PersonalInformationEditorService } from './personal-information-editor.service';
import { IAppState } from '@nutela/store/app-state';
import {ISelectOption, IStateSelectOption} from '@nutela/models/core-data';

import { SaveGeneral, ProcessingGeneral, isProcessing, NotProcessingGeneral } from '@nutela/store/modules/workforce/employee-profiles';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import * as constants from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { FilePickerComponent, DialogBoxCommandTypes, DialogService } from '@nutela/shared/ui';
import { getCountries, blockUpdatesToGender, blockUpdatesToDateOfBirth } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-personal-information-editor',
  templateUrl: './personal-information-editor.component.html',
  styleUrls: ['./personal-information-editor.component.scss'],
  providers: [PersonalInformationEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInformationEditorComponent extends BaseFormComponent
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
    if(this.show) {
      this.setBirthCountryLists(this.data);
      this.setNationalityLists(this.data);
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

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
    public fs: PersonalInformationEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessing));
    this.countries$ = this.store.pipe(select(getCountries));
    this.blockUpdatesToDateOfBirth$ = this.store.pipe(select(blockUpdatesToDateOfBirth));
    this.blockUpdatesToGender$ = this.store.pipe(select(blockUpdatesToGender));
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
    let countryId = data.birth_country.nationality_id;
    let stateId = data.birthstate.state_id;

    if (countryId) {
      this.birthStateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.birthCityList$ = this.externalLookupService.loadCityList(stateId);
    }

  }

  setNationalityLists(data: IGeneral) {
    let countryId = data.nationality.nationality_id;
    let stateId = data.state.state_id;

    if (countryId) {
      this.stateOfOriginList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.lgaList$ = this.externalLookupService.loadLGAList(stateId);
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

  onSubmit() {

    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingGeneral());

          this.fs.dateOfBirth.setValue(formatDate(this.fs.dateOfBirth.value));
          this.store.dispatch(new SaveGeneral(<IGeneral>this.fs.value));
        }
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingGeneral());
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
