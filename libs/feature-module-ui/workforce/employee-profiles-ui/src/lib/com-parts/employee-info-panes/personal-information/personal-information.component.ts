import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import {
  getSelectOptionData
} from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData } from '@nutela/models/common';
import {
  LoadApprovedDataGeneral,
  LoadAwaitingApprovalDataGeneral,
  getComprehensiveData,
  HideEditorGeneral,
  showEditor,
  getGeneralApprovedData,
  getGeneralAwaitingApprovalData,
  showViewer,
  LoadAwaitingApprovalDocumentGeneral,
  getGeneralAwaitingApprovalDocument,
  HideViewerGeneral
} from '@nutela/store/modules/workforce/employee-profiles';
import { IComprehensiveData, IGeneral } from '@nutela/models/workforce/employee-profiles';
import { toastOptionsInformation } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { isUndefined } from 'util';
import { PersonalInformationService } from '../../../components/my-personal-data/services';

@Component({
  selector: 'x365-fm-workforce-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  selectOptionData$: Observable<ISelectOptionData>;

  approvedData$: Observable<IGeneral>;
  awaitingApprovalData$: Observable<IGeneral>;
  awaitingApprovalDocument$:  Observable<any>;

  @Input() data: any = null;

  constructor(private personalInformationService: PersonalInformationService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataGeneral());
    this.store.dispatch(new LoadAwaitingApprovalDataGeneral());
    this.store.dispatch(new LoadAwaitingApprovalDocumentGeneral());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditor));
    this.showViewer$ = this.store.pipe(select(showViewer));

    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.approvedData$ = this.store.pipe(select(getGeneralApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getGeneralAwaitingApprovalData));
    this.awaitingApprovalDocument$ = this.store.pipe(select(getGeneralAwaitingApprovalDocument));
  }

  showEditor() {
    this.personalInformationService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorGeneral());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerGeneral());
  }
}
