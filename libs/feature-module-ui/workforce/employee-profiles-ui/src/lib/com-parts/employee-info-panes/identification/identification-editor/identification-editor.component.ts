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
import { IAppState } from '@nutela/store/app-state';

import {
  SaveIdentification,
  ProcessingIdentification,
  isProcessingIdentification,
  NotProcessingIdentification,

} from '@nutela/store/modules/workforce/employee-profiles';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ImagePickerComponent, DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';
import { useCorporateIdField } from '@nutela/store/modules/foundation';

@Component({
  selector: 'x365-fm-workforce-identification-editor',
  templateUrl: './identification-editor.component.html',
  styleUrls: ['./identification-editor.component.scss'],
  providers: [IdentificationEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentificationEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IIdentification;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
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
  useCorporateIdField$: Observable<string>;

  constructor(
    public fs: IdentificationEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingIdentification));
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

  onSubmit() {

    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingIdentification());
          this.store.dispatch(new SaveIdentification(<IIdentification>this.fs.value));
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
    this.store.dispatch(new NotProcessingIdentification());
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
