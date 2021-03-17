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

import { UtilService, toastOptionsError } from '@nutela/core-services';
import { IdentificationEditorService } from './identification-editor.service';

import { IIdentification} from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ImagePickerComponent, DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IEmployeesProfileState } from '../../../../store';
import { isProcessingIdentification, ProcessingHRIdentification, SaveHRIdentification,
         NotProcessingHRIdentification,
         LoadPayGroup,
         getIdentificationGrade} from '../../../../store/employee-detailed-area';
import { IPositionInfo } from '@nutela/models/foundation';
import { IGradeInfo } from '@nutela/models/workforce/leave';
import { IDesignation, IPaymentMode, IPeople } from '@nutela/models/workforce/personnel';
import { IPayrollProfileInfo } from '@nutela/models/compensation/loans';
import { IDENTIFICATION_PAYMODE } from '../../../../constants';
import { take } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { useCorporateIdField } from '@nutela/store/modules/foundation';


@Component({
  selector: 'x365-fm-workforce-hr-identification-editor',
  templateUrl: './hr-identification-editor.component.html',
  styleUrls: ['./hr-identification-editor.component.scss'],
  providers: [IdentificationEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrIdentificationEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IIdentification;
  @Input() public employeeId: number;

  @Input() public position: IPositionInfo[];
  @Input() public grade$:    Observable<ISelectOption[]>;
  @Input() public payroll:  IPayrollProfileInfo[];
  @Input() public jobTitle: IDesignation[];
  @Input() public actingTitle: IDesignation[];
  @Input() public paymentMode: IPaymentMode[];
  @Input() public reportTo: IPeople[];
  @Input() public backUpOfficer: IPeople[];

  @Output() cancelClick = new EventEmitter<any>();

  showStart:boolean=false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    // if(this.show===false){
    //   this.fs.form=this.fs.buildForm();
    // }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;
  approvedData$: Observable<IIdentification>;
  paymode=IDENTIFICATION_PAYMODE;
  useCorporateIdField$: Observable<string>;

  constructor(
    public fs: IdentificationEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingIdentification));
    this.grade$ = this.store.pipe(select(getIdentificationGrade));
    this.useCorporateIdField$ = this.store.pipe(select(useCorporateIdField));

    this.performInit();
    this.cd.markForCheck();
  }

  performInit() {}

  onImageSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        image_signature: data.data,
        img_extension_signature: data.extension || FILE_EXTENSIONS.png,
        img_size: data.size
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      image_kin: null,
      img_extension_nextofkin: '',
      img_size: null
    });
  }

PermanentStaff($event){
  console.log($event.checked);
  this.showStart=$event.checked;
}

  onSubmit() {
    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingHRIdentification());

          const employeeinfo_id = this.data ? this.data.employeeinfo_id : 0;
          this.store.dispatch(new SaveHRIdentification({ employeeId: this.employeeId, employeeinfo_id: employeeinfo_id, data: <IIdentification>this.fs.value }));
        }
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onGradeSelected(event) {
    this.fs.paygroup.setValue(null);

    this.store.dispatch(new LoadPayGroup({gradeId: event.value}));

  }

  onCancel() {
    this.store.dispatch(new NotProcessingHRIdentification());
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.imagePicker.removeFile();
    this.fs.init(this.data);
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
