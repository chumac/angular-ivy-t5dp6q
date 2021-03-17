
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import * as constants from '@nutela/shared/app-global';
import { IGuarantor } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { GuarantorsEditorService } from './guarantors-editor.service';
import { ProcessingGuarantor, SaveGuarantor, NotProcessingGuarantor, isProcessingGuarantor } from '@nutela/store/modules/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, DialogBoxCommandTypes, DialogService } from '@nutela/shared/ui';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IBasicData } from 'dist/libs/models/core-data';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-guarantors-editor',
  templateUrl: './guarantors-editor.component.html',
  styleUrls: ['./guarantors-editor.component.scss'],
  providers: [GuarantorsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuarantorsEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGuarantor;

  @Input() public selectOptionData: ISelectOptionData;
  @Input() public organisations: ISelectOptionData;
  @Input() public useApprovedOrgs: string;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  @ViewChild('filePicker') filePicker: ImagePickerComponent;
  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;
  @ViewChild('orgLookup') orgLookup: DxLookupComponent;


  isProcessing$: Observable<boolean>;

  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: GuarantorsEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.toggleStatusGender();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingGuarantor));
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

  loadAddress(data){
    if(data){
      const items = this.orgLookup.selectedItem;
      this.fs.companyAddress.setValue(items.address);
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

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        attach_document: data.content,
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

  onImageRemoved() {
    this.fs.patch({
      passport_picture: null,
      img_extension_passport: '',
      img_extension: '',
      img_size: null
    });
  }

  onFileRemoved(data: any) {
    this.fs.patch({
      certificate_picture: '',
      img_extension: '',
    });
  }

  onSubmit() {
    this.fs.convertToLowerCase();
    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          const recordId = this.data ? this.data.guarantor_id : 0;

          this.store.dispatch(new ProcessingGuarantor());
          this.store.dispatch(new SaveGuarantor({ data: <IGuarantor>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
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
    this.store.dispatch(new NotProcessingGuarantor());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.filePicker.removeFile();
    this.imagePicker.removeFile();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
