import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import {
  IProfilePicture
} from '@nutela/models/workforce/employee-profiles';
import { take } from 'rxjs/operators';
import { showEditorReboardProfilePicture, showViewerReboardProfilePicture, getReboardProfilePicture, ShowEditorReboardProfilePicture, getReboardEmployeeId, LoadReboardProfilePicture, HideEditorReboardProfilePicture, HideViewerReboardProfilePicture } from '../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-profile-picture',
  templateUrl: './reboard-profile-picture.component.html',
  styleUrls: ['./reboard-profile-picture.component.scss']
})
export class ReboardProfilePictureComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  photo$: Observable<IProfilePicture>;


  @Input() data: any = null;
  @Input() reboardMode: number;
  @Input() employeeId: number;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardProfilePicture));
    this.showViewer$ = this.store.pipe(select(showViewerReboardProfilePicture));
    this.photo$ = this.store.pipe(select(getReboardProfilePicture));
  }
  storeDispatches() {
    this.store.dispatch(new LoadReboardProfilePicture());
  }

  canEdit(): boolean {
    let status: boolean;
    if (this.reboardMode === 1 || this.reboardMode === 2) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

  showEditor() {
    this.store.dispatch(new ShowEditorReboardProfilePicture());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReboardProfilePicture());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardProfilePicture());
  }
}
