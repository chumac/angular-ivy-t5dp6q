import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IStaffCategory } from '@nutela/models/platform/lookup';
import { StaffCategoriesEditorComponent } from './staff-categories-editor/staff-categories-editor.component';
import { Store, select } from '@ngrx/store';
import { LoadStaffCategoryData, showEditorStaffCategory, getStaffCategory, ShowEditorStaffCategory, HideEditorStaffCategory, DeleteStaffCategory, isProcessingStaffCategory, ProcessingStaffCategory } from '../../store';
import { map, take } from 'rxjs/operators';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { StaffCategoryService } from '../../components/services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'x365-fm-plf-hrf-staff-categories',
  templateUrl: './staff-categories.component.html',
  styleUrls: ['./staff-categories.component.scss']
})
export class StaffCategoriesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  public data: any[];

  public staffCategoryData$: Observable<IStaffCategory[]>;
  dropDownFilterValue:string;
  @ViewChild('staffGrid') staffGrid: IgxGridComponent;

   @ViewChild('editor') editor: StaffCategoriesEditorComponent;

              constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public staffCategory: StaffCategoryService) {
                titleService.setTitle(
                  `${'Staff Categories'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadStaffCategoryData());
    this.store.dispatch(new ProcessingStaffCategory());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorStaffCategory));
    this.staffCategoryData$= this.store.pipe(select(getStaffCategory));
    this.isProcessing$=this.store.pipe(select(isProcessingStaffCategory));
  }

  getRowStaffCategoryData$(rowId: number): Observable<IStaffCategory> {
    console.log('data row', rowId);
    return this.staffCategoryData$.pipe(
      map(d => d.filter(v => v.category_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowStaffCategoryData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorStaffCategory());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteStaffCategory({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorStaffCategory());
  }

  onAdd(){
    this.staffCategory.showEditor();
  }

  onRefreshedButtonClicked(){
    this.staffCategory.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.staffGrid) {
      if (filterValue) {
        this.staffGrid.clearFilter();
        this.staffGrid.filteringLogic = FilteringLogic.Or;
        this.staffGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.staffGrid.clearFilter();
        this.staffGrid.filteringLogic = FilteringLogic.Or;
        this.staffGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }


}
