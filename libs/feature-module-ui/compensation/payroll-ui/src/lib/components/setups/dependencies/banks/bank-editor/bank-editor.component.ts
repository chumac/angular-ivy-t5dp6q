import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IBank } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { BankEditorService } from './bank-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingBank, NotProcessingBank, SaveBank, ProcessingBank, UpdateBank } from '../../../../../store/dependencies/bank';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-payrl-bank-editor',
  templateUrl: './bank-editor.component.html',
  styleUrls: ['./bank-editor.component.scss'],
  providers:[BankEditorService]
})

export class BankEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IBank;

  // @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;
  constructor(
    public fs: BankEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingBank));
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
        const recordId = this.data? this.data.bank_id: 0;
        this.store.dispatch(new ProcessingBank());
        if(!this.inEditMode()){
          this.store.dispatch(new SaveBank({data: this.fs.value}));
        }
        else {
          this.store.dispatch(new UpdateBank({data: this.fs.value, recordId: recordId}));
        }
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingBank());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.rebuildForm();
      this.fs.init(this.data);
    }
  }
