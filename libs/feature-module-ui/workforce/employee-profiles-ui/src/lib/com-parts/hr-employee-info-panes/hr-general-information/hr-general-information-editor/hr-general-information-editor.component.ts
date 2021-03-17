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

import { Subscription } from 'rxjs/internal/Subscription';

import { UtilService, toastOptionsError, formatDate, ExternalLookupService } from '@nutela/core-services';
import { GeneralInformationEditorService } from './general-information-editor.service';
import {
  ISelectOption,
  IStateSelectOption,
  INationalitySelectOption
} from '@nutela/models/core-data';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import * as constants from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { FilePickerComponent, DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ProcessingGeneral, SaveGeneral, NotProcessingGeneral, isProcessing,
         getBirthStateList, getBirthCityList, getStateOfOriginList, getLGAList,
         LoadBirthStatesGeneral, LoadBirthCitiesGeneral, LoadStateOfOriginGeneral,
         LoadLGAsGeneral } from '../../../../store/employee-detailed-area';
import { IEmployeesProfileState } from '../../../../store/root';
import { getCountries } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';
import { DialogService } from 'libs/shared/ui/src/lib/services/dialog.service';


@Component({
  selector: 'x365-fm-workforce-hr-general-information-editor',
  templateUrl: './hr-general-information-editor.component.html',
  styleUrls: ['./hr-general-information-editor.component.scss'],
  providers: [GeneralInformationEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrGeneralInformationEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGeneral;
  @Input() public employeeId: number;

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
  countries$: Observable<ISelectOption[]>;

  birthStateList$: Observable<IStateSelectOption[]>;
  birthCityList$: Observable<ISelectOption[]>;

  stateOfOriginList$: Observable<IStateSelectOption[]>;
  lgaList$: Observable<ISelectOption[]>;

  constructor(
    public fs: GeneralInformationEditorService,
    public utilService: UtilService,
    private externalLookupService: ExternalLookupService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef,
    private dialogBoxService: DialogBoxService,
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
    let countryId = data.birth_country? data.birth_country.nationality_id:null;
    let stateId = data.birthstate?data.birthstate.state_id:null;

    if (countryId) {
      this.birthStateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.birthCityList$ = this.externalLookupService.loadCityList(stateId);
    }

  }

  setNationalityLists(data: IGeneral) {
    let countryId = data.nationality?data.nationality.nationality_id:null;
    let stateId = data.state ? data.state.state_id: null;

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
          this.fs.dateOfBirth.setValue(formatDate(this.fs.dateOfBirth.value));

          if ((this.fs.preferedFirstname.value === null) || (this.fs.preferedFirstname.value === '')) {
            this.fs.patch({
              sync_firstname: null
            })
          }

          if ((this.fs.preferedSurname.value === null) || (this.fs.preferedSurname.value === '')) {
            this.fs.patch({
              sync_surname: null
            })
          }

          this.store.dispatch(new ProcessingGeneral());
          this.store.dispatch(new SaveGeneral({ employeeId: this.employeeId, data: <IGeneral>this.fs.value }));
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
