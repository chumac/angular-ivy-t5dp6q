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

import { UtilService, ExternalLookupService } from '@nutela/core-services';
import { ReboardContactEditorService } from './reboard-contact-editor.service';
import { IAppState } from '@nutela/store/app-state';
import {
  ISelectOption,
  IStateSelectOption} from '@nutela/models/core-data';
import { IReboardContact, IContact } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import * as constants from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { ImagePickerComponent, DialogService } from '@nutela/shared/ui';
import { getCountries, allowPreferredEmailChange } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';
import { isReboardContactProcessing, ProcessingReboardContact, SaveReboardContact, NotProcessingReboardContact, SaveUpdateReboardContact } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-contact-editor',
  templateUrl: './reboard-contact-editor.component.html',
  styleUrls: ['./reboard-contact-editor.component.scss'],
  providers: [ReboardContactEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReboardContactEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IReboardContact;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
      this.toggleStatusGender();
    }
    if (this.show && this.data) {
      this.setResidentialCountryLists(this.data);
      this.setPermanentCountryLists(this.data);
      this.setNOKCountryLists(this.data);
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;


  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  approvedData$: Observable<IReboardContact>;
  allowPreferredEmailChange$: Observable<string>;

  countries$: Observable<ISelectOption[]>;

  residentialStateList$: Observable<ISelectOption[]>;
  residentialCityList$: Observable<ISelectOption[]>;

  permanentStateList$: Observable<IStateSelectOption[]>;
  permanentCityList$: Observable<ISelectOption[]>;

  nextOfKinStateList$: Observable<IStateSelectOption[]>;
  nextOfKinCityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: ReboardContactEditorService,
    public utilService: UtilService,
    public externalLookupService: ExternalLookupService,
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
    this.isProcessing$ = this.store.pipe(select(isReboardContactProcessing));
    this.countries$ = this.store.pipe(select(getCountries));
    this.allowPreferredEmailChange$ = this.store.pipe(select(allowPreferredEmailChange))
  }

  inEditMode(): boolean {
    if (this.data) {
      return true
    } else {
      return false
    }
  }

  preferredEmailChangeAllowed(): boolean {
    let response
    this.allowPreferredEmailChange$.pipe(take(1)).subscribe(val => {
      if (val == 'Yes') {
        response = true;
      } else {
        response = false
      }
    })
    return response;
  }

  onResidentialCountrySelected($event) {
    this.residentialStateList$ = this.externalLookupService.loadStateList($event.value);
    this.fs.residentialState.setValue(null);
    this.fs.residentialCity.setValue(null);
  }

  onResidentialStateSelected($event) {
    this.residentialCityList$ = this.externalLookupService.loadCityList($event.value);
    this.fs.residentialCity.setValue(null);
  }

  onPermanentCountrySelected($event) {
    this.permanentStateList$ = this.externalLookupService.loadStateList($event.value);
    this.fs.permanentState.setValue(null);
    this.fs.permanentCity.setValue(null);
  }

  onPermanentStateSelected($event) {
    this.permanentCityList$ = this.externalLookupService.loadCityList($event.value);
    this.fs.permanentCity.setValue(null);
  }

  onNextOfKinCountrySelected($event) {
    this.nextOfKinStateList$ = this.externalLookupService.loadStateList($event.value);
    this.fs.nextofkinState.setValue(null);
    this.fs.nextofkinCity.setValue(null);
  }

  onNextOfKinStateSelected($event) {
    this.nextOfKinCityList$ = this.externalLookupService.loadCityList($event.value);
    this.fs.nextofkinCity.setValue(null);
  }

  setResidentialCountryLists(data: IReboardContact) {
    let countryId = data.country_r.nationality_id;
    let stateId = data.state_r.state_id;

    if (countryId) {
      this.residentialStateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.residentialCityList$ = this.externalLookupService.loadCityList(stateId);
    }

  }

  setPermanentCountryLists(data: IReboardContact) {
    let countryId = data.country_p.nationality_id;
    let stateId = data.state_p.state_id;

    if (countryId) {
      this.permanentStateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.permanentCityList$ = this.externalLookupService.loadCityList(stateId);
    }
  }


  setPermanentCountryListsByResidential(residentialCountryId, residentialStateId) {
    console.log('residential country id',residentialCountryId)
    console.log('residential state id', residentialStateId)
    if (residentialCountryId) {
      this.permanentStateList$ = this.externalLookupService.loadStateList(residentialCountryId);
    }
    if (residentialStateId) {
      this.permanentCityList$ = this.externalLookupService.loadCityList(residentialStateId);
    }
  }

  setNOKCountryLists(data: IReboardContact) {
    let countryId = data.country_kin_nationality_id;
    let stateId = data.state_kin_state_id;

    if (countryId) {
      this.nextOfKinStateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.nextOfKinCityList$ = this.externalLookupService.loadCityList(stateId);
    }
  }

  onNokTitleSelected($event) {
    this.setTitleByGender($event.label);
    this.toggleStatusGender();
  }

  setTitleByGender(title: string) {
    if (title === constants.TITLE.mr) {
      this.fs.kinGender.setValue(constants.GENDER.male);
    } else if (
      title === constants.TITLE.miss ||
      title === constants.TITLE.mrs ||
      title === constants.TITLE.ms
    ) {
      this.fs.kinGender.setValue(constants.GENDER.female);
    }
  }

  toggleStatusGender() {
    if (this.isGenderNeutral()) {
      this.fs.kinGender.enable();
    } else {
      this.fs.kinGender.disable();
    }
  }

  isGenderNeutral(): boolean {
    const title = this.fs.KinTitle.value || '';

    if (title === constants.TITLE.dr) {
      return true;
    } else {
      return false;
    }
  }

  onImageSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        image_kin: $event.data,
        img_extension_nextofkin: data.extension || FILE_EXTENSIONS.png,
        img_size: $event.size,
        imageOversized: $event.oversized
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      image_kin: null,
      img_extension_nextofkin: '',
      img_size: null,
    });
  }


  onDigitalContactFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        doc_binary: data.content,
        doc_extension: data.extension,
        doc_size: data.size
      });
    }
  }

  onDigitalContactFileRemoved($event) {
    this.fs.patch({
      doc_binary: '',
      doc_extension: '',
      doc_size: null
    });
  }


  onSubmit() {
    this.fs.convertToLowerCase();
    if (this.fs.valid) {
        this.store.dispatch(new ProcessingReboardContact());
        this.store.dispatch(new SaveUpdateReboardContact({ data: <IContact>this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  onSameAddressCheckBoxClicked(event: any) {
    this.fs.togglePermanentAddress(event.checked, this.data);
    if (this.fs.residentialCountry.value || this.fs.residentialState.value) {
      this.setPermanentCountryListsByResidential(this.fs.residentialCountry.value, this.fs.residentialState.value );
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingReboardContact());
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.imagePicker.removeFile();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
