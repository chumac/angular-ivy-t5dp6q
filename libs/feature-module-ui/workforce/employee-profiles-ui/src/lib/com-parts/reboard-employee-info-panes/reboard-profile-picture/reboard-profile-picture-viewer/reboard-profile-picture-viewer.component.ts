
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { GENERAL } from '@nutela/shared/app-global';
import { getReboardProfilePicture } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-profile-picture-viewer',
  templateUrl: './reboard-profile-picture-viewer.component.html',
  styleUrls: ['./reboard-profile-picture-viewer.component.scss']
})
export class ReboardProfilePictureViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Output() cancelClick = new EventEmitter<any>();
  profilePicture$: Observable<any>;
  imageBaseHeader: string;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.imageBaseHeader =  `${GENERAL.pngBase64Header}`;
    this.profilePicture$ = this.store.pipe(select(getReboardProfilePicture));
  }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
