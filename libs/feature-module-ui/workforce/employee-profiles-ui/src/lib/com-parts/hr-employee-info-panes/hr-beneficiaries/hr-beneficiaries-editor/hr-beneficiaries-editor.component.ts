import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import * as constants from '@nutela/shared/app-global';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError, ExternalLookupService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { BeneficiariesEditorService } from './beneficiaries-editor.service';
import { ProcessingHRBeneficiary, SaveHRBeneficiary, NotProcessingHRBeneficiary,
         isProcessingBeneficiary, LoadStatesHRBeneficiary, LoadCitiesHRBeneficiary,
         getHRBeneficiaryStateList, getHRBeneficiaryCityList, LoadAwaitingApprovalDataHRBeneficiary } from '../../../../store/employee-detailed-area';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, INationalitySelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogBoxCommandTypes, DialogService } from '@nutela/shared/ui';
import { IEmployeesProfileState } from '../../../../store/root';
import { getCountries } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-hr-beneficiaries-editor',
  templateUrl: './hr-beneficiaries-editor.component.html',
  styleUrls: ['./hr-beneficiaries-editor.component.scss']
})
export class HrBeneficiariesEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IBeneficiary;
  @Input() public employeeId: number;


  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
    if(this.show){
      this.setCountryLists(this.data);
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;

  countries$: Observable<ISelectOption[]>;
  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: BeneficiariesEditorService,
    public utilService: UtilService,
    private externalLookupService: ExternalLookupService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingBeneficiary));
    this.countries$ = this.store.pipe(select(getCountries));
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
    if (data && data.nationality_id) {
      const countryId = data.nationality_id;
      let stateId: number;
      this.stateList$ = this.externalLookupService.loadStateList(countryId);
      if (data.state_id) {
        stateId = data.state_id;
        this.cityList$ = this.externalLookupService.loadCityList(stateId);
      }
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
    this.fs.convertToLowerCase();
    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          const recordId = this.data ? this.data.beneficiary_id : 0;
          this.store.dispatch(new ProcessingHRBeneficiary());
          this.store.dispatch(new SaveHRBeneficiary({ data: <IBeneficiary>this.fs.value, recordId: recordId, editMode: this.inEditMode(), employeeId: this.employeeId }));
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
    this.store.dispatch(new NotProcessingHRBeneficiary());
    this.data = null;
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
