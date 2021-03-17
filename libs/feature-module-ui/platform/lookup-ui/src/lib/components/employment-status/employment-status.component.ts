import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IEmployeeStatus } from '@nutela/models/platform/lookup';
import { EmploymentStatusEditorComponent } from './employment-status-editor/employment-status-editor.component';
import { Store, select } from '@ngrx/store';
import { LoadEmployeeStatusData, getEmployeeStatus, showEditorEmployeeStatus, ShowEditorEmployeeStatus, HideEditorEmployeeStatus, DeleteEmployeeStatus, isProcessingEmployeeStatus, ProcessingEmployeeStatus } from '../../store';
import { map, take } from 'rxjs/operators';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { EmployeeStatusService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-plf-hrf-employment-status',
  templateUrl: './employment-status.component.html',
  styleUrls: ['./employment-status.component.scss']
})
export class EmploymentStatusComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;

  public data: any[];

  public employeeStatusData$: Observable<IEmployeeStatus[]>;
  dropDownFilterValue:string;
  @ViewChild('statusGrid') statusGrid: IgxGridComponent;


   @ViewChild('editor') editor: EmploymentStatusEditorComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public employeeStatusService: EmployeeStatusService) {
                titleService.setTitle(
                  `${'Employment Status'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadEmployeeStatusData());
    this.store.dispatch(new ProcessingEmployeeStatus());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorEmployeeStatus));
    this.employeeStatusData$= this.store.pipe(select(getEmployeeStatus));
    this.isProcessing$=this.store.pipe(select(isProcessingEmployeeStatus));
  }

  getRowEmployeeStatusData$(rowId: number): Observable<IEmployeeStatus> {
    console.log('data row', rowId);
    return this.employeeStatusData$.pipe(
      map(d => d.filter(v => v.status_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowEmployeeStatusData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorEmployeeStatus());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteEmployeeStatus({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorEmployeeStatus());
  }

  onAdd(){
    this.employeeStatusService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.employeeStatusService.refresh();
  }

   onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.statusGrid) {
      if (filterValue) {
        this.statusGrid.clearFilter();
        this.statusGrid.filteringLogic = FilteringLogic.Or;
        this.statusGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.statusGrid.clearFilter();
        this.statusGrid.filteringLogic = FilteringLogic.Or;
        this.statusGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
