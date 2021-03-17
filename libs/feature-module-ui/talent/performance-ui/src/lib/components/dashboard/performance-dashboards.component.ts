import { Component, OnInit, ViewChild } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { IPerfDashboardMasters, IPerfDashboardObjectives, IPlan } from '@nutela/models/talent/performance';
import { IComprehensiveData, IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { DxLookupComponent } from 'devextreme-angular';
import { getTeamMembersTeamDeployment, LoadTeamMembersTeamDeployment } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/team-deployments';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { getPerformanceDashboardCurrentPlan, getPerformanceDashboardMasters, getPerformanceDashboardObjectives, getPerformanceDashboardTeamMasters, getPerformanceDashboardTeamObjectives, LoadCurrentPlanPerformanceDashboard, LoadMastersPerformanceDashboard, LoadObjectivesPerformanceDashboard, LoadTeamMastersPerformanceDashboard, LoadTeamObjectivesPerformanceDashboard, PerformanceDashboardActionTypes } from '../../store/dashboard';
import { getEmployeeListLmManageObjectives, LoadEmployeelistLmManageObjectives } from '../../store/planning/lm-manage-objectives';
import { IPerformanceState } from '../../store/root';

@Component({
  selector: 'x365-fm-talent-performance-dashboards',
  templateUrl: './performance-dashboards.component.html',
  styleUrls: ['./performance-dashboards.component.scss'],
})

export class PerformanceDashboardsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoadingMasters: boolean;
  isLoadingObjectives: boolean;
  isLoadingTeamMasters: boolean;
  isLoadingTeamObjectives: boolean;

  masters$: Observable<IPerfDashboardMasters>;
  objectives$: Observable<IPerfDashboardObjectives[]>;
  standardObjectives$: Observable<IPerfDashboardObjectives[]>;
  preScoredObjectives$:  Observable<IPerfDashboardObjectives[]>;

  teamMasters$: Observable<IPerfDashboardMasters>;
  teamObjectives$: Observable<IPerfDashboardObjectives[]>;
  teamStandardObjectives$: Observable<IPerfDashboardObjectives[]>;
  teamPreScoredObjectives$:  Observable<IPerfDashboardObjectives[]>;

  employeelist$: Observable<IPersonal[]>;
  comprehensiveData$: Observable<IComprehensiveData>;

  currentPlanData$: Observable<IPlan>;
	toggleObjectives: boolean = false;
  planId: number;
  @ViewChild('employeesLookup') employeesLookup: DxLookupComponent;

  constructor(private store: Store<IPerformanceState>, private actions$: Actions) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.splitObjectives();
    this.setLoaders();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCurrentPlanPerformanceDashboard());
    this.store.dispatch(new LoadEmployeelistLmManageObjectives({ planId: null, employeeId: null}));
  }

  storeSelects() {
    this.isLoadingMasters = true;
    this.isLoadingObjectives = true;
    this.currentPlanData$ = this.store.pipe(select(getPerformanceDashboardCurrentPlan));
    this.masters$ = this.store.pipe(select(getPerformanceDashboardMasters));
    this.objectives$ = this.store.pipe(select(getPerformanceDashboardObjectives));

    this.teamMasters$ = this.store.pipe(select(getPerformanceDashboardTeamMasters));
    this.teamObjectives$ = this.store.pipe(select(getPerformanceDashboardTeamObjectives));

    this.employeelist$ = this.store.pipe(select(getEmployeeListLmManageObjectives));
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
  

    this.currentPlanData$.pipe().subscribe((res: IPlan)=>{
      if(res){
        this.planId = res.id;
        this.store.dispatch(new LoadMastersPerformanceDashboard({planId: res.id}));
        this.store.dispatch(new LoadObjectivesPerformanceDashboard({planId: res.id}));

        // this.store.dispatch(new LoadTeamMastersPerformanceDashboard({planId: res.id}));
        // this.store.dispatch(new LoadTeamObjectivesPerformanceDashboard({planId: res.id}));
      }
    });
  }

  splitObjectives() {
    this.standardObjectives$ = this.objectives$.pipe(map(d => d.filter(v => v.source === 0)));
    this.preScoredObjectives$ = this.objectives$.pipe(map(d => d.filter(v => v.source === 1)));

    this.teamStandardObjectives$ = this.teamObjectives$.pipe(map(d => d.filter(v => v.source === 0)));
    this.teamPreScoredObjectives$ = this.teamObjectives$.pipe(map(d => d.filter(v => v.source === 1)));
  }

  setLoaders() {
    this.actions$.ofType(PerformanceDashboardActionTypes.LOAD_DASH_MASTERS_SUCCESS)
       .subscribe(() => this.isLoadingMasters = false);
    this.actions$.ofType(PerformanceDashboardActionTypes.LOAD_DASH_OBJECTIVES_SUCCESS)
    .subscribe(() => this.isLoadingObjectives = false);

    this.actions$.ofType(PerformanceDashboardActionTypes.LOAD_DASH_TEAM_MASTERS_SUCCESS)
    .subscribe(() => this.isLoadingTeamMasters = false);
    this.actions$.ofType(PerformanceDashboardActionTypes.LOAD_DASH_TEAM_OBJECTIVES_SUCCESS)
    .subscribe(() => this.isLoadingTeamObjectives = false);
  }

  onEmployeeSelected() {
    this.isLoadingTeamMasters = true;
    this.isLoadingTeamObjectives = true;
    let eId = this.employeesLookup.value;
    if(eId) {
      this.store.dispatch(new LoadTeamMastersPerformanceDashboard({planId: this.planId, employeeId: eId}));
      this.store.dispatch(new LoadTeamObjectivesPerformanceDashboard({planId: this.planId, employeeId: eId}));  
    }
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
