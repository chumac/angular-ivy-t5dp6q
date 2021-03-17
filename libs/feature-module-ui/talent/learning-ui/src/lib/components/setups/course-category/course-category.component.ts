import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ICourseCategory } from '@nutela/models/talent/learning';
import { DeleteDataCourseCategory, HideEditorCourseCategory, HideViewerCourseCategory, ShowViewerCourseCategory, showEditorCourseCategory, showViewerCourseCategory, getcourseCategoryData, ShowEditorCourseCategory, LoadDataCourseCategory } from '../../../../store/setups';
import { CourseCategoryService } from './course-category.service';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { CourseCategoryEditorComponent } from './course-category-editor/course-category-editor.component';
import { CourseCategoryViewerComponent } from './course-category-viewer/course-category-viewer.component';

@Component({
  selector: 'x365-fm-talent-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.scss'],
  providers: [CourseCategoryService],
})
export class CourseCategoryComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  courseCategoryData$: Observable<ICourseCategory[]>;

  dropDownFilterValue: string;

  @ViewChild('editor') editor: CourseCategoryEditorComponent;
  @ViewChild('viewer') viewer: CourseCategoryViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private store: Store<IAppState>,public service: CourseCategoryService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataCourseCategory());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCourseCategory));
    this.showViewer$ = this.store.pipe(select(showViewerCourseCategory));
    this.courseCategoryData$ = this.store.pipe(select(getcourseCategoryData));
  }

  getRowData$(rowId: number): Observable<ICourseCategory> {
    return this.courseCategoryData$.pipe(
      map(d => d.filter(v => v.category_id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorCourseCategory());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCourseCategory());
        }
      );
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataCourseCategory());
    this.store.dispatch(new ShowToast({title: null, message: `Course Category Information is being refreshed.`, type: ToastTypes.INFO}));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorCourseCategory());
  }
  
  onCancelViewer() {
    this.store.dispatch(new HideViewerCourseCategory());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCourseCategory());
        }
      );
  }
  
  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataCourseCategory({recordId: rowId}));
        }
      });
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
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

  onDownloadIconClicked(rowId: number) {}

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  unsubscribe() {}

  ngOnDestroy() {
    this.unsubscribe();
  }

}
