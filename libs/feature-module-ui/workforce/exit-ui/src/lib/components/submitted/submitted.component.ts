import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { Observable, pipe } from 'rxjs';
import {
  IResignationSubmitted,
  IResponse
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { SubmittedService } from './submitted.service';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { DialogService } from '@nutela/shared/ui';
import { UtilService } from '@nutela/core-services';
import { take, map } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { Router } from '@angular/router';
import { LoadDataSubmittedLetters, getSubmittedLetters, CloseAllChecklists, ShowResignationEditor, HideResignationEditor, showEditorResignation, LoadResignationReportUrl } from '../../store/hr-resignation';
import { LetterStatus } from '../../enumerations/letter-status.enumeration';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { getEmployeeInitiationStatus } from '../../store/resignation';

@Component({
  selector: 'x365-fm-workforce-exit-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.scss']
})
export class SubmittedComponent implements OnInit {
  status = LetterStatus;
  showAgreement: boolean = false;

  submittedLetters$: Observable<IResignationSubmitted[]>;
  isLoading$: Observable<boolean>;
  responsesData$: Observable<IResponse[]>;
  showEditor$: Observable<boolean>;
  agreementTemplate$: Observable<string>;
  activePersonnel$: Observable<ISelectOption[]>;
  processInitiated$: Observable<boolean>;

  @ViewChild('submittedDataGrid') submittedDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: SubmittedService,
    private store: Store<IAppState>,
    private dialogService: DialogService,
    public utilService: UtilService,
    public dialog: MatDialog,
    private router: Router
  ) {
    titleService.setTitle(
      `${'HR Exit'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.submittedLetters$ = this.store.select(pipe(getSubmittedLetters));
    this.showEditor$ = this.store.select(pipe(showEditorResignation));
    this.activePersonnel$ = this.store.select(pipe(getActivePersonnelHR));
    this.processInitiated$ = this.store.select(pipe(getEmployeeInitiationStatus));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataSubmittedLetters());
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

    if (this.submittedDataGrid) {
      this.service.search(
        this.submittedDataGrid,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IResignationSubmitted> {
    return this.submittedLetters$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getStatusData$(rowId: string): Observable<IResignationSubmitted> {
    return this.submittedLetters$.pipe(
      map(d => d.filter(v => v.status_text.trim().toLowerCase() === rowId.trim().toLowerCase())),
      map(e => e.shift()))
  }


  hasLetter(rowId: number): boolean {
    let status: boolean;
    this.getRowData$(rowId).pipe(take(1)).subscribe(result => {
      if (result.resign_letter && !(result.doc_binary && result.doc_extension)) {
        status = true
      } else {
        status = false;
      }
    });

    return status;
  }

  hasDocument(rowId: number): boolean {
    let status: boolean;
    this.getRowData$(rowId).pipe(take(1)).subscribe(result => {
      if ((result.doc_binary && result.doc_extension) && !result.resign_letter) {
        status = true
      } else {
        status = false;
      }
    });

    return status;
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        if (result.doc_binary && result.doc_extension) {
          const docData = this.utilService.getDocumentData(
            result.doc_binary,
            result.doc_extension
          );
          window.open(docData, '_blank');
        }
      }
      );
  }

  onViewIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(letter => {
      this.openModal(letter);
    })
  }

  getStatus(statusText: string): number {
    let className: number;
    this.getStatusData$(statusText).pipe(take(1)).subscribe(letter => {
      className = letter.status
    })

    return className
  }

  openModal(result: any): void {
    this.resignationDialogRef = this.dialog.open(ResignationViewerComponent, {
      width: '50%',
      minHeight: '729px',
      data: result,
      panelClass: 'custom-dialog-container'
    });
  }

  onSendResignationLetterClicked() {
    this.store.dispatch(new ShowResignationEditor());
  }

  onProcessListIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1)).subscribe(letter => {
      if (letter) {
        let employeeId = letter.employee_id;
        this.router.navigate([`${STANDARD_ROUTES.hrProcessList}/${employeeId}`])
      }
    })
   }

  onCloseAllButtonClicked() {
    this.dialogService.show(this.dialogService.options(), `This action will close resignation process for all employee. Continue?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new CloseAllChecklists({ employeeId: 1, resignationId: 2 }));
      }
    })
  }

  onCancelEditor() {
    this.store.dispatch(new HideResignationEditor());
  }

  onRefresh() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({
      title: null,
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }))
   }

  onViewReportIconClicked(rowId: number) {
    this.store.dispatch(new LoadResignationReportUrl({ resignationId: rowId }));
  }
}
