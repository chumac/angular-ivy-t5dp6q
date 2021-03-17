import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IGradeRelief, IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { IRootState } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IReliefGrade } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-grade.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DeleteGradeRelief, getByIdReliefGradeData, getReliefCurrencyData, GetReliefGradeData, getReliefGradeData, getReliefGradeDataList, getuseRuleData, HideGradeEditorRelief, isLoadingRelief, LoadReliefCurrencyData, LoadReliefGradeData, LoadReliefGradeListData, LoadUseRuleData, showEditorGradesRelief, ShowGradeEditorRelief } from '../../../../../store/setup/regulation/reliefs-and-exemptions';
import { AddGradesEditorComponent } from './add-grades-editor/add-grades-editor.component';
import { GradesService } from './grades.services';

@Component({
  selector: 'x365-fm-payrl-grades-editor',
  templateUrl: './grades-editor.component.html',
  styleUrls: ['./grades-editor.component.scss']
})
export class GradesEditorComponent implements OnInit {

  isLoading$: Observable<boolean>;
  gradeData$: Observable<IGradeRelief[]>;
  reliefId : number;
  gradeId : number;
  showAddGradesEditor$ :Observable<boolean>;
  useRuleData$ : Observable<IUseRuleRelief[]>;
  reliefCurrencyData$: Observable<IReliefCurrency[]>;
  reliefGradeData$: Observable<IReliefGrade[]>;
  gradeDataByid$: Observable<IGradeRelief>;
  subscribe:any;
  reliefdetId:any;


  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("gradesDataGrid") gradesDataGrid: IgxGridComponent;
  @ViewChild("guides") guides: AddGradesEditorComponent;
  profileId: any;
  
  constructor(private router: Router, 
    public service: GradesService,
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
        this.store.dispatch(new LoadReliefGradeData(v.relieftId));
      }
    });
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingRelief));
    this.gradeData$ = this.store.pipe(select(getReliefGradeData));
    this.showAddGradesEditor$ = this.store.pipe(select(showEditorGradesRelief));
    this.useRuleData$ = this.store.pipe(select(getuseRuleData));
    this.reliefCurrencyData$ = this.store.pipe(select(getReliefCurrencyData));
    this.reliefGradeData$ = this.store.pipe(select(getReliefGradeDataList));
    this.gradeDataByid$ = this.store.pipe(select(getByIdReliefGradeData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadUseRuleData());
    this.store.dispatch(new LoadReliefCurrencyData());
    this.store.dispatch(new LoadReliefGradeListData());
  }
  onCancelViewer(){
    this.store.dispatch(new HideGradeEditorRelief());
  }
  onViewGradeReliefClicked(val,gradeId){
    this.gradeId = gradeId;
    this.reliefdetId = val;
    this.store.dispatch(new GetReliefGradeData(val));
    this.subscribe = this.gradeDataByid$.subscribe(value => {
      if (value) {
        this.guides.data = value;
        this.guides.setDefaultFields(value);
        this.store.dispatch(new LoadUseRuleData());
        this.store.dispatch(new ShowGradeEditorRelief());
      }
    })
  }

  goBack(){
     this.router.navigate([`${STANDARD_ROUTES.reliefProfiles}/${this.profileId}`])
    // this.router.navigate([`${STANDARD_ROUTES.backreliefProfiles}`])
  }
  onRefresh(){
    this.store.dispatch(new LoadReliefGradeData(this.reliefId));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onAdd() {
    this.store.dispatch(new LoadUseRuleData());
    this.store.dispatch(new ShowGradeEditorRelief());
  }

  onDeleteIconClicked(row_id:number){
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteGradeRelief({reliefdet_id: row_id}));
          this.store.dispatch(new LoadReliefGradeData(this.reliefId));
        }
      });
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

    if (this.gradesDataGrid) {
      this.service.search(
        this.gradesDataGrid,
        searchString,
        filterBy
      );
    }
  }

}
