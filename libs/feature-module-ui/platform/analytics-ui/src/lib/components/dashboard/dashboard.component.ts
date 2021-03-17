
import { Component, OnInit, Inject } from '@angular/core';
import { slideUpAnimation } from '@nutela/shared/animations';
import { Title } from '@angular/platform-browser';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IToDo, IAnniversary, IAnnouncement } from '@nutela/models/core-data';
import { getToDos, getBirthDays, getWeddingAnniversaries, getWorkAnniversaries, getAnnouncements } from '@nutela/store/modules/workforce/employee-profiles';
import { SwitchViewTypeToDoCard, getViewTypeToDoCard } from '../../store/to-do-card';
import { SwitchViewTypeTeamLeaveCard, LoadDataLeaveTimeline, getViewTypeTeamLeaveCard, getLeaveTimeline } from '../../store/team-leave-card';
import { ILeaveTimeline } from '@nutela/models/workforce/leave';

@Component({
  selector: 'x365-fm-plf-analytics-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [slideUpAnimation],
  host: {
    '[@slideUpAnimation]': ''
  }
})
export class DashboardComponent implements OnInit {
  viewTypeToDoCard$: Observable<string>;
  viewTypeTeamLeaveCard$: Observable<string>;

  toDos$: Observable<IToDo[]>;
  birthDays$: Observable<IAnniversary[]>;
  weddingAnniversaries$: Observable<IAnniversary[]>;
  workAnniversaries$: Observable<IAnniversary[]>;
  announcements$: Observable<IAnnouncement[]>;


  leaveTimeline$: Observable<ILeaveTimeline[]>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private store: Store<IAppState>
  ) {
    titleService.setTitle(
      `${'Dashboard'}${this.partialDocumentTitle}`
    );

  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataLeaveTimeline());
  }

  storeSelects() {
    this.viewTypeToDoCard$ = this.store.pipe(select(getViewTypeToDoCard));
    this.viewTypeTeamLeaveCard$ = this.store.pipe(select(getViewTypeTeamLeaveCard));

    this.toDos$ = this.store.pipe(select(getToDos));
    this.birthDays$ = this.store.pipe(select(getBirthDays));
    this.weddingAnniversaries$ = this.store.pipe(select(getWeddingAnniversaries));
    this.workAnniversaries$ = this.store.pipe(select(getWorkAnniversaries));
    this.announcements$ = this.store.pipe(select(getAnnouncements));

    this.leaveTimeline$ = this.store.pipe(select(getLeaveTimeline));
  }

  onviewTypeSwitchToDoCard(event) {
    this.store.dispatch(new SwitchViewTypeToDoCard(event));
  }

  onviewTypeSwitchTeamLeaveCard(event) {
    this.store.dispatch(new SwitchViewTypeTeamLeaveCard(event));
  }
}
