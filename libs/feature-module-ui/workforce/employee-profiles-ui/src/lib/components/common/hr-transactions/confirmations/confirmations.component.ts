import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { ConfirmationsEditorComponent } from './confirmations-editor/confirmations-editor.component';
import { ConfirmationsViewerComponent } from './confirmations-viewer/confirmations-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { SwitchComponent } from '@nutela/shared/ui';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../../../constants'
import { showEditorConfirmation, showViewerConfirmation, isProcessingConfirmation, getApprovedDataConfirmation, getAwaitingApprovalDataConfirmation, LoadApprovedDataConfirmation, LoadAwaitingApprovalDataConfirmation, ShowEditorConfirmation, HideEditorConfirmation, getTransactionTypesConfirmation, LoadTransactionTypeConfirmation, DeleteDataConfirmation, HideViewerConfirmation, ShowViewerConfirmation } from '../../../../store/hr-transactions/confirmation';
import { IConfirmationTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ConfirmationService } from './confirmation.service';

@Component({
  selector: 'x365-fm-workforce-confirmations',
  templateUrl: './confirmations.component.html',
  styleUrls: ['./confirmations.component.scss'],
  providers: [ConfirmationService]

})
export class ConfirmationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;


  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  approvedData$: Observable<IConfirmationTransaction[]>;
  awaitingApprovalData$: Observable<IConfirmationTransaction[]>;
  activePersonnel$: Observable<ISelectOption[]>;
  transactionTypes$: Observable<ISelectOption[]>;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: ConfirmationsEditorComponent;
  @ViewChild('viewer') viewer: ConfirmationsViewerComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('awaitingApprovalDataGrid') awaitingApprovalDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: ConfirmationService,
    private store: Store<IAppState>, 
    private dialogBoxService: DialogBoxService, 
    public utilService: UtilService,) {
      titleService.setTitle(`${'Confirmations'}${this.partialDocumentTitle}`)
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorConfirmation));
    this.showViewer$ = this.store.pipe(select(showViewerConfirmation));
    this.isProcessing$ = this.store.pipe(select(isProcessingConfirmation));
    this.approvedData$ = this.store.pipe(select(getApprovedDataConfirmation));
    this.awaitingApprovalData$ = this.store.pipe(select(getAwaitingApprovalDataConfirmation));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
    this.transactionTypes$ = this.store.pipe(select(getTransactionTypesConfirmation));
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataConfirmation());
    this.store.dispatch(new LoadAwaitingApprovalDataConfirmation());
    this.store.dispatch(new LoadTransactionTypeConfirmation());
  }

  getRowApprovedData$(rowId: number): Observable<IConfirmationTransaction> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IConfirmationTransaction> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onApplyBtnClicked() {
    this.editor.data = null;
    this.editor.reset();
    this.store.dispatch(new ShowEditorConfirmation());
  }

  onRefreshBtnClicked() {
    this.store.dispatch(new LoadApprovedDataConfirmation());
    this.store.dispatch(new LoadAwaitingApprovalDataConfirmation());
    this.store.dispatch(new ShowToast({title: null, message: `Confirmation Transaction Information is being refreshed.`, type: ToastTypes.INFO}));

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerConfirmation());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerConfirmation());
        }
      );
  }

  onApprovedEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorConfirmation());
        }
      );
  }

  onAwaitingApprovalEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorConfirmation());
        }
      );
  }

  onApprovedDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataConfirmation({recordId: id}));
      }
    });
  }

  onAwaitingApprovalDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataConfirmation({recordId: id}));
      }
    });  
  }

  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.approvedDataGrid) {
      this.service.search(this.approvedDataGrid, searchString, filterBy);
    } else if(this.awaitingApprovalDataGrid) {
      this.service.search(this.awaitingApprovalDataGrid, searchString, filterBy);
    }
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorConfirmation());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerConfirmation());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}

