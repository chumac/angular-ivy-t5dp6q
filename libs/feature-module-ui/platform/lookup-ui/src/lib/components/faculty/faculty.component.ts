import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IFaculty } from '@nutela/models/platform/lookup';
import { Store, select } from '@ngrx/store';
import { ILookupState, LoadFacultyData, LoadingFaculty, showEditorFaculty, getFaculty, isLoadingFaculty, ShowEditorFaculty, DeleteFaculty, HideEditorFaculty } from '../../store';
import { Title } from '@angular/platform-browser';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { FacultyService } from '../services/faculty.service';
import { FacultyEditorComponent } from './faculty-editor/faculty-editor.component';
import { map, take } from 'rxjs/operators';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';

@Component({
  selector: 'x365-fm-plf-lookup-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isLoading$:Observable<boolean>;

  public data: any[];

  public facultyData$: Observable<IFaculty[]>;
  dropDownFilterValue:string;
 @ViewChild('facultyGrid') facultyGrid: IgxGridComponent;

  @ViewChild('editor') editor: FacultyEditorComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public facultyService: FacultyService) {
                titleService.setTitle(
                  `${'Faculty'}${this.partialDocumentTitle}`
                );
              }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadFacultyData());
    this.store.dispatch(new LoadingFaculty());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFaculty));
    this.facultyData$ = this.store.pipe(select(getFaculty));
    this.isLoading$=this.store.pipe(select(isLoadingFaculty));
  }

  getRowfacultyData$(rowId: number): Observable<IFaculty> {
    console.log('data row', rowId);
    return this.facultyData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAdd(){
    this.facultyService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.facultyService.refresh();
  }

  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowfacultyData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorFaculty());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteFaculty({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorFaculty());
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.facultyGrid) {
      if (filterValue) {
        this.facultyGrid.clearFilter();
        this.facultyGrid.filteringLogic = FilteringLogic.Or;
        this.facultyGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.facultyGrid.clearFilter();
        this.facultyGrid.filteringLogic = FilteringLogic.Or;
        this.facultyGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
