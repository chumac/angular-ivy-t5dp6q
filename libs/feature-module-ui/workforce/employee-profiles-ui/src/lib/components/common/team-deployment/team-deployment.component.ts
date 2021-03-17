import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { TeamDeploymentEditorComponent } from './team-deployment-editor/team-deployment-editor.component';
import { TeamDeploymentViewerComponent } from './team-deployment-viewer/team-deployment-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
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
import * as constants from '../../../constants'
import { ITeamDeployment, ITeamDeploymentTransaction, IPersonal } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { TeamDeploymentService } from './team-deployment.service';
import { showEditorTeamDeployment, showViewerTeamDeployment, isProcessingTeamDeployment, getDeploymentDataTeamDeployment, getTransactionDataTeamDeployment, getTeamMembersTeamDeployment, LoadDeploymentDataTeamDeployment, LoadTransactionsDataTeamDeployment, ITeamDeploymentState, ShowEditorTeamDeployment, DeleteDataTeamDeployment, HideEditorTeamDeployment, HideViewerTeamDeployment, ShowViewerTeamDeployment, loadingTeamDeployment, LoadingTeamDeployment } from '../../../store/team-deployments';

@Component({
  selector: 'x365-fm-workforce-team-deployment',
  templateUrl: './team-deployment.component.html',
  styleUrls: ['./team-deployment.component.scss'],
  providers: [TeamDeploymentService]

})
export class TeamDeploymentComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  loading$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  deploymentData$: Observable<ITeamDeployment[]>;
  transactionData$: Observable<ITeamDeploymentTransaction[]>;
  teamMembers$: Observable<IPersonal[]>;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: TeamDeploymentEditorComponent;
  @ViewChild('viewer') viewer: TeamDeploymentViewerComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('deploymentDataGrid') deploymentDataGrid: IgxGridComponent;
  @ViewChild('transactionDataGrid') transactionDataGrid: IgxGridComponent;
  @ViewChild('teamMemberLookup') teamMemberLookup: DxLookupComponent;
  @ViewChild('gridEmployeeLookup') gridEmployeeLookup: DxLookupComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: TeamDeploymentService,
    private store: Store<IAppState>, 
    private dialogBoxService: DialogBoxService, 
    public utilService: UtilService,) {
      titleService.setTitle(`${'Team Deployment'}${this.partialDocumentTitle}`)
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorTeamDeployment));
    this.showViewer$ = this.store.pipe(select(showViewerTeamDeployment));
    this.isProcessing$ = this.store.pipe(select(isProcessingTeamDeployment));
    this.loading$ = this.store.pipe(select(loadingTeamDeployment));
    this.deploymentData$ = this.store.pipe(select(getDeploymentDataTeamDeployment));
    this.transactionData$ = this.store.pipe(select(getTransactionDataTeamDeployment));
    this.teamMembers$ = this.store.pipe(select(getTeamMembersTeamDeployment));
  }

  storeDispatches() {

  }

  getRowDeploymentData$(rowId: number): Observable<ITeamDeployment> {
    return this.deploymentData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getRowTransactionData$(rowId: number): Observable<ITeamDeploymentTransaction> {
    return this.transactionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onDeploySelfBtnClicked() {
    this.editor.data = null;
    this.editor.reset();
    this.editor.transactionType = {id: 0, code: 'Self'};
    this.store.dispatch(new ShowEditorTeamDeployment());
  }

  onDeployTeamMemberBtnClicked() {
    this.editor.data = null;
    this.editor.reset();
    this.editor.transactionType = {id: 1, code: 'Team'};
    this.store.dispatch(new ShowEditorTeamDeployment());
  }

  onEmployeeGridLookupSelect() {
    if(this.gridEmployeeLookup.value) {
      this.store.dispatch(new LoadingTeamDeployment());
      this.store.dispatch(new LoadDeploymentDataTeamDeployment({employeeId: this.gridEmployeeLookup.value}));
      this.store.dispatch(new LoadTransactionsDataTeamDeployment({employeeId: this.gridEmployeeLookup.value}));
    }
  }

  onRefreshBtnClicked() {
    if(this.gridEmployeeLookup.value) {
      this.store.dispatch(new LoadDeploymentDataTeamDeployment({employeeId: this.gridEmployeeLookup.value}));
      this.store.dispatch(new LoadTransactionsDataTeamDeployment({employeeId: this.gridEmployeeLookup.value}));    
      this.store.dispatch(new ShowToast({title: null, message: `Team Deployment Information is being refreshed.`, type: ToastTypes.INFO}));  
    } else {
      this.store.dispatch(new ShowToast({title: null, message: `Select an employee.`, type: ToastTypes.ERROR}));  
    }
  }

  onDeploymentViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowDeploymentData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.type = 0;
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerTeamDeployment());
        }
      );
  }

  onTransactionViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowTransactionData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.type = 1;
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerTeamDeployment());
        }
      );
  }

  // onDeploymentEditIconClicked(rowId: number) {
  //   this.editor.data = null;

  //   this.getRowDeploymentData$(rowId).pipe(take(1))
  //     .subscribe((result) => {
  //         this.editor.data = result;
  //         this.editor.reset();
  //         this.store.dispatch(new ShowEditorTeamDeployment());
  //       }
  //     );
  // }

  // onTransactionEditIconClicked(rowId: number) {
  //   this.editor.data = null;

  //   this.getRowTransactionData$(rowId).pipe(take(1))
  //     .subscribe((result) => {
  //         this.editor.data = result;
  //         this.editor.reset();
  //         this.store.dispatch(new ShowEditorTeamDeployment());
  //       }
  //     );
  // }

  onDeploymentDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataTeamDeployment({recordId: id}));
      }
    });
  }

  onTransactionDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataTeamDeployment({recordId: id}));
      }
    });  
  }

  onFilterListselected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string, grid: boolean) {
    if(!grid) {
      if (this.deploymentDataGrid) {
        if (filterValue) {
          this.deploymentDataGrid.clearFilter();
          this.deploymentDataGrid.filteringLogic = FilteringLogic.Or;
          this.deploymentDataGrid.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.deploymentDataGrid.clearFilter();
          this.deploymentDataGrid.filteringLogic = FilteringLogic.Or;
          this.deploymentDataGrid.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
      }
    }

    if(grid) {
      if (this.transactionDataGrid) {
        if (filterValue) {
          this.transactionDataGrid.clearFilter();
          this.transactionDataGrid.filteringLogic = FilteringLogic.Or;
          this.transactionDataGrid.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.transactionDataGrid.clearFilter();
          this.transactionDataGrid.filteringLogic = FilteringLogic.Or;
          this.transactionDataGrid.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
      }
    }
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorTeamDeployment());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerTeamDeployment());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}

