import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ISubscription } from '@nutela/models/workforce/subscription';
import { IAppState } from '@nutela/store/app-state';
import {
  HideViewerSubscription
} from '../../../store/subscription';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'x365-fm-workforce-subscriptions-viewer',
  templateUrl: './subscriptions-viewer.component.html',
  styleUrls: ['./subscriptions-viewer.component.scss']
})
export class SubscriptionsViewerComponent implements OnInit {
  approvalPhoto$: Observable<any>;
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ISubscription;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerSubscription());
  }
}
