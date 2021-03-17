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
  ViewChild
} from '@angular/core';

import * as constants from '@nutela/shared/app-global';
import { ISubscription, ISubscriptionType, IMembershipInfo } from '@nutela/models/workforce/subscription';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { SubscriptionsEditorService } from './subscriptions-editor.service';
import {
  ProcessingSubscription,
  SaveSubscription,
  NotProcessingSubscription,
  isProcessingSubscription,
  LoadMembershipListSubscription,
  getSubscriptionMembershipList
} from '../../../store/subscription';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent } from '@nutela/shared/ui';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';

@Component({
  selector: 'x365-fm-workforce-subscriptions-editor',
  templateUrl: './subscriptions-editor.component.html',
  styleUrls: ['./subscriptions-editor.component.scss'],
  providers: [SubscriptionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ISubscription;
  @Input() public subscriptionType: ISubscriptionType;
  @Input() public currencyList: ISelectOption;
  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
  }

  @ViewChild('filePicker') filePicker: ImagePickerComponent;
  @ViewChild('subscriptionTypeLookup') subscriptionTypeLookup: DxLookupComponent;
  @ViewChild('membershipListLookup') membershipListLookup: DxLookupComponent;

  isProcessing$: Observable<boolean>;
  membershipList$: Observable<IMembershipInfo[]>;

  constructor(
    public fs: SubscriptionsEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingSubscription));
    this.membershipList$ = this.store.pipe(select(getSubscriptionMembershipList));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        doc_binary: data.content,
        doc_extension: data.extension,
        doc_size: data.size
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved(data: any) {
    this.fs.patch({
      doc_binary: '',
      doc_extension: '',
      doc_size: 0
    });
  }

  onValueChangedSubscriptionTypes(data) {
    const items: ISubscriptionType = this.subscriptionTypeLookup.selectedItem;
    if(items) {
      this.fs.grade.setValue(items.grade_description);
      this.fs.scheduledGradeAmount.setValue(items.grade_amount);
      this.fs.grade.disable();
      this.fs.scheduledGradeAmount.disable();
      this.store.dispatch(new LoadMembershipListSubscription(items.id));
    } else {
      this.fs.grade.setValue('');
      this.fs.scheduledGradeAmount.setValue('0.00');
      this.fs.grade.disable();
      this.fs.scheduledGradeAmount.disable();
    }
  }

  onValueChangedMembershipList(data) {
    const items: IMembershipInfo = this.membershipListLookup.selectedItem;
    if(items) {
      this.fs.membershipFee.setValue(items.membership_fee);
      this.fs.membershipFee.disable();
    } else {
      this.fs.membershipFee.setValue('0.00');
      this.fs.membershipFee.disable();
    }
  }

  onSubmit() {
    if (this.fs.valid) {
      const recordId = this.data ? this.data.id : 0;

      this.store.dispatch(new ProcessingSubscription());
      this.store.dispatch(
        new SaveSubscription({
          data: <ISubscription>this.fs.value,
          recordId: recordId,
          editMode: this.inEditMode()
        })
      );
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(),
          options: toastOptionsError()
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
    this.store.dispatch(new NotProcessingSubscription());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.buildForm();
//    this.fs.f.reset();
    this.filePicker.removeFile();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}
}
