import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ICalendar } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { CalendarEditorService } from './calendar-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { isProcessingCalendar, ProcessingCalendar, SaveCalendar, NotProcessingCalendar, getPayrollProfileListCalendar, getAllowanceListCalendar, getDeductionListCalendar, LoadAllowanceListCalendar, LoadDeductionListCalendar } from '../../../../store/calendar';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-calendar-editor',
  templateUrl: './calendar-editor.component.html',
  styleUrls: ['./calendar-editor.component.scss'],
  providers:[CalendarEditorService]
})

export class CalendarEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public activePersonnel: ISelectOption[];
  @Input() public paygroupSelectOption: ISelectOption[];
  @Input() public allowanceSelectOption$ : Observable<ISelectOption[]>;
  @Input() public deductionSelectOption$: Observable<ISelectOption[]>;

  @Input() public data: ICalendar;
  payProfile$: Observable<ISelectOption[]>;

  activePersonnelDataSource: any = null;
  // @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;
  constructor(
    public fs: CalendarEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingCalendar));
      this.payProfile$= this.store.pipe(select(getPayrollProfileListCalendar));
      this.allowanceSelectOption$= this.store.pipe(select(getAllowanceListCalendar));
      this.deductionSelectOption$= this.store.pipe(select(getDeductionListCalendar));
    }

    storeDispatches() {
      this.store.dispatch(new LoadAllowanceListCalendar());
      this.store.dispatch(new LoadDeductionListCalendar());
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
