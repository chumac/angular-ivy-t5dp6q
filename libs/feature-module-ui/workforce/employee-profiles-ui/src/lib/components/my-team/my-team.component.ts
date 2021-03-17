import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ISubscriptions } from '@nutela/models/common';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { LoadingDataMyTeam, LoadDataMyTeam, isLoadingMyTeam, LoadDataEmployeeTeam, getDataTeam } from '../../store/my-team';
import { MyTeamService } from './my-team.service';
import { IApiResult } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-workforce-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
  providers: [MyTeamService]
})
export class MyTeamComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  team: IPersonal[];
  filteredTeam: IPersonal[];
  teamLead: IPersonal;
  images$: IApiResult[];
  dropDownFilterValue: string;

  private subscriptions: ISubscriptions = {};

  constructor(
    private utilService: UtilService,
    private store: Store<IAppState>,
    public myTeamService: MyTeamService
  ) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.getTeamLead();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDataMyTeam());
    this.store.dispatch(new LoadDataMyTeam());
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingMyTeam));
    this.store.pipe(select(getDataTeam))
      .subscribe((data) => {
        this.team = data;

        this.filteredTeam = this.team;
      });
  }

  getTeamLead() {
    this.teamLead = this.filteredTeam[0];
  }

  filter(term: string, filterValue: string) {
    if (term === "") {
      this.filteredTeam = this.team;
    } else if (term) {
      if (filterValue === "employee_firstname" || filterValue === undefined) {
        this.filteredTeam = this.team.filter(x => x.employee_firstname.toLowerCase().includes(term));
      } else if (filterValue === "employee_surname") {
        this.filteredTeam = this.team.filter(x => x.employee_surname.toLowerCase().includes(term));
      } else if (filterValue === "position") {
        this.filteredTeam = this.team.filter(x => x.position.toLowerCase().includes(term));
      }
    }
  }

  onOpenTeamMembers(event) {
    this.store.dispatch(new LoadingDataMyTeam())
    this.store.dispatch(new LoadDataEmployeeTeam(event));
  }

  onResetToMyTeamClicked() {
    this.storeDispatches();
  }

  onFilterListSelected(event) {
    this.dropDownFilterValue = event.value;
  }

  onRefresh() {
    // To do
    this.storeDispatches();
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
