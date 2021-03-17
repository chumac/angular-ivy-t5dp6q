import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { getLearningLibraryData, LoadDataLearningLibrary, getcourseData, showEnrollLearningLibrary, showApplyLearningLibrary, getEventScheduleData, ShowEnrollLearningLibrary, ShowApplyLearningLibrary, LoadEventScheduleData, HideApplyLearningLibrary, HideEnrollLearningLibrary, LoadDataCourse } from '../../../../store/setups';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ICourse, ILearningLibrary } from '@nutela/models/talent/learning';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';
import { LearningLibraryEnrollEditorComponent } from './learning-library-enroll-editor/learning-library-enroll-editor.component';
import { LearningLibraryApplyEditorComponent } from './learning-library-apply-editor/learning-library-apply-editor.component';

@Component({
  selector: 'x365-fm-talent-learning-library',
  templateUrl: './learning-library.component.html',
  styleUrls: ['./learning-library.component.scss']
})
export class LearningLibraryComponent implements OnInit {

  learningLibraryData$: Observable<ILearningLibrary[]>;
  showEnrollEditor$: Observable<boolean>;
  showApplyEditor$: Observable<boolean>;
  courseData$: Observable<ICourse[]>;
  eventScheduleData$: Observable<IEventSchedule[]>;
  selectedEventId: number;
  courseId: number;
  dropDownFilterValue: string;
  isMoreShow: any = [];

  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('applyEditor') applyEditor: LearningLibraryApplyEditorComponent;
  @ViewChild('enrollEditor') enrollEditor: LearningLibraryEnrollEditorComponent;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataLearningLibrary());
    this.store.dispatch(new LoadDataCourse());
  }

  storeSelects() {
    this.learningLibraryData$ = this.store.pipe(select(getLearningLibraryData));
    this.showApplyEditor$ = this.store.pipe(select(showApplyLearningLibrary));
    this.showEnrollEditor$ = this.store.pipe(select(showEnrollLearningLibrary));
    this.courseData$ = this.store.pipe(select(getcourseData));
    this.eventScheduleData$ = this.store.pipe(select(getEventScheduleData));
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  onClickType(type, selectedEventId, courseId) {
    if (type === "ENROLL") {
      this.courseId = courseId;
      this.store.dispatch(new ShowEnrollLearningLibrary());
    } else if (type === "APPLY") {
      this.selectedEventId = selectedEventId;
      this.store.dispatch(new LoadEventScheduleData(selectedEventId));
      this.store.dispatch(new ShowApplyLearningLibrary());
    }
  }

  onCancelApplyEditor() {
    this.store.dispatch(new HideApplyLearningLibrary());
  }

  onCancelEnrollEditor() {
    this.store.dispatch(new HideEnrollLearningLibrary());
  }

  getRowData$(rowId: number): Observable<ILearningLibrary> {
    return this.learningLibraryData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  ClickMore(data, index) {
    if (data === 'more') {
      this.isMoreShow[index] = true;
    } else if (data === 'less') {
      this.isMoreShow[index] = false;
    }
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
