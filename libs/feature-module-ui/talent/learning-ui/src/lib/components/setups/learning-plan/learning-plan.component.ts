import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import * as constants from '../../../constants';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { DeleteDataLearningPlan, getcourseData, getEventScheduleData, getLearningPlanData, getLearningPlanGoto, GotoDataLearningPlan, GotoDataLearningPlanAfterSuccess, HideApplyEditorLearningLibrary, HideEditorLearningPlan, HideEnrollEditorLearningLibrary, HideOptOutEditorLearningPlan, LoadDataCourse, LoadDataLearningPlan, LoadEventScheduleData, RemoveDataLearningPlan, ShowApplyEditorLearningLibrary, showApplyEditorLearningLibrary, showEditEditorLearningPlan, ShowEditorLearningPlan, ShowEnrollEditorLearningLibrary, showEnrollEditorLearningLibrary, ShowOptOutEditorLearningPlan, showOptOutEditorLearningPlan } from '../../../../store/setups';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ICourse, ILearningPlan } from '@nutela/models/talent/learning';
import { LearningPlanOptOutEditorComponent } from './learning-plan-optout-editor/learning-plan-optout-editor.component';
import { LearningPlanApplyEditorComponent } from './learning-plan-apply-editor/learning-plan-apply-editor.component';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';
import { LearningPlanEnrollEditorComponent } from './learning-plan-enroll-editor/learning-plan-enroll-editor.component';
import { LearningPlanEditEditorComponent } from './learning-plan-edit-editor/learning-plan-edit-editor.component';
import { LearningPlanService } from './learning-plan.service';

@Component({
  selector: 'x365-fm-talent-learning-plan',
  templateUrl: './learning-plan.component.html',
  styleUrls: ['./learning-plan.component.scss'],
})

export class LearningPlanComponent implements OnInit {

  showOptOutEditor$: Observable<boolean>;
  showEnrollEditor$: Observable<boolean>;
  showApplyEditor$: Observable<boolean>;
  showEditEditor$: Observable<boolean>;
  eventTypeOptions$ = constants.EVENT_TYPE;
  learningPlanData$: Observable<ILearningPlan[]>;
  eventGotoData$: any = [];
  courseData$: Observable<ICourse[]>;
  eventScheduleData$: Observable<IEventSchedule[]>;
  selectedType: number = 1;
  selectedEventId: number;
  dropDownFilterValue: string;
  editData: any;
  selectedProfile: number = 1;

  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('optOutEditor') optOutEditor: LearningPlanOptOutEditorComponent;
  @ViewChild('applyEditor') applyEditor: LearningPlanApplyEditorComponent;
  @ViewChild('enrollEditor') enrollEditor: LearningPlanEnrollEditorComponent;
  @ViewChild('editEditor') editEditor: LearningPlanEditEditorComponent;

  constructor(private store: Store<IAppState>, public service: LearningPlanService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataCourse());
    this.store.dispatch(new LoadDataLearningPlan({ recordId: this.selectedType }));
  }

  storeSelects() {
    this.showEditEditor$ = this.store.pipe(select(showEditEditorLearningPlan));
    this.learningPlanData$ = this.store.pipe(select(getLearningPlanData));
    this.showOptOutEditor$ = this.store.pipe(select(showOptOutEditorLearningPlan));
    this.showApplyEditor$ = this.store.pipe(select(showApplyEditorLearningLibrary));
    this.showEnrollEditor$ = this.store.pipe(select(showEnrollEditorLearningLibrary));
    this.courseData$ = this.store.pipe(select(getcourseData));
    this.eventScheduleData$ = this.store.pipe(select(getEventScheduleData));
    this.eventGotoData$ = this.store.pipe(select(getLearningPlanGoto));
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  onEventTypeSelect($event) {
    this.selectedType = $event.value;
    this.store.dispatch(new LoadDataLearningPlan({ recordId: $event.value }));
    this.learningPlanData$ = this.store.pipe(select(getLearningPlanData));
  }

  onCancelOptOutEditor() {
    this.store.dispatch(new HideOptOutEditorLearningPlan());
  }

  onCancelApplyEditor() {
    this.store.dispatch(new HideApplyEditorLearningLibrary());
  }

  onCancelEnrollEditor() {
    this.store.dispatch(new HideEnrollEditorLearningLibrary());
  }

  onCancelEditEditor() {
    this.store.dispatch(new HideEditorLearningPlan());
  }

  getRowData$(rowId: number): Observable<ILearningPlan> {
    return this.learningPlanData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onOptOutEditornClicked(rowId: number) {
    this.selectedEventId = rowId;
    this.store.dispatch(new ShowOptOutEditorLearningPlan());
  }

  onApplyClicked(rowId: number) {
    this.selectedEventId = rowId;
    this.store.dispatch(new LoadEventScheduleData(rowId));
    this.store.dispatch(new ShowApplyEditorLearningLibrary());
  }

  onEnrollClicked(rowId: number) {
    this.store.dispatch(new ShowEnrollEditorLearningLibrary());
  }

  onRemoveIconClicked(rowId) {
    this.dialogBoxService.show(`Are you sure you want to remove your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new RemoveDataLearningPlan({ recordId: rowId, eventType: this.selectedType }));
        }
      });
  }

  onEditClicked(id) {
    this.selectedEventId = id;
    this.editEditor.data = null;
    this.getRowData$(id).pipe(take(1))
      .subscribe((result) => {
        this.editEditor.data = result;
        this.store.dispatch(new ShowEditorLearningPlan());
      }
      );
  }

  onGotoClicked(code) {
    this.store.dispatch(new GotoDataLearningPlan({ code: code }));
    this.eventGotoData$.pipe().subscribe(item => {
      if (item) {
        this.store.dispatch(new GotoDataLearningPlanAfterSuccess());
        this.eventGotoData$ = null;
        window.open(item[0], "_blank");
      }
    });
    this.store.dispatch(new GotoDataLearningPlanAfterSuccess());
    this.eventGotoData$ = null;
  }

  onDeleteIconClicked(rowId) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataLearningPlan({ recordId: rowId, eventType: this.selectedType }));
        }
      });
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
