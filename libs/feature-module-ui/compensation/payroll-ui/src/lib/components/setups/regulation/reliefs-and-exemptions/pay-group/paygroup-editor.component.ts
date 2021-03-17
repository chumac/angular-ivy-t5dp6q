import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IGradeRelief, IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { IRootState } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IReliefPayGroup } from 'libs/models/compensation/payroll/src/lib/interfaces/relief.paygroupList.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DeletePaygroupRelief, getByIdPaygroupData, getByIdReliefGradeData, GetPayGroupData, getReliefCurrencyData, GetReliefGradeData, getReliefGradeData, getReliefPayGroupData, getReliefPayGroupDataList, getuseRuleData, HideGradeEditorRelief, HidePayGroupEditorRelief, isLoadingRelief, LoadReliefCurrencyData, LoadReliefGradeData, LoadReliefPayGroupData, LoadReliefPayGroupListData, LoadUseRuleData, showEditorGradesRelief, showEditorPayGroupRelief, ShowGradeEditorRelief, ShowPayGroupEditorRelief } from '../../../../../store/setup/regulation/reliefs-and-exemptions';
import { GradesService } from '../grades-editor/grades.services';
import { AddPayGroupEditorComponent } from './add-paygroup-editor/add-paygroup-editor.component';

@Component({
  selector: 'x365-fm-payrl-paygroup-editor',
  templateUrl: './paygroup-editor.component.html',
  styleUrls: ['./paygroup-editor.component.scss']
})
export class PaygroupEditorComponent implements OnInit {

  isLoading$: Observable<boolean>;
  paygroupData$: Observable<IGradeRelief[]>;
  reliefId: number;
  paygroupId: number;
  showAddPayGroupEditor$: Observable<boolean>;
  useRuleData$: Observable<IUseRuleRelief[]>;
  reliefCurrencyData$: Observable<IReliefCurrency[]>;
  reliefPayGroupListData$: Observable<IReliefPayGroup[]>;
  payGroupDataByid$: Observable<IGradeRelief>;
  subscribe: any;
  reliefdetId: any;

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("gradesDataGrid") gradesDataGrid: IgxGridComponent;
  @ViewChild("paygroup") paygroup: AddPayGroupEditorComponent;
  profileId: any;

  constructor(private router: Router, 
    public service: GradesService,
    private dialogBoxService: DialogBoxService,
    private store: Store<IRootState>, 
    private route: ActivatedRoute,) {
    this.assignProfileId();
  }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      this.profileId = v.profileId;
      if (v.relieftId != null) {
        this.reliefId = parseInt(v.relieftId);
        this.store.dispatch(new LoadReliefPayGroupData(this.reliefId));
      }
    });
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingRelief));
    this.paygroupData$ = this.store.pipe(select(getReliefPayGroupData));
    this.showAddPayGroupEditor$ = this.store.pipe(select(showEditorPayGroupRelief));
    this.useRuleData$ = this.store.pipe(select(getuseRuleData));
    this.reliefCurrencyData$ = this.store.pipe(select(getReliefCurrencyData));
    this.reliefPayGroupListData$ = this.store.pipe(select(getReliefPayGroupDataList));
    this.payGroupDataByid$ = this.store.pipe(select(getByIdPaygroupData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadUseRuleData());
    this.store.dispatch(new LoadReliefCurrencyData());
    this.store.dispatch(new LoadReliefPayGroupListData());

  }
  onCancelViewer() {
    this.store.dispatch(new HidePayGroupEditorRelief());
  }
  onViewPayGroupReliefClicked(val, paygroupId) {
    this.paygroupId = paygroupId;
    this.reliefdetId = val;
    this.store.dispatch(new GetPayGroupData(val));
    this.subscribe = this.payGroupDataByid$.subscribe(value => {
      if (value) {
        this.paygroup.data = value;
        this.paygroup.setDefaultFields(value);
        this.store.dispatch(new LoadUseRuleData());
        this.store.dispatch(new ShowPayGroupEditorRelief());
      }
    })
  }

  goBack() {
    this.router.navigate([`${STANDARD_ROUTES.reliefProfiles}/${this.profileId}`])
    // this.router.navigate([`${STANDARD_ROUTES.backreliefProfiles}`])
  }
  onRefresh() {
    this.store.dispatch(new LoadReliefPayGroupData(this.reliefId));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onAdd() {
    this.store.dispatch(new LoadUseRuleData());
    this.store.dispatch(new ShowPayGroupEditorRelief());
  }

  onDeleteIconClicked(row_id:number){
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeletePaygroupRelief({reliefdet_id: row_id}));
          this.store.dispatch(new LoadReliefPayGroupData(this.reliefId));
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
