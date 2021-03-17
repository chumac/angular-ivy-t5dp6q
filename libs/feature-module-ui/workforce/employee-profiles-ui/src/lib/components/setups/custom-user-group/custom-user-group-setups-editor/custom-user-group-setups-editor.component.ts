import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../../../store';
import { ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { CustomUserGroupSetupsEditorService } from './custom-user-group-setups-editor.service';
import { AddCustomUserGroupSetup, isProcessingCustomUserGroupSetup, ProcessingCustomUserGroupSetup, SaveCustomUserGroupSetup } from '../../../../store/setups/custom-user-group';


@Component({
  selector: 'x365-fm-workforce-custom-user-group-setups-editor',
  templateUrl: './custom-user-group-setups-editor.component.html',
  styleUrls: ['./custom-user-group-setups-editor.component.scss'],
  providers: [CustomUserGroupSetupsEditorService],
})
export class CustomUserGroupSetupsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean = true;
  @Input() public width: number;
  @Input() public data: ICustomUserGroupSetup;
  @Input() public activePersonnel: Observable<ISelectOption[]>;
  @Input() public transactionTypes: ISelectOption[];
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public fs: CustomUserGroupSetupsEditorService, public utilService: UtilService, private store: Store<IEmployeesProfileState>) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomUserGroupSetup));
  }

  onCancelButtonClicked() {
    // this.dialogRef.close();
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.reset();
    this.cancelClick.emit();
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingCustomUserGroupSetup());
        this.store.dispatch(new SaveCustomUserGroupSetup({data: <ICustomUserGroupSetup>this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
        } else {
        this.store.dispatch(new ProcessingCustomUserGroupSetup());
        this.store.dispatch(new AddCustomUserGroupSetup({data: <ICustomUserGroupSetup>this.fs.value}));
      }
    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}

}


