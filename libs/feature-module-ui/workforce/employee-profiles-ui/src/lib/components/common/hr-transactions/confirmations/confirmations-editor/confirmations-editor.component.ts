import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../../../../store';
import { IConfirmationTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { ConfirmationsEditorService } from './confirmations-editor.service';
import { AddConfirmation, isProcessingConfirmation, ProcessingConfirmation, SaveConfirmation } from '../../../../../store/hr-transactions/confirmation';


@Component({
  selector: 'x365-fm-workforce-confirmations-editor',
  templateUrl: './confirmations-editor.component.html',
  styleUrls: ['./confirmations-editor.component.scss'],
  providers: [ConfirmationsEditorService],
})
export class ConfirmationsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean = true;
  @Input() public width: number;
  @Input() public data: IConfirmationTransaction;
  @Input() public activePersonnel: Observable<ISelectOption[]>;
  @Input() public transactionTypes: ISelectOption[]; 
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  } 

  constructor(public fs: ConfirmationsEditorService, public utilService: UtilService, private store: Store<IEmployeesProfileState>) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingConfirmation));
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
        this.store.dispatch(new ProcessingConfirmation());
        this.store.dispatch(new SaveConfirmation({data: <IConfirmationTransaction>this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
        } else {
        this.store.dispatch(new ProcessingConfirmation());
        this.store.dispatch(new AddConfirmation({data: <IConfirmationTransaction>this.fs.value}));
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


