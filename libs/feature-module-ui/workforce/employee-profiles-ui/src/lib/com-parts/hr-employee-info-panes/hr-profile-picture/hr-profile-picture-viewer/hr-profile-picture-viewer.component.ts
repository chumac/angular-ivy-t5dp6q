import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { getEmployeePhotoAwaitingApproval, HideViewerEmployeePhoto } from '../../../../store/employee-detailed-area';
import { GENERAL } from '@nutela/shared/app-global';


@Component({
  selector: 'x365-fm-workforce-hr-profile-picture-viewer',
  templateUrl: './hr-profile-picture-viewer.component.html',
  styleUrls: ['./hr-profile-picture-viewer.component.scss']
})
export class HrProfilePictureViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  awaitingApprovalEmployeePhoto$: Observable<any>;
  imageBaseHeader: string;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.imageBaseHeader =  `${GENERAL.pngBase64Header}`;
    this.awaitingApprovalEmployeePhoto$ = this.store.pipe(select(getEmployeePhotoAwaitingApproval));
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerEmployeePhoto());
  }
}
