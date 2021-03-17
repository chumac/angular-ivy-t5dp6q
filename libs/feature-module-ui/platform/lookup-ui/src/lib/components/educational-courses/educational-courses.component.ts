import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEducationalCourses } from '@nutela/models/platform/lookup';
import { EducationalCoursesEditorComponent } from './educational-courses-editor/educational-courses-editor.component';
import { LoadEducationalCoursesData, getEducationalCourses, showEditorEducationalCourses, ShowEditorEducationalCourses, HideEditorEducationalCourses, DeleteEducationalCourses, isProcessingEducationalCourses, ProcessingEducationalCourses } from '../../store';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { EducationalCoursesService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-plf-hrf-educational-courses',
  templateUrl: './educational-courses.component.html',
  styleUrls: ['./educational-courses.component.scss']
})
export class EducationalCoursesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  public data: any[];

  public educationCoursesData$: Observable<IEducationalCourses[]>;
  dropDownFilterValue:string;
  @ViewChild('courseGrid') courseGrid: IgxGridComponent;

   @ViewChild('editor') editor: EducationalCoursesEditorComponent;

   constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public educationalCourse: EducationalCoursesService,) {
                titleService.setTitle(
                  `${'Educational Courses'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadEducationalCoursesData());
    this.store.dispatch(new ProcessingEducationalCourses());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorEducationalCourses));
    this.educationCoursesData$= this.store.pipe(select(getEducationalCourses));
    this.isProcessing$= this.store.pipe(select(isProcessingEducationalCourses));
  }

  getRowEducationalCoursesData$(rowId: number): Observable<IEducationalCourses> {
    console.log('data row', rowId);
    return this.educationCoursesData$.pipe(
      map(d => d.filter(v => v.course_id === rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowEducationalCoursesData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorEducationalCourses());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteEducationalCourses({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorEducationalCourses());
  }

  onAdd(){
    this.educationalCourse.showEditor();
  }

  onRefreshedButtonClicked(){
    this.educationalCourse.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.courseGrid) {
      if (filterValue) {
        this.courseGrid.clearFilter();
        this.courseGrid.filteringLogic = FilteringLogic.Or;
        this.courseGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.courseGrid.clearFilter();
        this.courseGrid.filteringLogic = FilteringLogic.Or;
        this.courseGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
