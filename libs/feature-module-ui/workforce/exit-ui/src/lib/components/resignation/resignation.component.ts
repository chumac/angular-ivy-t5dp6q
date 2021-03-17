import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ISubscriptions } from '@nutela/models/common';
import { Observable, pipe } from 'rxjs';
import { IResignationSubmitted } from 'libs/models/workforce/exit/src/lib/interfaces';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ResignationService } from './resignation.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import {
  getSubmittedResignationsDataResignation,
  LoadDataSubmittedResignation,
  ShowResponseViewerResignation,
  HideResponseViewerResignation,
  getResignationDocument,
  HideLetterEditor,
  ShowLetterEditor,
  showResignEditor,
  LoadingResignation,
  isLoadingResignations
} from '../../store/resignation';
import { LoadLetterResign, HideChecklistViewerResign, CancelResignation } from '../../store/resign';
import { take, map } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { Router } from '@angular/router';
import { STANDARD_ROUTES, AGREEMENT_KEYS, ToastTypes } from '@nutela/shared/app-global';
import { LetterStatus } from '../../enumerations/letter-status.enumeration';
import { IAppState } from '@nutela/store/app-state';
import { getAgreementTemplate, LoadEmployeeConsent, LoadAgreementTemplate, getEmployeeConsent } from 'libs/store/shared/src/lib/policy-agreement';
import { ShowToast } from '@nutela/store/shared';
import { implementPolicy } from '@nutela/store/modules/foundation';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-exit-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.scss']
})
export class ResignationComponent implements OnInit {

  private subscriptions: ISubscriptions = {};

  status = LetterStatus;
  showAgreement: boolean = false;
  disableAgreeButton: boolean = true;

  submittedResignationData$: Observable<IResignationSubmitted[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  agreementTemplate$: Observable<string>;
  documentData$: Observable<string>;
  implementPolicy$: Observable<string>;
  employeeConsent$: Observable<boolean>;
  comprehensiveData$: Observable<IComprehensiveData>;

  // @ViewChild('transactionApplyEditor') transactionApplyEditor: TransactionApplyEditorComponent;
  @ViewChild('submittedResignationDataGrid')
  submittedResignationDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: ResignationService,
    private store: Store<IAppState>,
    public utilService: UtilService,
    public dialog: MatDialog,
    private route: Router,
  ) {
    titleService.setTitle(
      `${'My Exit'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.submittedResignationData$ = this.store.select(pipe(getSubmittedResignationsDataResignation));
    this.comprehensiveData$ = this.store.select(pipe(getComprehensiveData));
    this.documentData$ = this.store.select(pipe(getResignationDocument));
    this.agreementTemplate$ = this.store.select(pipe(getAgreementTemplate));
    this.showEditor$ = this.store.select(pipe(showResignEditor))
    this.isLoading$ = this.store.select(pipe(isLoadingResignations))
    this.implementPolicy$ = this.store.select(pipe(implementPolicy));
    this.employeeConsent$ = this.store.select(pipe(getEmployeeConsent));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingResignation());
    this.store.dispatch(new LoadDataSubmittedResignation());
  }

  getEmployeeId(): number {
    let id: number;
    this.comprehensiveData$.pipe(take(1)).subscribe(employee => id = employee.employee_id)
    return id;
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.submittedResignationDataGrid) {
      this.service.search(
        this.submittedResignationDataGrid,
        searchString,
        filterBy
      );
    }
  }


  onScroll(event) {
    if (event.reachedBottom) {
      this.disableAgreeButton = false;
    }

  }

  onSendResignationLetterClicked() {
    this.implementPolicy$.pipe(take(1)).subscribe(val => {
      if (val && val.trim().toLowerCase() === 'yes') {
        this.store.dispatch(new LoadAgreementTemplate({ key: AGREEMENT_KEYS.EXIT_AGREEMENT }));
        this.showAgreement = true;
      } else {
        this.store.dispatch(new ShowLetterEditor());
      }
    });
  }

  agreeButtonClicked() {
    this.store.dispatch(new LoadEmployeeConsent({ isAdmin: false, employeeId: this.getEmployeeId(), accessPath: true }));

    this.subscriptions['consent'] = this.employeeConsent$.subscribe(val => {
      if (val) {
        this.showAgreement = false;
        this.store.dispatch(new ShowLetterEditor());
      }
    });
  }
  disagreeButtonClicked() {
    this.showAgreement = false;
  }

  getRowData$(rowId: number): Observable<IResignationSubmitted> {
    return this.submittedResignationData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }


  getRowByStatusTextData$(rowId: string): Observable<IResignationSubmitted> {
    return this.submittedResignationData$.pipe(
      map(d => d.filter(v => v.status_text.trim().toLowerCase() === rowId.trim().toLowerCase())),
      map(e => e.shift()))
  }

  onViewLetterClicked(rowId: number) {
    this.submittedResignationData$.pipe(take(1)).subscribe(data => {
      if (data) {
        this.openModal(data[0]);
      }
    });
  }

  onViewChecklistButtonClicked() { }

  openModal(result: IResignationSubmitted): void {
    this.resignationDialogRef = this.dialog.open(ResignationViewerComponent, {
      width: '50%',
      minHeight: '729px',
      data: result,
      panelClass: 'custom-dialog-container'
    });
  }

  onViewResponseIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(letter => {
      this.store.dispatch(new ShowResponseViewerResignation());
    })

  }

  onDownloadIconClicked(rowId: number) {
    this.documentData$.pipe(take(1))
      .subscribe((result) => {
        window.open(result, '_blank');
      }
      );
  }

  onViewProcessIconClicked(rowId: number) {
    this.route.navigate([
      STANDARD_ROUTES.processList
    ]);
  }

  onCancelIconClicked(rowId: number) {
    this.store.dispatch(new CancelResignation());
  }

  hasLetter(rowId: number) {
    let status;
    this.getRowData$(rowId).pipe(take(1)).subscribe(result => {
      if (result.resign_letter) {
        status = true
      } else {
        status = false;
      }
    });

    return status;
  }


  getStatus(statusText: string): number {
    let className: number;
    this.getRowByStatusTextData$(statusText).pipe(take(1)).subscribe(letter => {
      className = letter.status
    })

    return className
  }

  onCancelViewer() {
    this.store.dispatch(new HideChecklistViewerResign());
    this.store.dispatch(new HideResponseViewerResignation());
  }

  onCancelEditor() {
    this.store.dispatch(new HideLetterEditor());
  }

  onRefresh() {
    this.store.dispatch(new LoadDataSubmittedResignation());
    this.store.dispatch(new LoadLetterResign());
    this.store.dispatch(new ShowToast({
      title: null,
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }))
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
