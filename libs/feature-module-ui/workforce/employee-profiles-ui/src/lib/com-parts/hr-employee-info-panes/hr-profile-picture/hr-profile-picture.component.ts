
import { Component, OnInit, Input, Inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData } from '@nutela/models/common';
import {
  LoadApprovedDataContact,
  LoadAwaitingApprovalDataContact,
  LoadEmployeePhoto,
  // LoadAwaitingApprovalEmployeePhoto,
  // getComprehensiveData
} from '@nutela/store/modules/workforce/employee-profiles';
import {
  IComprehensiveData,
  IProfilePicture
} from '@nutela/models/workforce/employee-profiles';
import { toastOptionsInformation } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { isUndefined } from 'util';
import { IEmployeesProfileState } from '../../../store';
import { getEmployeePhoto, showViewerEmployeePhoto, showEditorEmployeePhoto, getEmployeePhotoAwaitingApproval, ShowEditorEmployeePhoto, HideEditorEmployeePhoto, HideViewerEmployeePhoto, LoadAwaitingApprovalEmployeePhoto, getComprehensiveData, getEmployeeFilePhoto, LoadEmployeeFilePhoto } from '../../../store/employee-detailed-area';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-hr-profile-picture',
  templateUrl: './hr-profile-picture.component.html',
  styleUrls: ['./hr-profile-picture.component.scss']
})
export class HrProfilePictureComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  approvedPhoto$: Observable<IProfilePicture>;
  approvedFilePhoto$: Observable<IProfilePicture>;
  awaitingApprovalPhoto$: Observable<IProfilePicture>;
  comprehensiveData$: Observable<IComprehensiveData>;
  filePhoto: string = null;
  profilePhoto: string = null;

  @Input() data: any = null;
  @Input() employeeId: number;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Profile Picture'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadAwaitingApprovalEmployeePhoto({employeeId: this.employeeId}));
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.showEditor$ = this.store.pipe(select(showEditorEmployeePhoto));
    this.showViewer$ = this.store.pipe(select(showViewerEmployeePhoto));
    this.approvedPhoto$ = this.store.pipe(select(getEmployeePhoto));
    this.approvedFilePhoto$ = this.store.pipe(select(getEmployeeFilePhoto));
    this.awaitingApprovalPhoto$ = this.store.pipe(select(getEmployeePhotoAwaitingApproval));
  }

  showEditor() {
    // this.store.dispatch(new ShowEditorEmployeePhoto());
    this.awaitingApprovalPhoto$.pipe(take(1)).subscribe((data: IProfilePicture) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorEmployeePhoto());
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

  onCancelEditor() {
    this.store.dispatch(new HideEditorEmployeePhoto());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerEmployeePhoto());
  }
}
