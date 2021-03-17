import { Component, OnInit, Input } from '@angular/core';
import { ILeaveDefinition } from '@nutela/models/workforce/leave';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IAbsenceState } from '../../../../store';
import { HideViewerLeaveDefinition } from '../../../../store/setups';

@Component({
  selector: 'x365-fm-workforce-absence-leave-definition-viewer',
  templateUrl: './leave-definition-viewer.component.html',
  styleUrls: ['./leave-definition-viewer.component.scss']
})
export class LeaveDefinitionViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILeaveDefinition;

  constructor(public utilService: UtilService, private store: Store<IAbsenceState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerLeaveDefinition());
  }
}
