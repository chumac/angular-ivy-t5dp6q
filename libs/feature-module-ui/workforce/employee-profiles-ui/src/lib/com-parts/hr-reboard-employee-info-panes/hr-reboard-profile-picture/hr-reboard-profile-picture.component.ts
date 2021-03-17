import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import {
  IProfilePicture
} from '@nutela/models/workforce/employee-profiles';
import { toastOptionsInformation } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { isUndefined } from 'util';
import { take } from 'rxjs/operators';
import { showEditorHrReboardProfilePicture, showViewerHrReboardProfilePicture, getHrReboardProfilePicture, ShowEditorHrReboardProfilePicture, getHrReboardComprehensiveData, LoadHrReboardProfilePicture, HideEditorHrReboardProfilePicture, HideViewerHrReboardProfilePicture } from '../../../store/hr-reboard-data';
import { getComprehensiveData } from '../../../store/employee-detailed-area';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-profile-picture',
  templateUrl: './hr-reboard-profile-picture.component.html',
  styleUrls: ['./hr-reboard-profile-picture.component.scss']
})
export class HrReboardProfilePictureComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  photo$: Observable<IProfilePicture>;
  awaitingApprovalPhoto$: Observable<IProfilePicture>;


  @Input() data: any = null;
  @Input() reboardMode: number;
  @Input() employeeId: number;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }
  storeDispatches() {
    // this.store.dispatch(new LoadDataReboardProfilePicture());
    this.loadProfilePicture();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardProfilePicture));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardProfilePicture));
    this.photo$ = this.store.pipe(select(getHrReboardProfilePicture));
    // this.awaitingApprovalPhoto$ = this.store.pipe(select(getProfilePictureAwaitingApproval));
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
    this.awaitingApprovalPhoto$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorHrReboardProfilePicture());
      } else {
        this.store.dispatch(
          new ShowToast({
            title: null,
            message:
              'You have data awaiting approval. You must discard pending data before you can update your data again.',
            options: toastOptionsInformation()
          })
        );
      }
    });
  }

  loadProfilePicture() {
    this.store.dispatch(new LoadHrReboardProfilePicture(this.employeeId));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardProfilePicture());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardProfilePicture());
  }
}
