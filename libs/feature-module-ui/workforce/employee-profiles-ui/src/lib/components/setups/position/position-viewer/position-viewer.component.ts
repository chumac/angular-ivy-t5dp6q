import { Component, OnInit, Input } from '@angular/core';
import { IPositionSetup } from '@nutela/models/workforce/employee-profiles';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store/root';
import { HideViewerPositionSetup } from '../../../../store/setups/position';

@Component({
  selector: 'x365-fm-workforce-position-viewer',
  templateUrl: './position-viewer.component.html',
  styleUrls: ['./position-viewer.component.scss']
})
export class PositionViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPositionSetup;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerPositionSetup());
  }
}
