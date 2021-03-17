
import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerProfilePicture, getProfilePictureAwaitingApproval } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { GENERAL } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-profile-picture-viewer',
  templateUrl: './profile-picture-viewer.component.html',
  styleUrls: ['./profile-picture-viewer.component.scss'] 
})
export class ProfilePictureViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  awaitingApprovalProfilePicture$: Observable<any>;
  imageBaseHeader: string;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.imageBaseHeader =  `${GENERAL.pngBase64Header}`;
    this.awaitingApprovalProfilePicture$ = this.store.pipe(select(getProfilePictureAwaitingApproval));
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerProfilePicture());
  }
}
