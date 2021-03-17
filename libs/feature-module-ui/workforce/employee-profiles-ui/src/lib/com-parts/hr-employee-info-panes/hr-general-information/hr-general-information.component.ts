import { Component, OnInit, Input, Inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData } from '@nutela/models/common';

import {
  LoadAwaitingApprovalDocumentGeneral,
  getGeneralAwaitingApprovalDocument,
} from '@nutela/store/modules/workforce/employee-profiles';

import { IComprehensiveData, IGeneral } from '@nutela/models/workforce/employee-profiles';
import { toastOptionsInformation } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { isUndefined } from 'util';
import { LoadApprovedDataGeneral, LoadAwaitingApprovalDataGeneral, getComprehensiveData, getGeneralApprovedData,
         getGeneralAwaitingApprovalData, showEditor, showViewer, ShowEditorGeneral, HideEditorGeneral,
         HideViewerGeneral } from '../../../store/employee-detailed-area';
import { take } from 'rxjs/operators';
import { IEmployeesProfileState } from '../../../store/root';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-workforce-hr-general-information',
  templateUrl: './hr-general-information.component.html',
  styleUrls: ['./hr-general-information.component.scss']
})

export class HrGeneralInformationComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  documentData$: Observable<any>;

  comprehensiveData$: Observable<IComprehensiveData>;
  selectOptionData$: Observable<ISelectOptionData>;

  approvedData$: Observable<IGeneral>;
  awaitingApprovalData$: Observable<IGeneral>;
  awaitingApprovalDocument$:  Observable<any>;

  @Input() data: any = null;
  dat:any=null;
  @Input() public employeeId: number;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<IEmployeesProfileState>,) {
                titleService.setTitle(
                  `${'HR General Information'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }



  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataGeneral({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadAwaitingApprovalDataGeneral({ employeeId: this.employeeId }));
  }

  storeSelects() {
    // console.log('data', this.data);
    this.showEditor$ = this.store.pipe(select(showEditor));
    this.showViewer$ = this.store.pipe(select(showViewer));

    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.approvedData$ = this.store.pipe(select(getGeneralApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getGeneralAwaitingApprovalData));
    this.approvedData$.subscribe(res=>{
      this.dat=res;
    })
  }

  showEditor() {
    this.awaitingApprovalData$
    .pipe(take(1))
    .subscribe((data: IGeneral) => {
      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorGeneral());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: 'You have data awaiting approval. You must discard pending data before you can update your data again.', options: toastOptionsInformation()}));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorGeneral());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerGeneral());
  }

}
