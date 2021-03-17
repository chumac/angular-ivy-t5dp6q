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

import { UtilService } from '@nutela/core-services';
import { ReboardIdentificationEditorService } from './reboard-identification-editor.service';
import { IAppState } from '@nutela/store/app-state';
import DataSource from 'devextreme/data/data_source';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ImagePickerComponent, DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { getPositions, getPaygrade, getPayGroup, isProcessingReboardIdentification, ProcessingReboardIdentification, SaveReboardIdentification, NotProcessingReboardIdentification, isLoadingReboardIdentification } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-identification-editor',
  templateUrl: './reboard-identification-editor.component.html',
  styleUrls: ['./reboard-identification-editor.component.scss'],
  providers: [ReboardIdentificationEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReboardIdentificationEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSourceReportsTo: any = null;
  activePersonnelDataSourceBackupOfficer: any = null;

  positionData$: Observable<ISelectOption[]>;
  titleData$: Observable<ISelectOption[]>;
  paygradeData$: Observable<ISelectOption[]>;
  paygroupsData$: Observable<ISelectOption[]>;
  isLoading$: Observable<boolean>;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public activePersonnel: ISelectOption[];

  @Input() public data: IIdentification;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activePersonnel']) {
      this.activePersonnelDataSourceReportsTo = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
      this.activePersonnelDataSourceBackupOfficer = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }
    if(changes['data']) {
      this.fs.init(this.data);
    }

    // if (this.show) {
    //   this.fs.patch({
    //     corporate_id_expires: this.data.emp_duration_to
    //   })
    // }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;
  approvedData$: Observable<IIdentification>;

  constructor(
    public fs: ReboardIdentificationEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();

    this.performInit();
    this.cd.markForCheck();
  }

  storeSelects() {
    this.positionData$ = this.store.pipe(select(getPositions));
    this.paygradeData$ = this.store.pipe(select(getPaygrade))
    this.paygroupsData$ = this.store.pipe(select(getPayGroup));
    this.isProcessing$ = this.store.pipe(select(isProcessingReboardIdentification));
    this.isLoading$ = this.store.pipe(select(isLoadingReboardIdentification));
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

  disableExpiresField(): boolean {
    if (this.data && this.data.emp_duration_to) {
      return true;
    } else {
      return false
    }
  }

  onFileRemoved() {
    this.fs.patch({
      image_kin: null,
      img_extension_nextofkin: '',
      img_size: null
    });
  }

  onSubmit() {

    if (this.fs.valid) {
      this.store.dispatch(new ProcessingReboardIdentification());
      this.store.dispatch(new SaveReboardIdentification(<IIdentification>this.fs.value));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingReboardIdentification());
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
