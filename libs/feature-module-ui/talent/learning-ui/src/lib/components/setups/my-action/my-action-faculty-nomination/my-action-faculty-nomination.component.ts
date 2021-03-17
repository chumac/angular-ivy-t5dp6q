import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IEventDetailData, IEventEmployee, INominationCreate } from '@nutela/models/talent/learning';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ActionNominationLearningEvent, HideActionNominationEditorEvent, ILearningState, ProcessingMyAction } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Observable } from 'rxjs';
import { MyActionFacultyNominationService } from './my-action-faculty-nomination.service';

@Component({
  selector: 'x365-fm-talent-my-action-faculty-nomination',
  templateUrl: './my-action-faculty-nomination.component.html',
  styleUrls: ['./my-action-faculty-nomination.component.scss'],
  providers: [MyActionFacultyNominationService],
})

export class MyActionFacultyNominationComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public eventid: number;
  @Input() public data: INominationCreate;
  @Input() public allEmployee: IEventEmployee[];

  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  EventDetailDataList$: Observable<IEventDetailData[]>;

  constructor(public utilService: UtilService, public fs: MyActionFacultyNominationService, private store: Store<ILearningState>) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.store.dispatch(new HideActionNominationEditorEvent());
  }

  onSubmit() {
    this.fs.form.controls['event_id'].setValue(this.eventid);
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingMyAction());
      this.store.dispatch(new ActionNominationLearningEvent({ data: <INominationCreate>this.fs.value, event_id: this.eventid }));
      this.data = null;
      this.reset();
      this.cancelClick.emit();
      this.store.dispatch(new HideActionNominationEditorEvent());
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
