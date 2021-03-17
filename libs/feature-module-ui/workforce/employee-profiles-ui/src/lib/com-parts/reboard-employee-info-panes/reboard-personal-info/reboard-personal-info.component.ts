import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import {  getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData } from '@nutela/models/common';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { ReboardPersonalInformationService } from '../../../components/my-reboard-data/services';
import { LoadDataReboardGeneral, showEditorReboardGeneral, showViewerReboardGeneral, getReboardGeneralData, LoadDocumentReboardGeneral, getReboardGeneralDocument, HideEditorReboardGeneral, HideViewerReboardGeneral } from '../../../store/my-reboard-data';
import { UtilService } from '@nutela/core-services';
import { GENERAL, PROFILE_AVATAR } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-reboard-personal-info',
  templateUrl: './reboard-personal-info.component.html',
  styleUrls: ['./reboard-personal-info.component.scss']
})
export class ReboardPersonalInfoComponent implements OnInit {

  imageBaseHeader = `${GENERAL.pngBase64Header}`;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  generalData$: Observable<IGeneral>;
  document$:  Observable<any>;

  @Input() data: any = null;
  @Input() reboardMode: number;

  constructor(private personalInformationService: ReboardPersonalInformationService, private store: Store<IAppState>, private utilService: UtilService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardGeneral));
    this.showViewer$ = this.store.pipe(select(showViewerReboardGeneral));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.generalData$ = this.store.pipe(select(getReboardGeneralData));
    this.document$ = this.store.pipe(select(getReboardGeneralDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardGeneral())
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

  get profileImage(): string {
    return this.data.image_profile ? `${this.imageBaseHeader}${this.data.image_profile}` : PROFILE_AVATAR.uri;
  }

  showEditor() {
    this.personalInformationService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReboardGeneral());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardGeneral());
  }

}
