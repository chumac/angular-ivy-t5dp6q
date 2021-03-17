
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerProfilePicture, getProfilePictureAwaitingApproval } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { GENERAL } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-profile-picture-viewer',
  templateUrl: './hr-reboard-profile-picture-viewer.component.html',
  styleUrls: ['./hr-reboard-profile-picture-viewer.component.scss']
})
export class HrReboardProfilePictureViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Output() cancelClick = new EventEmitter<any>();
  awaitingApprovalProfilePicture$: Observable<any>;
  imageBaseHeader: string;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.imageBaseHeader =  `${GENERAL.pngBase64Header}`;
    this.awaitingApprovalProfilePicture$ = this.store.pipe(select(getProfilePictureAwaitingApproval));
  }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
