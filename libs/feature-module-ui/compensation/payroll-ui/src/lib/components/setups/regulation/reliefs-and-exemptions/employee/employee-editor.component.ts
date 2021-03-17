import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IEmployee, IGradeRelief, IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { IRootState } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IReliefEmployeeData } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-employeeData.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DeleteEmployeeRelief, getByIdEmployeeData, getByIdPaygroupData, getByIdReliefGradeData, GetEmployeeData, GetPayGroupData, getReliefCurrencyData, getReliefEmployeeData, getReliefEmployeeDataList, GetReliefGradeData, getReliefGradeData, getReliefPayGroupData, getuseRuleData, HideEmployeeEditorRelief, HideGradeEditorRelief, HidePayGroupEditorRelief, isLoadingRelief, LoadEmployeeData, LoadReliefCurrencyData, LoadReliefEmployeeListData, LoadReliefGradeData, LoadReliefPayGroupData, LoadUseRuleData, showEditorEmployeeRelief, showEditorGradesRelief, showEditorPayGroupRelief, ShowEmployeeEditorRelief, ShowGradeEditorRelief, ShowPayGroupEditorRelief } from '../../../../../store/setup/regulation/reliefs-and-exemptions';
import { AddEmployeeEditorComponent } from './add-employee-editor/add-employee-editor.component';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'x365-fm-payrl-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.scss']
})
export class EmployeeEditorComponent implements OnInit {
  isLoading$: Observable<boolean>;
  employeeData$: Observable<IEmployee[]>;
  reliefId : number;
  employeeId : number;
  showAddEmployeeEditor$ :Observable<boolean>;
  useRuleData$ : Observable<IUseRuleRelief[]>;
  reliefCurrencyData$: Observable<IReliefCurrency[]>;
  reliefEmployeeDataList$: Observable<IReliefEmployeeData[]>;
  employeeDataByid$: Observable<IEmployee>;
  subscribe:any;
  reliefdetId:any;

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("employeeDataGrid") employeeDataGrid: IgxGridComponent;
  @ViewChild("employee") employee: AddEmployeeEditorComponent;
  profileId: any;
  
  constructor(private router: Router, 
    public service: EmployeeService,
    private dialogBoxService: DialogBoxService,
    private store: Store<IRootState>,
    private route: ActivatedRoute, ) { 
    this.assignProfileId();
  }
  

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      this.profileId = v.profileId;
      if(v.relieftId != null){
        this.reliefId = parseInt(v.relieftId);
        this.store.dispatch(new LoadEmployeeData(this.reliefId));
      }
    });
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingRelief));
    this.employeeData$ = this.store.pipe(select(getReliefEmployeeData));
    this.showAddEmployeeEditor$ = this.store.pipe(select(showEditorEmployeeRelief));
    this.useRuleData$ = this.store.pipe(select(getuseRuleData));
    this.reliefCurrencyData$ = this.store.pipe(select(getReliefCurrencyData));
    this.reliefEmployeeDataList$ = this.store.pipe(select(getReliefEmployeeDataList));
    this.employeeDataByid$ = this.store.pipe(select(getByIdEmployeeData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadUseRuleData());
    this.store.dispatch(new LoadReliefCurrencyData());
    this.store.dispatch(new LoadReliefEmployeeListData());
  }
  onCancelViewer(){
    this.store.dispatch(new HideEmployeeEditorRelief());
  }
  onViewPayGroupReliefClicked(val,employee_id){
    this.employeeId = employee_id;
    this.reliefdetId = val;
    this.store.dispatch(new GetEmployeeData(val));
    this.subscribe = this.employeeDataByid$.subscribe(value => {
      if (value) {
        this.employee.data = value;
        this.employee.setDefaultFields(value);
        this.store.dispatch(new LoadUseRuleData());
        this.store.dispatch(new ShowEmployeeEditorRelief());
      }
    })
  }

  goBack(){
      this.router.navigate([`${STANDARD_ROUTES.reliefProfiles}/${this.profileId}`])
   // this.router.navigate([`${STANDARD_ROUTES.backreliefProfiles}`])
  }
  onRefresh(){
    this.store.dispatch(new LoadEmployeeData(this.reliefId));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }
  
  onAdd() {
    this.store.dispatch(new LoadUseRuleData());
    this.store.dispatch(new ShowEmployeeEditorRelief());
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

    if (this.employeeDataGrid) {
      this.service.search(
        this.employeeDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onDeleteIconClicked(row_id:number){
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteEmployeeRelief({reliefdet_id: row_id}));
          this.store.dispatch(new LoadEmployeeData(this.reliefId));
        }
      });
  }

}
