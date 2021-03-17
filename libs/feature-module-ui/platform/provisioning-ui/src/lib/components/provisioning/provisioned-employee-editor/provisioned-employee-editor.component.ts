import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  SimpleChanges,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';
import {
  isProcessingNewEmployee,
  ProcessingNewEmployee,
  NotProcessingNewEmployee,
  SaveUpdatedEmployee,
  getRecordCategories,
  LoadRecordCategories
} from '../../../store/new-employee';
import { ISelectOption } from '@nutela/models/core-data';
import { ProvisionedEmployeeEditorService } from './provisioned-employee-editor.service';
import {
  IProvisioning
} from '../../../models/interfaces';

@Component({
  selector: 'x365-fm-plf-prov-provisioned-employee-editor',
  templateUrl: './provisioned-employee-editor.component.html',
  styleUrls: ['./provisioned-employee-editor.component.scss'],
  providers: [ProvisionedEmployeeEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvisionedEmployeeEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  isProcessing$: Observable<boolean>;
  recordCategoriesSelect$: Observable<ISelectOption[]>;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IProvisioning;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('num') nameInputRef: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === false) {
      this.fs.initializeForm();
    }
  }

  constructor(
    public fs: ProvisionedEmployeeEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.fs.disableUsernameInput = true;
    this.fs.disableRecCategoryInput = true;
    this.storeDispatch();
    this.storeSelects();
  }

  storeDispatch() {
    this.store.dispatch(new LoadRecordCategories());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingNewEmployee));
    this.recordCategoriesSelect$ = this.store.pipe(select(getRecordCategories));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingNewEmployee());
      this.store.dispatch(
        new SaveUpdatedEmployee({
          data: <IProvisioning>this.fs.value,
          provId: this.data.provision_id
        })
      );
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(),
          type: ToastTypes.ERROR
        })
      );
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(
      this.validate(this.fs.f, this.fs.validationMessages)
    );
  }

  onCancel() {
    this.store.dispatch(new NotProcessingNewEmployee());
    this.cancelClick.emit();
  }

  onUsernameChecked($event) {
    this.fs.disableUsernameInput = !$event.target.checked;
    if (!$event.target.checked) {
      this.fs.patch({
        new_username: this.data.username
      });
    }
  }

  onRecordCategoryChecked($event) {
    this.fs.disableRecCategoryInput = !$event.target.checked;
    if (!$event.target.checked) {
      this.fs.patch({
        new_record_category: this.data.rec_category
      });
    }
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}
}
