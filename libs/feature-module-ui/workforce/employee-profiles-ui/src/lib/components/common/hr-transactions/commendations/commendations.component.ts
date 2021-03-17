import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { CommendationsEditorComponent } from './commendations-editor/commendations-editor.component';
import { CommendationsViewerComponent } from './commendations-viewer/commendations-viewer.component';
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
import { showEditorCommendation, showViewerCommendation, isProcessingCommendation, getApprovedDataCommendation, getAwaitingApprovalDataCommendation, LoadApprovedDataCommendation, LoadAwaitingApprovalDataCommendation, ShowEditorCommendation, HideEditorCommendation, getRoleTypesCommendation, DeleteDataCommendation, HideViewerCommendation, ShowViewerCommendation, LoadRoleTypeCommendation } from '../../../../store/hr-transactions/commendation';
import { ICommendationTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { CommendationService } from './commendations.service';

@Component({
  selector: 'x365-fm-workforce-commendations',
  templateUrl: './commendations.component.html',
  styleUrls: ['./commendations.component.scss'],
  providers: [CommendationService]

})
export class CommendationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;


  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  approvedData$: Observable<ICommendationTransaction[]>;
  awaitingApprovalData$: Observable<ICommendationTransaction[]>;
  activePersonnel$: Observable<ISelectOption[]>;
  roleTypes$: Observable<ISelectOption[]>;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: CommendationsEditorComponent;
  @ViewChild('viewer') viewer: CommendationsViewerComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('awaitingApprovalDataGrid') awaitingApprovalDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: CommendationService,
    private store: Store<IAppState>, 
    private dialogBoxService: DialogBoxService, 
    public utilService: UtilService,) {
      titleService.setTitle(`${'Commendations'}${this.partialDocumentTitle}`)
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCommendation));
    this.showViewer$ = this.store.pipe(select(showViewerCommendation));
    this.isProcessing$ = this.store.pipe(select(isProcessingCommendation));
    this.approvedData$ = this.store.pipe(select(getApprovedDataCommendation));
    this.awaitingApprovalData$ = this.store.pipe(select(getAwaitingApprovalDataCommendation));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
    this.roleTypes$ = this.store.pipe(select(getRoleTypesCommendation));
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataCommendation());
    this.store.dispatch(new LoadAwaitingApprovalDataCommendation());
    this.store.dispatch(new LoadRoleTypeCommendation());
  }

  getRowApprovedData$(rowId: number): Observable<ICommendationTransaction> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.commendation_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<ICommendationTransaction> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.commendation_id === rowId)),
      map(e => e.shift()))
  }

  onApplyBtnClicked() {
    this.editor.data = null;
    this.editor.reset();
    this.store.dispatch(new ShowEditorCommendation());
  }

  onRefreshBtnClicked() {
    this.store.dispatch(new LoadApprovedDataCommendation());
    this.store.dispatch(new LoadAwaitingApprovalDataCommendation());
    this.store.dispatch(new ShowToast({title: null, message: `Commendation Transaction Information is being refreshed.`, type: ToastTypes.INFO}));

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCommendation());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCommendation());
        }
      );
  }

  onApprovedEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCommendation());
        }
      );
  }

  onAwaitingApprovalEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCommendation());
        }
      );
  }

  onApprovedDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataCommendation({recordId: id}));
      }
    });
  }

  onAwaitingApprovalDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataCommendation({recordId: id}));
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
    this.store.dispatch(new HideEditorCommendation());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerCommendation());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}

