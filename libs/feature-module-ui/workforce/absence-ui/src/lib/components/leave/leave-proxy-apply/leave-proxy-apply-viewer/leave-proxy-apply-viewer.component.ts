import { Component, OnInit, Input } from '@angular/core';
 
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';
import { HideViewerLeaveProxyApply } from '../../../../store/leave-proxy-apply';
import { UtilService } from '@nutela/core-services';


@Component({
  selector: 'x365-fm-workforce-absence-leave-proxy-apply-viewer',
  templateUrl: './leave-proxy-apply-viewer.component.html',
  styleUrls: ['./leave-proxy-apply-viewer.component.scss']
})
export class LeaveProxyApplyViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ILeaveDailyData;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerLeaveProxyApply());
  }
  
}
