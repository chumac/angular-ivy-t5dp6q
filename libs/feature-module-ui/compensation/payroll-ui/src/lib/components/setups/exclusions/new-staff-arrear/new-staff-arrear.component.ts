import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IgxGridComponent } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { NewStaffService } from './new-staff.service';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IRootState } from '../../../../store/root/root.state';
import { Router } from '@angular/router';
import {  UtilService } from '@nutela/core-services';
import { NewStaffEditorComponent } from './new-staff-editor/new-staff-editor.component';
import { isProcessingStaffRun, LoadingStaff, ShowEditorStaff, showEditorStaff, HideEditorStaff, getStaffEmployeeData, LoadListEmployeeData, getEmployeeGroupSelectOption, LoadEmployeeGroupSelectOptionData, LoadCanProfileData, LoadCanRemoveData, getLoadReturnData } from '../../../../store/setup/exclusions/new-staff-arrear';
import { DialogService } from '@nutela/shared/ui';
import { IGetPayrollProfile, IstaffEmployeeList } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-new-staff-arrear',
  templateUrl: './new-staff-arrear.component.html',
  styleUrls: ['./new-staff-arrear.component.scss'],
})
export class NewStaffArrearComponent implements OnInit {
  subscribe: any;
  showEditor$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  staffEmployeeList$ : Observable<IstaffEmployeeList[]>;
  employeeGroup$ : Observable<any[]>;
  loadProfile$ : Observable<IGetPayrollProfile[]>;
  loadProfileData$ :  IGetPayrollProfile[];

  @ViewChild("newStaffEmployeeDataGrid") newStaffEmployeeDataGrid: IgxGridComponent;
  @ViewChild("newstaffEditor") editor: NewStaffEditorComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;


  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string, private dialogService: DialogService,
  private titleService: Title, public service: NewStaffService, private store: Store<IRootState>, private router: Router, private utilService: UtilService,) {
    titleService.setTitle(
      `${'Staff Run'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.staffEmployeeList$ = this.store.pipe(select(getStaffEmployeeData));
    this.employeeGroup$ = this.store.pipe(select(getEmployeeGroupSelectOption));
    this.showEditor$ = this.store.pipe(select(showEditorStaff));
    this.isLoading$ = this.store.pipe(select(isProcessingStaffRun));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingStaff());
    this.store.dispatch(new LoadListEmployeeData());
    this.store.dispatch(new LoadEmployeeGroupSelectOptionData());
  }

  onRefresh() {
    this.store.dispatch(new LoadListEmployeeData());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }
    if (this.newStaffEmployeeDataGrid) {
      this.service.search(
        this.newStaffEmployeeDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onStaffIconClicked() {
  this.store.dispatch(new ShowEditorStaff());
  }

  onLoadProfileClicked(rowId: number){
    this.loadProfile$ = this.store.pipe(select(getLoadReturnData));
    this.store.dispatch(new LoadCanProfileData({ employeeID: rowId }))
    this.store.dispatch(new ShowEditorStaff());
    
  }

  onDeletedIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `This action will submit the record for remove. Continue?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadCanRemoveData({ employee_id: rowId }))
        }
    })
  }

  onCancelEditor() {
    //this.editor.data = null;
    this.store.dispatch(new HideEditorStaff());
  }
}