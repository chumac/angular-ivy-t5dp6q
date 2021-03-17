import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IQualificationCategory } from '@nutela/models/platform/lookup';
import { Store, select } from '@ngrx/store';
import { QualificationCategoriesEditorComponent } from './qualification-categories-editor/qualification-categories-editor.component';
import { map, take } from 'rxjs/operators';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { QualificationCategoriesService } from '../services';
import { LoadQualificationCategoryData, showEditorQualificationCategory, getQualificationCategory, ShowEditorQualificationCategory, DeleteQualificationCategory, HideEditorQualificationCategory, isProcessingQualificationCategory, ProcessingQualificationCategory } from '../../store';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-plf-hrf-qualification-categories',
  templateUrl: './qualification-categories.component.html',
  styleUrls: ['./qualification-categories.component.scss']
})
export class QualificationCategoriesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;

  public data: any[];

  public qualificationCategory$: Observable<IQualificationCategory[]>;
  dropDownFilterValue:string;
  @ViewChild('categoryGrid') categoryGrid: IgxGridComponent;

   @ViewChild('editor') editor: QualificationCategoriesEditorComponent;


              constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public qualificationCategoryService: QualificationCategoriesService) {
                titleService.setTitle(
                  `${'Qualification Categories'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadQualificationCategoryData());
    this.store.dispatch(new ProcessingQualificationCategory());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorQualificationCategory));
    this.qualificationCategory$= this.store.pipe(select(getQualificationCategory));
    this.isProcessing$=this.store.pipe(select(isProcessingQualificationCategory))
  }

  getRowQualificationCategoryData$(rowId: number): Observable<IQualificationCategory> {
    console.log('data row', rowId);
    return this.qualificationCategory$.pipe(
      map(d => d.filter(v => v.category_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowQualificationCategoryData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorQualificationCategory());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteQualificationCategory({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorQualificationCategory());
  }

  onAdd(){
    this.qualificationCategoryService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.qualificationCategoryService.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.categoryGrid) {
      if (filterValue) {
        this.categoryGrid.clearFilter();
        this.categoryGrid.filteringLogic = FilteringLogic.Or;
        this.categoryGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.categoryGrid.clearFilter();
        this.categoryGrid.filteringLogic = FilteringLogic.Or;
        this.categoryGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
