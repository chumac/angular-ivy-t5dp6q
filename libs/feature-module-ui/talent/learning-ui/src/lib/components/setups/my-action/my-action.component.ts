import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ICourse, IEventEmployee, IFeedBackForm, IMyAction } from '@nutela/models/talent/learning';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';
import { getFormMyActionData, getMyActionData, HideActionFeedbackFormEditorEvent, HideActionNominationEditorEvent, HideOptOutEditorMyAction, LoadDataMyAction, LoadFormDataMyAction, showActionFeedbackFormEditorEvent, ShowActionFeedbackFormEditorEvent, showActionNominationEditorEvent, ShowActionNominationEditorEvent, ShowOptOutEditorMyAction, showOptOutEditorMyAction } from '../../../../store/setups/my-action';
import { MyActionService } from './my-action.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { Router } from '@angular/router';
import { GetEventEmployee, getEventEmployee } from '../../../../store';
import { MyActionFacultyNominationComponent } from './my-action-faculty-nomination/my-action-faculty-nomination.component';
import { MyActionOptOutComponent } from './my-action-opt-out/my-action-opt-out.component';
import { MyActionFeedbackFormComponent } from './my-action-feedback-form/my-action-feedback-form.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-talent-my-action',
  templateUrl: './my-action.component.html',
  styleUrls: ['./my-action.component.scss']
})
export class MyActionComponent implements OnInit {

  myActionData$: Observable<IMyAction[]>;
  myFormActionData$: Observable<IFeedBackForm[]>;
  allEmployee$: Observable<IEventEmployee[]>;
  showEnrollEditor$: Observable<boolean>;
  showApplyEditor$: Observable<boolean>;
  courseData$: Observable<ICourse[]>;
  eventScheduleData$: Observable<IEventSchedule[]>;
  showActionNomination$: Observable<boolean>;
  showActionOptOutEditor$: Observable<boolean>;
  showActionFeedbackFormEditor$: Observable<boolean>;
  selectedEventId: number;
  dropDownFilterValue: string;
  roleId: number = 0;
  eventid: number;

  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('actionNomination') actionNomination: MyActionFacultyNominationComponent;
  @ViewChild('actionOptOutEditor') actionOptOutEditor: MyActionOptOutComponent;
  @ViewChild('actionFeedbackFormEditor') actionFeedbackFormEditor: MyActionFeedbackFormComponent;

  constructor(private store: Store<IAppState>, public router: Router, public service: MyActionService) { }

  ngOnInit() {
    if ((this.router.url.search('manager-action') !== -1)) {
      this.roleId = 1;
    } else {
      this.roleId = 0;
    }
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataMyAction({ recordId: this.roleId }));
    this.store.dispatch(new GetEventEmployee());
  }

  storeSelects() {
    this.myActionData$ = this.store.pipe(select(getMyActionData));
    this.myFormActionData$ = this.store.pipe(select(getFormMyActionData));
    this.allEmployee$ = this.store.pipe(select(getEventEmployee));
    this.showActionNomination$ = this.store.pipe(select(showActionNominationEditorEvent));
    this.showActionOptOutEditor$ = this.store.pipe(select(showOptOutEditorMyAction));
    this.showActionFeedbackFormEditor$ = this.store.pipe(select(showActionFeedbackFormEditorEvent));
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  onRefreshButtonClicked() {
    this.store.dispatch(new LoadDataMyAction({ recordId: this.roleId }));
    this.store.dispatch(new ShowToast({ title: null, message: `Action Information is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideActionNominationEditorEvent());
  }

  onCancelOptOutEditor() {
    this.store.dispatch(new HideOptOutEditorMyAction());
  }

  onFeedbackFormCancelEditor() {
    this.store.dispatch(new HideActionFeedbackFormEditorEvent());
  }

  onFacultyNominationClicked(eventid) {
    this.eventid = eventid;
    this.store.dispatch(new ShowActionNominationEditorEvent());
  }

  onFeedbackFormClicked(form_id) {
    this.store.dispatch(new LoadFormDataMyAction({ recordId: form_id }));
    this.myFormActionData$.pipe().subscribe(item => {
      if (item[0]) {
        this.store.dispatch(new ShowActionFeedbackFormEditorEvent());
      }
    });
  }

  onOptOutClicked(eventid) {
    this.eventid = eventid;
    this.store.dispatch(new ShowOptOutEditorMyAction());
  }

  filter(term: string, filterValue: string) {
    if (this.grid) {
      if (filterValue) {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
