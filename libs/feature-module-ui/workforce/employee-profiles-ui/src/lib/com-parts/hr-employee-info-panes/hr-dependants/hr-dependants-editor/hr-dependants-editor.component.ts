

import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IDependant, IHrDependant } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, ExternalLookupService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { DependantsEditorService } from './dependants-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogService } from '@nutela/shared/ui';
import { isProcessingDependant, ProcessingDependant,
         SaveDependant, NotProcessingDependant } from '../../../../store/employee-detailed-area';
import { IEmployeesProfileState } from '../../../../store/root';
import { getCountries } from '@nutela/store/modules/foundation';

@Component({
  selector: 'x365-fm-workforce-hr-dependants-editor',
  templateUrl: './hr-dependants-editor.component.html',
  styleUrls: ['./hr-dependants-editor.component.scss'],
  providers: [DependantsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HrDependantsEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IHrDependant;
  @Input() public employeeId: number;

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data, this.selectOptionData);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
    if(this.show === true){
      this.setCountryLists(this.data);
    }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;
  isProcessing$: Observable<boolean>;

  countries$: Observable<ISelectOption[]>;
  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: DependantsEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingDependant));
    this.countries$ = this.store.pipe(select(getCountries));
  }

  inEditMode(): boolean {
    if (this.data) {
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

  setCountryLists(data: IHrDependant) {
    let countryId = data.nationality_id;
    let stateId = data.state_id;

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
    this.fs.convertToLowerCase();
    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          const recordId = this.data ? this.data.dependent_id : 0;

          this.store.dispatch(new ProcessingDependant());
          this.store.dispatch(new SaveDependant({ data: <IDependant>this.fs.value, recordId: recordId, editMode: this.inEditMode(), employeeId: this.employeeId }));
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
    this.store.dispatch(new NotProcessingDependant());
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
