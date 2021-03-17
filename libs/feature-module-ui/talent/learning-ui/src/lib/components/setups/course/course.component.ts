import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ICourse, IEventDetailType } from '@nutela/models/talent/learning';
import { DeleteDataCourse, HideEditorCourse, getEventDetailType, GetEventDetailType, ShowEditorCourse, ShowViewerCourse, HideViewerCourse, showViewercourse, LoadDataCourse, showEditorcourse } from '../../../../store/setups';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { getcourseData } from '../../../../store/setups/course';
import { CourseEditorComponent } from './course-editor/course-editor.component';
import { CourseViewerComponent } from './course-viewer/course-viewer.component';
import { CourseService } from './course.service';

@Component({
  selector: 'x365-fm-talent-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [CourseService],
})
export class CourseComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  courseData$: Observable<ICourse[]>;
  eventDetailType$: Observable<IEventDetailType[]>;

  dropDownFilterValue: string;
  
  @ViewChild('editor') editor: CourseEditorComponent;
  @ViewChild('viewer') viewer: CourseViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private store: Store<IAppState>, public service: CourseService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataCourse());
    this.store.dispatch(new GetEventDetailType());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorcourse));
    this.showViewer$ = this.store.pipe(select(showViewercourse));
    this.courseData$ = this.store.pipe(select(getcourseData));
    this.eventDetailType$ = this.store.pipe(select(getEventDetailType));
  }

  getRowData$(rowId: number): Observable<ICourse> {
    return this.courseData$.pipe(
      map(d => d.filter(v => v.course_id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorCourse());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCourse());
        }
      );
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataCourse());
    this.store.dispatch(new ShowToast({title: null, message: `Course Information is being refreshed.`, type: ToastTypes.INFO}));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorCourse());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerCourse());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCourse());
        }
      );
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }
  
  onDeleteIconClicked(rowId: number) {
    console.log(rowId);
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataCourse({recordId: rowId}));
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
