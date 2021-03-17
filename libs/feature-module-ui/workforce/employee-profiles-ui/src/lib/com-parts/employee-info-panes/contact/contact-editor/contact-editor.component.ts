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
import { ContactEditorService } from './contact-editor.service';
import { IAppState } from '@nutela/store/app-state';
import {
  ISelectOption,
  IStateSelectOption} from '@nutela/models/core-data';

import {
  isContactProcessing,
  NotProcessingGeneral,
  SaveContact,
  ProcessingContact} from '@nutela/store/modules/workforce/employee-profiles';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import * as constants from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { ImagePickerComponent, DialogBoxCommandTypes, DialogService } from '@nutela/shared/ui';
import { getCountries, allowPreferredEmailChange } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.scss'],
  providers: [ContactEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IContact;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
      this.toggleStatusGender();
    }
    if (this.show) {
      this.setResidentialCountryLists(this.data);
      this.setPermanentCountryLists(this.data);
      this.setNOKCountryLists(this.data);
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;


  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  approvedData$: Observable<IContact>;
  allowPreferredEmailChange$: Observable<string>;

  countries$: Observable<ISelectOption[]>;

  residentialStateList$: Observable<ISelectOption[]>;
  residentialCityList$: Observable<ISelectOption[]>;

  permanentStateList$: Observable<IStateSelectOption[]>;
  permanentCityList$: Observable<ISelectOption[]>;

  nextOfKinStateList$: Observable<IStateSelectOption[]>;
  nextOfKinCityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: ContactEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isContactProcessing));
    this.countries$ = this.store.pipe(select(getCountries));
    this.allowPreferredEmailChange$ = this.store.pipe(select(allowPreferredEmailChange))
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

  setResidentialCountryLists(data: IContact) {
    let countryId = data.country_r_nationality_id;
    let stateId = data.state_r_state_id;

    if (countryId) {
      this.residentialStateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.residentialCityList$ = this.externalLookupService.loadCityList(stateId);
    }

  }

  setPermanentCountryLists(data: IContact) {
    let countryId = data.country_p_nationality_id;
    let stateId = data.state_p_state_id;

    if (countryId) {
      this.permanentStateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.permanentCityList$ = this.externalLookupService.loadCityList(stateId);
    }
  }


  setPermanentCountryListsByResidential(data: IContact) {
    let countryId = data.country_r_nationality_id;
    let stateId = data.state_r_state_id;

    if (countryId) {
      this.permanentStateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.permanentCityList$ = this.externalLookupService.loadCityList(stateId);
    }
  }

  setNOKCountryLists(data: IContact) {
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
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingContact());
          this.store.dispatch(new SaveContact(<IContact>this.fs.value));
        }
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  onSameAddressCheckBoxClicked(event: any) {
    this.fs.togglePermanentAddress(event.checked, this.data);
    this.setPermanentCountryListsByResidential(this.data);
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingGeneral());
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
