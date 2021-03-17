import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IEventDetailData, IEventEmployee, INominationCreate } from '@nutela/models/talent/learning';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { NominationLearningEvent, HideNominationEditorEvent, ILearningState, NotProcessingEventDetail, ProcessingEventDetail } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Observable } from 'rxjs';
import { EventDetailNominationService } from './event-detail-nomination.service';

@Component({
  selector: 'x365-fm-talent-event-detail-nomination',
  templateUrl: './event-detail-nomination.component.html',
  styleUrls: ['./event-detail-nomination.component.scss']
})
export class EventDetailNominationComponent extends BaseFormComponent implements OnInit {
  @Input() public showNomination: boolean;
  @Input() public width: number;
  @Input() public data: INominationCreate;
  @Input() public allEmployee: IEventEmployee[];

  @Output() cancelClick = new EventEmitter<any>();

  eventid: number;
  isProcessing$: Observable<boolean>;
  EventDetailDataList$: Observable<IEventDetailData[]>;

  constructor(public utilService: UtilService, public fs: EventDetailNominationService, private store: Store<ILearningState>) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.allEmployee.map(v => Object.assign(v, {fullname: v.employee_firstname + ' ' + v.employee_surname}))
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.store.dispatch(new HideNominationEditorEvent());
  }

  onSubmit() {
    this.fs.form.controls['event_id'].setValue(this.eventid);
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingEventDetail());
      this.store.dispatch(new NominationLearningEvent({ data: <INominationCreate>this.fs.value, event_id: this.eventid }));
      this.data = null;
      this.reset();
      this.cancelClick.emit();
      this.store.dispatch(new HideNominationEditorEvent());
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  setFieldvalue(eventId: number) {
    this.eventid = eventId;
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
  }

  ngOnDestroy() {
  }

} 
