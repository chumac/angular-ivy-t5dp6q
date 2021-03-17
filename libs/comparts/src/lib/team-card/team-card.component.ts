import { Component, OnInit, OnDestroy, Input, ComponentRef } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ISubscriptions } from '@nutela/models/common';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { LoadingDataMyTeam, LoadDataMyTeam, LoadTeamMemberProfilePicture, isLoadingMyTeam, getDataTeam } from '../../../../feature-module-ui/workforce/employee-profiles-ui/src/lib/store/my-team';

@Component({
  selector: 'x365-comparts-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  team: IPersonal[];
  filteredTeam: IPersonal[];

  private subscriptions: ISubscriptions = {};

  constructor(
    private utilService: UtilService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
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

  filter(term: string) {
    if (term === "") {
      this.filteredTeam = this.team;
    } else if (term) {
      this.filteredTeam = this.team.filter(x => x.employee_firstname.toLowerCase().includes(term));
    }
  }

  onSelectedEmployeeId(event) {
    this.store.dispatch(new LoadTeamMemberProfilePicture(event));
  }

  search() { }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
