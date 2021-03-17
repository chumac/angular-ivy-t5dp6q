import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IstaffEmployeePayrollProfile } from '@nutela/models/compensation/payroll';
import { IEventDetailData } from '@nutela/models/talent/learning';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { CloseLearningEvent, HideCloseEditorEvent, ILearningState, NotProcessingEventDetail, ProcessingEventDetail } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { IEventAllParticiants } from 'libs/models/talent/learning/src/lib/interfaces/event-detail-participants.interface';
import { IExcludedParticiants } from 'libs/models/talent/learning/src/lib/interfaces/event-excluded-participants.interface';
import { ISelectedParticiants } from 'libs/models/talent/learning/src/lib/interfaces/event-selected-participants.interface';
import { Observable } from 'rxjs';
import { EventDetailCLoseService } from './event-detail-close.service';

@Component({
  selector: 'x365-fm-talent-event-detail-close',
  templateUrl: './event-detail-close.component.html',
  styleUrls: ['./event-detail-close.component.scss']
})
export class EventDetailCloseComponent extends BaseFormComponent implements OnInit {
  @Input() public showClose: boolean;
  @Input() public width: number;
  @Input() public data: IEventDetailData;
  @Input() public allParticipants: IEventAllParticiants[];

  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  excludedProfile$: IExcludedParticiants[] = [];
  selectedProfile$: ISelectedParticiants[] = [];

  tempExcludedData: IEventAllParticiants[] = [];
  tempSelectedData: IEventAllParticiants[] = [];
  employee_ids: any = [];
  eventid: number;

  constructor(
    public fs: EventDetailCLoseService,
    public utilService: UtilService,
    private store: Store<ILearningState>,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.excludedProfile$ = [];
    this.selectedProfile$ = [];
  }

  inEditMode(): boolean {

    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.excludedProfile$ == null || this.excludedProfile$.length == 0) {
      this.store.dispatch(new ShowToast({ title: 'Please select the participants', message: 'No Attendees Found', options: toastOptionsError() }));
      return false;
    }

    this.employee_ids = [];
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingEventDetail());
      for (let empData of this.excludedProfile$) {
        this.employee_ids.push(empData.employee_id)
      }
      var eventObj = {
        employee_ids: this.employee_ids,
        completion_date: this.fs.value.completion_date
      }
      this.store.dispatch(new CloseLearningEvent({ data: <any>eventObj, event_id: this.eventid }));

      this.data = null;
      this.excludedProfile$ = [];
      this.selectedProfile$ = [];
      this.reset();
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingEventDetail());
    this.store.dispatch(new HideCloseEditorEvent());
    this.data = null;
    this.excludedProfile$ = [];
    this.selectedProfile$ = [];
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  setFieldvalue(eventId: number) {
    this.eventid = eventId;
  }

  storeSelectedProfile(item, event) {
    if (event.checked) {
      this.tempExcludedData.push(item);
    }
    else {
      this.tempExcludedData.splice(this.tempExcludedData.indexOf(item), 1);
    }
  }

  storeActiveProfile(item, event) {
    if (event.checked) {
      this.tempSelectedData.push(item);
    }
    else {
      this.tempSelectedData.splice(this.tempSelectedData.indexOf(item), 1);
    }
  }

  activedAllProfile() {
    this.excludedProfile$ = [];
    this.selectedProfile$ = [];

    this.tempSelectedData = [];
    this.fs.patch({ checked: false })
  }

  activeSelectedProfile() {
    if (this.tempSelectedData != undefined && this.tempSelectedData.length > 0) {
      for (let profile of this.tempSelectedData) {
        this.excludedProfile$.splice(this.excludedProfile$.indexOf(profile), 1);
        this.selectedProfile$.splice(this.selectedProfile$.indexOf(profile), 1);
      }
    }

    this.tempSelectedData = [];
    this.fs.patch({ checked: false });
  }

  excludedSelectedProfile() {
    if (this.tempExcludedData != undefined && this.tempExcludedData.length > 0) {
      for (let empData of this.tempExcludedData) {
        var isInArray = this.excludedProfile$.indexOf(empData) !== -1;
        if (!isInArray) {
          this.excludedProfile$.push(empData);
        }
      }
    }

    this.tempExcludedData = [];
    this.fs.patch({ checked: false });
  }

  excludedAllProfile() {
    this.excludedProfile$ = [];
    this.selectedProfile$ = [];

    this.tempExcludedData = [];

    if (this.allParticipants.length > 0) {
      for (let profile of this.allParticipants) {
        this.excludedProfile$.push(profile);
      }
    }
    this.fs.patch({ checked: false })
  }

}
