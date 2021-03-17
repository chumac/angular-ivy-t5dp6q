import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IMultiRoleJob } from '@nutela/models/workforce/employee-profiles';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { LoadMultiJobRoleTransaction, LoadingMultiJobRoleTransaction, showEditorMultiJobRoleTransaction, 
         getMultiJobRoleTransaction, isLoadingMultiJobRoleTransaction, ShowEditorMultiJobRoleTransaction, 
         DeleteMultiJobRoleTransaction, HideEditorMultiJobRoleTransaction, LoadEmployeeList, LoadPositionList, getEmployeeListMultiJobRoleTransaction } from '../../../../store/hr-transactions/multi-job-role';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { MultiJobRolesService } from './multi-job-roles.service';
import { MultiJobRolesEditorComponent } from './multi-job-roles-editor/multi-job-roles-editor.component';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular';

@Component({
  selector: 'x365-fm-workforce-multi-job-roles',
  templateUrl: './multi-job-roles.component.html',
  styleUrls: ['./multi-job-roles.component.scss'],
  providers: [MultiJobRolesService]
})
export class MultiJobRolesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isLoading$:Observable<boolean>;

  public data: any[];

  public multiJobRole$: Observable<IMultiRoleJob[]>;
  public employeeList$: Observable<ISelectOption[]>;

  @ViewChild('editor') editor: MultiJobRolesEditorComponent;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("multiJobRoles") multiJobRoles: IgxGridComponent;
  @ViewChild("employeeSelect") employeeSelect: DxLookupComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: MultiJobRolesService,
    private store: Store<IEmployeesProfileState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'MultijobRole'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadEmployeeList());
    this.store.dispatch(new LoadPositionList());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorMultiJobRoleTransaction));
    this.multiJobRole$ = this.store.pipe(select(getMultiJobRoleTransaction));
    this.isLoading$=this.store.pipe(select(isLoadingMultiJobRoleTransaction));
    this.employeeList$=this.store.pipe(select(getEmployeeListMultiJobRoleTransaction));
  }

  onEmployeeSelect(event){
    console.log('emp',this.employeeSelect.value)
    this.service.employeeId=event.value;
    this.editor.employeeId=this.service.employeeId;
    this.store.dispatch(new LoadingMultiJobRoleTransaction());
    this.store.dispatch(new LoadMultiJobRoleTransaction({employeeId:this.service.employeeId}));
  }

  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.multiJobRoles) {
      this.service.search(this.multiJobRoles, searchString, filterBy);
    }
  }

  onAdd(){
    this.store.dispatch(new ShowEditorMultiJobRoleTransaction());
  }

  onRefresh(){
    console.log(this.service.employeeId);
    if(this.service.employeeId){
      this.store.dispatch(new LoadMultiJobRoleTransaction({employeeId:this.service.employeeId}));
      this.store.dispatch(new ShowToast({title: null, message: ` Data was refreshed successfully.`, type: ToastTypes.SUCCESS}))
    }
  }

  getMultijobTransactionData$(rowId: number): Observable<IMultiRoleJob> {
    return this.multiJobRole$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onEditMultijobIconClicked(row_id: number) {
    console.log('roID', row_id)
    this.editor.data = null;
    this.getMultijobTransactionData$(row_id).pipe(take(1))
      .subscribe((result) => {
        console.log(result)
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorMultiJobRoleTransaction());
      }
      );
  }

  onDeleteMultijobIconClicked(row_id:number){
    const recordId = [{id:row_id}];
    console.log(recordId);
    if(this.service.employeeId){
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteMultiJobRoleTransaction({recordId: recordId, employeeId:this.service.employeeId}));
        }
      });
    }
  }

  onDeleteMultiple(){
    const selectedItems = this.multiJobRoles.selectedRows().map(d=>{
       return { id:d.id}
    });
    console.log(selectedItems);
    if (selectedItems.length === 0) {
      this.store.dispatch(new ShowToast({title: null, message: `Please, select items to delete.`, type: ToastTypes.INFO}));
    }
    else {
      this.dialogBoxService.show(`Are you sure you want to delete all these?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteMultiJobRoleTransaction({recordId: selectedItems, employeeId:this.service.employeeId}));
        }
      });
    }
    
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorMultiJobRoleTransaction());
  }
}
