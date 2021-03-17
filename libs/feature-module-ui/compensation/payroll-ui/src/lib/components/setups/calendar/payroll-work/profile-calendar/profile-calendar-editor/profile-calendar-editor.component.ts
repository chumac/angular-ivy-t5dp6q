import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IProfileCalendar } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { ProfileCalendarEditorService } from './profile-calendar-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../../store/root/root.state';
import { isProcessingCalendar, ProcessingCalendar, SaveCalendar, NotProcessingCalendar, getPayrollProfileListCalendar, LoadPayrollProfileListCalendar } from '../../../../../../store/calendar';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-payrl-profile-calendar-editor',
  templateUrl: './profile-calendar-editor.component.html',
  styleUrls: ['./profile-calendar-editor.component.scss'],
  providers:[ProfileCalendarEditorService]
})

export class ProfileCalendarEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfileCalendar;

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
    public fs: ProfileCalendarEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.store.dispatch(new LoadPayrollProfileListCalendar());
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingCalendar));
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
        this.store.dispatch(new ProcessingCalendar());
        this.store.dispatch(new SaveCalendar({data: this.fs.value, recordId: this.data.calendar_id}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingCalendar());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }
  }
