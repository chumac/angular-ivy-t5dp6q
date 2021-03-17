import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISeparationReasons } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs';
import { SeparationReasonEditorService } from './separation-reason-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store/root';
import { isProcessingSeparationReasonSetup, ProcessingSeparationReasonSetup, SaveSeparationReasonSetup, NotProcessingSeparationReasonSetup, AddSeparationReasonSetup } from '../../../../store/setups/separation-reason';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-separation-reason-editor',
  templateUrl: './separation-reason-editor.component.html',
  styleUrls: ['./separation-reason-editor.component.scss'],
  providers: [SeparationReasonEditorService]
})

export class SeparationReasonEditorComponent extends BaseFormComponent  implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: ISeparationReasons;

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
    public fs: SeparationReasonEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingSeparationReasonSetup));

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
        console.log('data',this.fs.value)
        this.store.dispatch(new ProcessingSeparationReasonSetup());
        if(this.inEditMode()===false){
          this.store.dispatch(new AddSeparationReasonSetup({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new SaveSeparationReasonSetup({data: this.fs.value, recordId: this.data.status_id}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.SUCCESS}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingSeparationReasonSetup());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

}
