import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerReboardDependant, ClearViewerPhotoReboardDependant } from '../../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-dependants-viewer',
  templateUrl: './reboard-dependants-viewer.component.html',
  styleUrls: ['./reboard-dependants-viewer.component.scss']
})
export class ReboardDependantsViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IDependant;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerReboardDependant());
    this.store.dispatch(new ClearViewerPhotoReboardDependant());
  }
}
