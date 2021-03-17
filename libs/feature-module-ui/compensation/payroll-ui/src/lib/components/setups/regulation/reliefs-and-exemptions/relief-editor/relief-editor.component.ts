import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IStaturoryRelief, ITaxRuleRelief, IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { BaseFormComponent, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { IgxGridComponent } from 'igniteui-angular';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';
import { Observable } from 'rxjs';
import { DeleteRelief, getFixedDeductionData, getReliefCurrencyData, getReliefTypesData, getStatutoryeliefsData, getuseRuleData, HideEditorRelief, IReliefState, isProcessingRelief, LoadFixedDeductionData, LoadGetReliefProfileData, LoadReliefCurrencyData, LoadReliefData, LoadReliefProfileData, LoadReliefTypeData, LoadStatutoeyReliefData, LoadUseRuleData, selectedReliefProfileData, ShowAddEditorRelief, ShowConfigEditorRelief, showEditorAddRelief, showEditorConfigRelief, ShowEditorRelief, showFixedDeductionRelief, ShowFixedDeductionRelief, showViewEditorRelief, ShowViewEditorRelief } from '../../../../../store/setup/regulation/reliefs-and-exemptions';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ReliefEditorService } from './relief-editor.service';
import { ConfigureReliefComponent } from './configure-relief/configure-relief.component';
import { AddReliefComponent } from './add-relief/add-relief.component';
import { ViewReliefComponent } from './view-relief/view-relief.component';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { FixedDeductionComponent } from './fixed-deduction/fixed-deduction.component';
import { IFixedDeductionRelief } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction.interface';

