import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { enableHourlyLeave, performanceAllowEmpObjectiveUpload, performanceAllowLmObjectiveUpload } from '@nutela/store/modules/foundation';
import { getMyReboardMode } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { interval } from 'rxjs/internal/observable/interval';
import { take } from 'rxjs/operators';
import { getExitInitiationStatus, getNumberOfResponses, LoadExitInitiationProcessStatus, LoadExitResponseQueueNotification } from 'libs/store/shared/src/lib/notification';

@Component({
  selector: 'x365-shared-nav-self-service-navigation',
  templateUrl: './self-service-navigation.component.html',
  styleUrls: ['./self-service-navigation.component.scss']
})
export class SelfServiceNavigationComponent implements OnInit, AfterViewInit {

  enableHourlyLeave$: Observable<any>;
  reboardMode$: Observable<number>;
  isExitProcessInitiated$: Observable<boolean>;
  responseQueueNotifications$: Observable<number>;
  //Sys Options
  performanceAllowLmObjectiveUpload$: Observable<string>;
  performanceAllowEmpObjectiveUpload$: Observable<string>;


  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  ngAfterViewInit() {
    this.startInterval();
  }

  storeSelects() {
    this.enableHourlyLeave$ = this.store.pipe(select(enableHourlyLeave));
    this.reboardMode$ = this.store.pipe(select(getMyReboardMode));
    this.isExitProcessInitiated$ = this.store.pipe(select(getExitInitiationStatus));
    this.responseQueueNotifications$ = this.store.pipe(select(getNumberOfResponses));
    // Sys Option
    this.performanceAllowLmObjectiveUpload$ = this.store.pipe(select(performanceAllowLmObjectiveUpload));  
    this.performanceAllowEmpObjectiveUpload$ = this.store.pipe(select(performanceAllowEmpObjectiveUpload));    
  
  }
  storeDispatches() {
    this.store.dispatch(new LoadExitInitiationProcessStatus());
    this.store.dispatch(new LoadExitResponseQueueNotification());
  }

  startInterval() { // refreshes notification button every 60000 milliseconds
    interval(60000).pipe(take(1)).subscribe(x => {
      this.store.dispatch(new LoadExitInitiationProcessStatus());
      this.store.dispatch(new LoadExitResponseQueueNotification());
    });
  }

  goToHelp() {
    window.open("https://support.xceed365.com", "_blank");
  }
}
