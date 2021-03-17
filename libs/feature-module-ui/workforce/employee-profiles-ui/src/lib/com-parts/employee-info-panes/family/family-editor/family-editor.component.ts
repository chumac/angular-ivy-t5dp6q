
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError, ExternalLookupService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { FamilyEditorService } from './family-editor.service';
import { ProcessingFamily, SaveFamily, NotProcessingFamily, isProcessingFamily, LoadStatesFamily, LoadCitiesFamily, getFamilyStateList, getFamilyCityList } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, INationalitySelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, FilePickerComponent, DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { getCountries } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-family-editor',
  templateUrl: './family-editor.component.html',
  styleUrls: ['./family-editor.component.scss'],
  providers: [FamilyEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IFamily;

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data, this.selectOptionData);
    }
    if(this.show){
      this.setCountryLists(this.data);
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;

  countries$: Observable<ISelectOption[]>;
  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: FamilyEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingFamily));
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

  setCountryLists(data: IFamily) {
    let countryId = (data && data.country)?data.country.nationality_id:null;
    let stateId = (data && data.area)?data.area.city_id:null;

    if (countryId) {
      this.stateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.cityList$ = this.externalLookupService.loadCityList(stateId);
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
      img_extension_passport: null,
      img_size: null
    });
  }

  onSubmit() {
    this.fs.convertToLowerCase();
    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          const recordId = this.data ? this.data.family_id : 0;
          this.store.dispatch(new ProcessingFamily());
          this.store.dispatch(new SaveFamily({ data: this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
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
    this.store.dispatch(new NotProcessingFamily());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.imagePicker.removeFile();
    this.filePicker.removeFile();
    this.fs.init(this.data, this.selectOptionData);
  }

  ngOnDestroy() {
  }
}
