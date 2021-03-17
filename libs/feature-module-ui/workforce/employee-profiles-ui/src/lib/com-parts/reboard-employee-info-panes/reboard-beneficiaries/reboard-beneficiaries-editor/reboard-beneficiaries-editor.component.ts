
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import * as constants from '@nutela/shared/app-global';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, ExternalLookupService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ReboardBeneficiariesEditorService } from './reboard-beneficiaries-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogService } from '@nutela/shared/ui';
import { getCountries } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';
import { isProcessingReboardBeneficiary, ProcessingReboardBeneficiary, SaveReboardBeneficiary, NotProcessingReboardBeneficiary, SaveUpdateReboardBeneficiary, isLoadingReboardBeneficiary } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-beneficiaries-editor',
  templateUrl: './reboard-beneficiaries-editor.component.html',
  styleUrls: ['./reboard-beneficiaries-editor.component.scss'],
  providers: [ReboardBeneficiariesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReboardBeneficiariesEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IBeneficiary;

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data, this.selectOptionData);
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;

  countries$: Observable<ISelectOption[]>;
  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;
  isLoading$: Observable<boolean>;

  constructor(
    public fs: ReboardBeneficiariesEditorService,
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
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingReboardBeneficiary));
    this.countries$ = this.store.pipe(select(getCountries));
    this.isLoading$ = this.store.pipe(select(isLoadingReboardBeneficiary))
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onTitleSelected($event) {
    this.setTitleByGender($event.label);
    this.toggleStatusGender();
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

  toggleStatusGender() {
    if (this.isGenderNeutral()) {
      this.fs.gender.enable();
    } else {
      this.fs.gender.disable();
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

  // onCountrySelected($event) {
  //   this.store.dispatch(new LoadStatesBeneficiary({
  //       selectedCountry: <INationalitySelectOption>$event
  //     })
  //   );
  //   this.fs.state.setValue(null);
  //   this.fs.city.setValue(null);
  // }

  // onStateSelected($event) {
  //   this.store.dispatch(new LoadCitiesBeneficiary({
  //       selectedState: <IStateSelectOption>$event
  //     })
  //   );
  //   this.fs.city.setValue(null);
  // }

  onCountrySelected($event) {
    this.stateList$ = this.externalLookupService.loadStateList($event.value);
    this.fs.state.setValue(null);
    this.fs.city.setValue(null);
  }

  onStateSelected($event) {
    this.cityList$ = this.externalLookupService.loadCityList($event.value);
    this.fs.city.setValue(null);
  }

  setCountryLists(data: IBeneficiary) {
    let countryId = (data && data.NationalityInfo)?data.NationalityInfo.nationality_id:null;
    let stateId = (data && data.StateInfo)?data.StateInfo.state_id:null;

    if (countryId) {
      this.stateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.cityList$ = this.externalLookupService.loadCityList(stateId);
    }
  }

  onImageSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        passport_picture: data.data,
        img_extension_passport: data.fileExt || FILE_EXTENSIONS.png,
        img_extension: data.fileExt || FILE_EXTENSIONS.png,
        img_size: data.size
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      passport_picture: null,
      img_extension_passport: '',
      img_extension: '',
      img_size: null
    });
  }

  onSubmit() {
    this.fs.convertToLowerCase()
    if (this.fs.valid) {
      const recordId = this.data ? this.data.beneficiary_id : 0;

      this.store.dispatch(new ProcessingReboardBeneficiary());
      this.data ? this.store.dispatch(new SaveUpdateReboardBeneficiary({ data: <IBeneficiary>this.fs.value, recordId })) :
        this.store.dispatch(new SaveReboardBeneficiary({ data: <IBeneficiary>this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingReboardBeneficiary());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.imagePicker.removeFile();
    this.fs.init(this.data, this.selectOptionData);
  }

  ngOnDestroy() {
  }
}