@Component({
  selector: 'x365-fm-payrl-relief-editor',
  templateUrl: './relief-editor.component.html',
  styleUrls: ['./relief-editor.component.scss']
})
export class ReliefEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isAdd$: boolean;

  showAddEditor$: Observable<boolean>;
  showReliefViewProfile$: Observable<boolean>;
  showViewEditor$: Observable<boolean>;
  showConfigEditor$: Observable<boolean>;
  selectedReliefProfileData$: Observable<IReliefProfile[]>;
  statutoryData$: Observable<IStaturoryRelief[]>;
  reliefTypeData$: Observable<ITaxRuleRelief[]>;
  useRuleData$: Observable<IUseRuleRelief[]>;
  reliefCurrencyData$: Observable<IReliefCurrency[]>;
  getReliefProfileData$: Observable<IReliefProfile>;
  subscribe: any;
  showFixedDeduction$: Observable<boolean>;
  fixedDeductionData$: Observable<IFixedDeductionRelief[]>;

  @ViewChild("profileDataGrid") profileDataGrid: IgxGridComponent;
  @ViewChild("addReliefEditor") addReliefEditor: AddReliefComponent;
  @ViewChild("config") config: ConfigureReliefComponent;
  @ViewChild("fixedDeduction") fixedDeduction: FixedDeductionComponent;

  @ViewChild("viewReliefEditor") viewReliefEditor: ViewReliefComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;


  profileData$: any;
  relief_id$: any;
  public selectedReliefe: Observable<IReliefProfile[]>;
  profileId: any;


  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;
  @Input() public data: any;
  @Input() public payroll_profile_id: any;

  constructor(
    private store: Store<IReliefState>, public utilService: UtilService, private router: Router, private route: ActivatedRoute,
    public service: ReliefEditorService,
    private dialogBoxService: DialogBoxService,
  ) {
    super();
    this.assignProfileId();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {

    }

    if (this.show === false) {
    }
  }
  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      if (v.profileId != null) {
        this.profileId = parseInt(v.profileId);
        this.payroll_profile_id = parseInt(v.profileId);
        this.store.dispatch(new LoadReliefProfileData({ payroll_profileID: v.profileId }));
        this.store.dispatch(new ShowEditorRelief());
      }
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRelief));
    this.showAddEditor$ = this.store.pipe(select(showEditorAddRelief));
    this.showViewEditor$ = this.store.pipe(select(showViewEditorRelief));
    this.showConfigEditor$ = this.store.pipe(select(showEditorConfigRelief));
    this.statutoryData$ = this.store.pipe(select(getStatutoryeliefsData));
    this.reliefTypeData$ = this.store.pipe(select(getReliefTypesData));
    this.useRuleData$ = this.store.pipe(select(getuseRuleData));
    this.reliefCurrencyData$ = this.store.pipe(select(getReliefCurrencyData));
    this.selectedReliefe = this.store.pipe(select(selectedReliefProfileData));
    this.showFixedDeduction$ = this.store.pipe(select(showFixedDeductionRelief));
    this.fixedDeductionData$ = this.store.pipe(select(getFixedDeductionData));
  }

  storeDispatches() {

  }


  onAddReliefClicked() {
    this.isAdd$ =  true;
    this.store.dispatch(new ShowAddEditorRelief());
    this.store.dispatch(new LoadStatutoeyReliefData());
    this.store.dispatch(new LoadReliefTypeData());
    this.store.dispatch(new LoadReliefCurrencyData());
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }


  goBack() {
    this.router.navigate([STANDARD_ROUTES.backreliefProfiles]);
    // this.store.dispatch(new HideEditorRelief());
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
    if (this.profileDataGrid) {
      this.service.search(
        this.profileDataGrid,
        searchString,
        filterBy
      );
    }
  }

  ngOnDestroy() {
  }


  onCancelViewer() {
    this.store.dispatch(new HideEditorRelief());
  }

  onViewProfileIconClicked(rowId: number) {
    this.viewReliefEditor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewReliefEditor.data = result;
        // this.store.dispatch(new LoadStatutoeyReliefData());
        // this.store.dispatch(new LoadReliefTypeData());
        // this.store.dispatch(new LoadReliefCurrencyData());
        this.store.dispatch(new ShowViewEditorRelief());
      }
      );
  }
  // getProfileData$(rowId: number): Observable<IReliefProfile> {
  //   return this.selectedReliefe.pipe(
  //     map(d => d.filter(v => v.relief_id === rowId)),
  //     map(e => e.shift()))
  // }

  // onViewConfigIconClicked(val,reliefType){
  //   this.relief_id$ = val;
  //   if(reliefType == 0){
  //     this.getRowData$(val).pipe(take(1))
  //     .subscribe((result) => {
  //       this.config.setDefaultFields(result);
  //     }
  //   );
  //   }
  // }

  onViewConfigIconClicked(val, reliefType) {
    if (reliefType == 0) {
      this.relief_id$ = val;
      this.subscribe = this.selectedReliefe.subscribe(value => {
        if (value) {
          console.log('value', value)
          this.getRowData$(val).pipe(take(1))
            .subscribe(result => {
              console.log('result', result);
              this.config.setDefaultFields(result);
            })
        }
      })
      this.store.dispatch(new LoadUseRuleData());
      this.store.dispatch(new LoadReliefCurrencyData());
      this.store.dispatch(new ShowConfigEditorRelief());
    }
    if(reliefType == 1){
      this.router.navigate([`${STANDARD_ROUTES.reliefGrades}/${val}/${this.profileId}`])
    }
    if(reliefType == 2){
      this.router.navigate([`${STANDARD_ROUTES.reliefPaygroup}/${val}/${this.profileId}`])
    }
    if(reliefType == 3){
      this.router.navigate([`${STANDARD_ROUTES.reliefEmployee}/${val}/${this.profileId}`])
    }
    if (reliefType == 4) {
      this.relief_id$ = val;
      this.subscribe = this.selectedReliefe.subscribe(value => {
        if (value) {
          this.getRowData$(val).pipe(take(1))
            .subscribe(result => {
              console.log(result);
              this.fixedDeduction.setDefaultFields(result);
            })
        }
      })
      this.store.dispatch(new LoadFixedDeductionData(this.profileId));
      this.store.dispatch(new LoadReliefCurrencyData());
      this.store.dispatch(new ShowFixedDeductionRelief());
    }
  }

  onViewEditIconClicked(rowId: number) {
    this.isAdd$ =  false;
    this.addReliefEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.addReliefEditor.data = result;
        this.addReliefEditor.reset();
        this.store.dispatch(new LoadStatutoeyReliefData());
        this.store.dispatch(new LoadReliefTypeData());
        this.store.dispatch(new LoadReliefCurrencyData());
        this.store.dispatch(new ShowAddEditorRelief());
      }
      );
  }

  onDeleteClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.getRowData$(rowId).pipe(take(1))
            .subscribe(result => {
              this.store.dispatch(new DeleteRelief({ relief_id: rowId, payroll_profile_id: result.payroll_profile_id }));
            })
        }
      });
  }

  getRowData$(rowId: number): Observable<IReliefProfile> {
    return this.selectedReliefe.pipe(
      map(d => d.filter(v => v.relief_id === rowId)),
      map(e => e.shift()))
  }
}
