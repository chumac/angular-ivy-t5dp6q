
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IProfile } from '@nutela/models/compensation/payroll';
import { IRootState } from '../../../../../store/root';

@Component({
  selector: 'x365-fm-payrl-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss']
})
export class ProfileViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfile;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<IRootState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
