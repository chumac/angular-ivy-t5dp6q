import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getNumberOfHRResponses, LoadHRExitResponseQueueNotification } from 'libs/store/shared/src/lib/notification';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-shared-nav-exit-navigation',
  templateUrl: './exit-navigation.component.html',
  styleUrls: ['./exit-navigation.component.scss']
})
export class ExitNavigationComponent implements OnInit, AfterViewInit {

  hrResponseQueueNotifications$: Observable<number>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  ngAfterViewInit() {
    this.startInterval();
  }

  storeSelects() {
    this.hrResponseQueueNotifications$ = this.store.pipe(select(getNumberOfHRResponses));
  }

  storeDispatches() {
    this.store.dispatch(new LoadHRExitResponseQueueNotification());
  }

  startInterval() { // refreshes notification button every 60000 milliseconds
    interval(60000).pipe(take(1)).subscribe(x => {
      this.store.dispatch(new LoadHRExitResponseQueueNotification());
    });
  }
}
