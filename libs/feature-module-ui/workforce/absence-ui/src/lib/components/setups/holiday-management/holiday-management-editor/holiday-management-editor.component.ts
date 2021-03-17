import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IPublicHoliday } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs';
import { HolidayEditorService } from './holiday-management-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../../store/root';
import { isProcessingPublicHoliday, ProcessingPublicHoliday, SavePublicHoliday, NotProcessingPublicHoliday, UpdatePublicHoliday } from '../../../../store/setups';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-absence-holiday-management-editor',
  templateUrl: './holiday-management-editor.component.html',
  styleUrls: ['./holiday-management-editor.component.scss']
})
export class HolidayManagementEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPublicHoliday;

  @Output() cancelClick = new EventEmitter<any>();

  range:boolean;


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
    public fs: HolidayEditorService,
    public utilService: UtilService,
    private store: Store<IAbsenceState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingPublicHoliday));

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
        this.fs.formatDate();
        const holiday_id = this.data? this.data.holiday_id: null;
        this.store.dispatch(new ProcessingPublicHoliday());
        if(this.inEditMode()===false){
          this.store.dispatch(new SavePublicHoliday({data: this.fs.value, recordId: holiday_id}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdatePublicHoliday({data: this.fs.value, recordId: holiday_id}));
        }

      }
      else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingPublicHoliday());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    onclick($event){
      console.log($event.target.checked);
      if ($event.target.checked === false){
        this.range=false;
      }
      else if ($event.target.checked === true){
        this.range=true;
      }
    }
}
