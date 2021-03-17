import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import {
  LoadApprovedDataContact,
  LoadAwaitingApprovalDataContact,
  LoadProfilePicture,
  HideEditorProfilePicture,
  HideViewerProfilePicture,
  ShowEditorProfilePicture,
  showEditorProfilePicture,
  getProfilePicture,
  showViewerProfilePicture,
  getProfilePictureAwaitingApproval,
  LoadAwaitingApprovalProfilePicture,
  getComprehensiveData
} from '@nutela/store/modules/workforce/employee-profiles';
import {
  IComprehensiveData,
  IProfilePicture
} from '@nutela/models/workforce/employee-profiles';
import { toastOptionsInformation } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { isUndefined } from 'util';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  approvedPhoto$: Observable<IProfilePicture>;
  awaitingApprovalPhoto$: Observable<IProfilePicture>;
  comprehensiveData$: Observable<IComprehensiveData>;
  private subscriptions: ISubscriptions = {};


  @Input() data: any = null;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }
  storeDispatches() {
    this.store.dispatch(new LoadAwaitingApprovalProfilePicture());
    this.loadProfilePicture();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorProfilePicture));
    this.showViewer$ = this.store.pipe(select(showViewerProfilePicture));

    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.approvedPhoto$ = this.store.pipe(select(getProfilePicture));
    this.awaitingApprovalPhoto$ = this.store.pipe(select(getProfilePictureAwaitingApproval));
  }

  showEditor() {
    this.awaitingApprovalPhoto$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorProfilePicture());
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
    this.store.pipe(select(getComprehensiveData)).pipe(take(1))
    .subscribe((result) => {
        if (result) {
            this.store.dispatch(new LoadProfilePicture(result.employee_id));
        }
      }
    );
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorProfilePicture());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerProfilePicture());
  }
}
