import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISelectOptionData } from '@nutela/models/common';
import { IEducationGrades } from '@nutela/models/platform/lookup';
import { EducationGradesEditorComponent } from './education-grades-editor/education-grades-editor.component';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { LoadEducationalGradeData, showEditorEducationGrades, getEducationGrades, ShowEditorEducationalGrade, HideEditorEducationalGrade, DeleteEducationalGrade, isProcessingEducationGrades, ProcessingEducationalGrade } from '../../store';
import { map, take } from 'rxjs/operators';
import { EducationalGradeService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-plf-hrf-education-grades',
  templateUrl: './education-grades.component.html',
  styleUrls: ['./education-grades.component.scss']
})
export class EducationGradesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  public data: any[];

  public educationGradeData$: Observable<IEducationGrades[]>;
  dropDownFilterValue:string;
  @ViewChild('gradeGrid') gradeGrid: IgxGridComponent;

   @ViewChild('editor') editor: EducationGradesEditorComponent;


              constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public educationalGradeService: EducationalGradeService,) {
                titleService.setTitle(
                  `${'Educational Grade'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadEducationalGradeData());
    this.store.dispatch(new ProcessingEducationalGrade());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorEducationGrades));
    this.educationGradeData$= this.store.pipe(select(getEducationGrades));
    this.isProcessing$=this.store.pipe(select(isProcessingEducationGrades));

  }

  getRowEducationGradesData$(rowId: number): Observable<IEducationGrades> {
    console.log('data row', rowId);
    return this.educationGradeData$.pipe(
      map(d => d.filter(v => v.edugrade_id === rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowEducationGradesData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorEducationalGrade());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteEducationalGrade({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorEducationalGrade());
  }

  onAdd(){
    this.educationalGradeService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.educationalGradeService.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.gradeGrid) {
      if (filterValue) {
        this.gradeGrid.clearFilter();
        this.gradeGrid.filteringLogic = FilteringLogic.Or;
        this.gradeGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.gradeGrid.clearFilter();
        this.gradeGrid.filteringLogic = FilteringLogic.Or;
        this.gradeGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
