import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ISelectOptionData } from '@nutela/models/common';
import { IDepartment } from '@nutela/models/platform/lookup';
import { Store, select } from '@ngrx/store';
import { ILookupState, LoadingDepartment, LoadDepartmentData, showEditorDepartment, getDepartment, isLoadingDepartment, ShowEditorDepartment, DeleteDepartment, HideEditorDepartment } from '../../store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Title } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators';
import { DepartmentEditorComponent } from './department-editor/department-editor.component';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'x365-fm-plf-lookup-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isLoading$:Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  public departmentData$: Observable<IDepartment[]>;
  dropDownFilterValue:string;
 @ViewChild('departmentGrid') departmentGrid: IgxGridComponent;

  @ViewChild('editor') editor: DepartmentEditorComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public departmentService: DepartmentService) {
                titleService.setTitle(
                  `${'Department'}${this.partialDocumentTitle}`
                );
              }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDepartmentData());
    this.store.dispatch(new LoadingDepartment());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorDepartment));
    this.departmentData$ = this.store.pipe(select(getDepartment));
    this.isLoading$=this.store.pipe(select(isLoadingDepartment));
  }

  getRowDepartmentData$(rowId: number): Observable<IDepartment> {
    console.log('data row', rowId);
    return this.departmentData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAdd(){
    this.departmentService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.departmentService.refresh();
  }

  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowDepartmentData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorDepartment());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDepartment({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorDepartment());
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.departmentGrid) {
      if (filterValue) {
        this.departmentGrid.clearFilter();
        this.departmentGrid.filteringLogic = FilteringLogic.Or;
        this.departmentGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.departmentGrid.clearFilter();
        this.departmentGrid.filteringLogic = FilteringLogic.Or;
        this.departmentGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
