import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExternalNotificationService } from './external-notification.service';
import { Observable, interval } from 'rxjs';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { LoadQueueId } from '@nutela/store/modules/workforce/employee-profiles';
import { getApprovalQueueNotification, LoadQueueNotification, LoadExitInitiationProcessStatus } from 'libs/store/shared/src/lib/notification';
import { IApprovalNotification } from '@nutela/models/common';

const SELF_SERVICE_APPROVALS = '/d/approvals';

@Component({
  selector: 'x365-shared-ui-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [ExternalNotificationService]
})
export class NotificationComponent implements OnInit, AfterViewInit {
  counter: number;

  queueList$: Observable<IApprovalNotification[]>;
  queues = []

  constructor(private router: Router,
              public service : ExternalNotificationService,
              private utilService: UtilService,
              private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  ngAfterViewInit(): void {
    this.startInterval();
  }

  storeSelects() {
    this.queueList$ = this.store.pipe(select(getApprovalQueueNotification));
  }

  storeDispatches() {
    this.store.dispatch(new LoadQueueNotification());
  }

  notificationAction(Id) {
    this.store.dispatch(new LoadQueueId(Id));
    this.router.navigate([`${SELF_SERVICE_APPROVALS}`]);
  }

  startInterval() { // refreshes notification button every 60000 milliseconds
    interval(60000).subscribe(x => {
      this.store.dispatch(new LoadQueueNotification());
      this.store.dispatch(new LoadExitInitiationProcessStatus());
    });
  }

  get notificationMessage(): string {
    if (this.counter === 0) {
      return 'No workflow messages';
    } else if (this.counter === 1) {
      return '1 workflow message';
    } else {
      return `${this.counter} workflow messages`;
    }
  }
}
