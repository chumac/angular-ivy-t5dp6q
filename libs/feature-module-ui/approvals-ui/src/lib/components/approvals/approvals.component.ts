import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IAppState } from '@nutela/store/app-state';
import { IWorkflowMessage } from '@nutela/models/foundation';
import { getWorkflowMessages, WorkLifeDataLoadWorkflowMessages, getWorkflowSubmissions, LoadingWorkLifeData, isLoadingWorkData, WorkLifeDataLoadWorkflowSubmissions, getQueueId } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { ApprovalsService } from './approvals.service';
import { getSelectOptionData, getActivePersonnel } from '@nutela/store/modules/foundation';
import { ISelectOptionData } from '@nutela/models/common';
import { ApproveEditorComponent } from './approve-editor/approve-editor.component';
import { DeclineEditorComponent } from './decline-editor/decline-editor.component';
import { RedirectEditorComponent } from './redirect-editor/redirect-editor.component';
import { RemoveEditorComponent } from './remove-editor/remove-editor.component';
import { take, map, takeUntil } from 'rxjs/operators';
import { ShowApproveEditor, showApproveEditor, HideApproveEditor, showDeclineEditor, showRedirectEditor,
         showRemoveEditor, ShowDeclineEditor, HideDeclineEditor, ShowRedirectEditor, HideRedirectEditor,
         ShowRemoveEditor, HideRemoveEditor, LoadReport, LoadDocument, ShowViewerApproval, HideViewerApproval,
         showViewerApproval, HideRequestEditor, ShowRequestEditor, showRequestEditor, isLoadingApproval,
         LoadingApproval, LoadApprovalPath, ShowApprovalPathViewer, HideApprovalPathViewer,
         showApprovalPathViewer, ClearApprovalPath, getQueueLists, LoadQueueList, LoadLabelValue } from '../../store/approval';
import { ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { IgxGridComponent } from 'igniteui-angular';
import { Sources, msgSources } from '../../enumerations';
import { ApprovalViewerComponent } from './approval-viewer/approval-viewer.component';
import { RequestEditorComponent } from './request-editor/request-editor.component';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ResetLeaveEditData } from '../../store/leave-edit';
import { Router } from '@angular/router';
import { APPROVE_DATA_URLs } from '../../constants';
import { DialogBoxService, DialogBoxModes } from '@nutela/shared/ui';
import { ApprovalPathViewerComponent } from './approval-path-viewer/approval-path-viewer.component';
import { getObjectiveApprovalWorkflowData, LoadWorkflowDataObjectiveApproval, OBJECTIVE_APPROVAL_ACTION_CONSTS } from '@nutela/feature-module-ui/talent/performance-ui';
import { Subject } from 'rxjs/internal/Subject';
import { LoadQueueNotification } from 'libs/store/shared/src/lib/notification';
import { from } from 'rxjs';
import { LoadDataFinalizeWorkflowSuccess } from 'libs/feature-module-ui/workforce/exit-ui/src/lib/store/hr-process';
import { LoadReboardWorkflowMessageSuccess } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/employees-data-home';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-approvals-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss'],
  providers: [ApprovalsService],
})
export class ApprovalsComponent implements OnInit {
  showApproveEditor$: Observable<boolean>;
  showDeclineEditor$: Observable<boolean>;
  showRedirectEditor$: Observable<boolean>;
  showRemoveEditor$: Observable<boolean>;
  showRequestEditor$: Observable<boolean>;

  showViewer$: Observable<boolean>;
  showApprovalPathViewer$: Observable<boolean>;
  showSubmissionViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  queueLists$: Observable<ISelectOption[]>;
  queueId$: Observable<number>;

  workflowMessages$: Observable<IWorkflowMessage[]>;
  workflowSubmissions$: Observable<IWorkflowMessage[]>;

  selectOptionData$: Observable<ISelectOptionData>;
  activePersonnel$: Observable<ISelectOption[]>;

  perfWorkflowData$: Observable<any>;
  reboardWorkflowData$: Observable<any>;
  isProcessingPerfObjective$: Observable<boolean>;
  ngDestroyed$ = new Subject();

  @ViewChild('approveEditor') approveEditor: ApproveEditorComponent;
  @ViewChild('declineEditor') declineEditor: DeclineEditorComponent;
  @ViewChild('redirectEditor') redirectEditor: RedirectEditorComponent;
  @ViewChild('removeEditor') removeEditor: RemoveEditorComponent;
  @ViewChild('requestEditor') requestEditor: RequestEditorComponent;

  @ViewChild("itemsAwaitingMyActionGrid") itemsAwaitingMyActionGrid: IgxGridComponent;
  @ViewChild("mySubmissionsGrid") mySubmissionsGrid: IgxGridComponent;

  @ViewChild('viewer') viewer: ApprovalViewerComponent;

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBySentTo') filterBySentTo: SelectComponent;
  @ViewChild('filterByCanFinalize') filterByCanFinalize: SelectComponent;
  @ViewChild('workflowEntity') workflowEntity: SelectComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: ApprovalsService, private store: Store<IAppState>, private router: Router, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(`${'Approvals'}${this.partialDocumentTitle}`);
   }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatch();
  }

  storeSelects() {
    this.showApproveEditor$ = this.store.pipe(select(showApproveEditor));
    this.showDeclineEditor$ = this.store.pipe(select(showDeclineEditor));
    this.showRedirectEditor$ = this.store.pipe(select(showRedirectEditor));
    this.showRemoveEditor$ = this.store.pipe(select(showRemoveEditor));
    this.showRequestEditor$ = this.store.pipe(select(showRequestEditor));

    this.showViewer$ = this.store.pipe(select(showViewerApproval));
    this.showApprovalPathViewer$ = this.store.pipe(select(showApprovalPathViewer));

    this.workflowMessages$ = this.store.pipe(select(getWorkflowMessages));
    this.workflowSubmissions$ = this.store.pipe(select(getWorkflowSubmissions));

    this.queueLists$=this.store.pipe(select(getQueueLists));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));

    this.perfWorkflowData$ = this.store.pipe(select(getObjectiveApprovalWorkflowData)); // Select Performance Objective Workflow Data
    this.reboardWorkflowData$ = this.store.pipe(select(getObjectiveApprovalWorkflowData)); // Select Performance Objective Workflow Data
  }

  storeDispatch(){
    this.store.dispatch(new LoadQueueList());
    this.queueId$=this.store.pipe(select(getQueueId));
    this.queueId$.subscribe(res=>{
     this.service.queueId=res?res:1;
     this.store.dispatch(new WorkLifeDataLoadWorkflowMessages({id:this.service.queueId}));
    });
    this.queueListResult();
  }

  search() {
    let filterBySentTo: string = '';
    let filterByCanFinalize: string = '';

    const searchString = this.searchInput.nativeElement.value;
    const workflowEntity = <string>this.workflowEntity.value;

    if (this.filterBySentTo) {
      filterBySentTo = <string>this.filterBySentTo.value;
    }

    if (this.filterByCanFinalize) {
      filterByCanFinalize = <string>this.filterByCanFinalize.value;
    }

    if (this.itemsAwaitingMyActionGrid) {
      this.itemsAwaitingMyActionGrid.filteringExpressionsTree = this.service.search(searchString, filterBySentTo, filterByCanFinalize, workflowEntity, '');
    }

    if (this.mySubmissionsGrid) {
      this.mySubmissionsGrid.filteringExpressionsTree = this.service.search(searchString, '', '', workflowEntity, '');
    }
  }

  onApprove() {
    const selectedItems = this.itemsAwaitingMyActionGrid.selectedRows();
    if (selectedItems.length === 0) {
      this.store.dispatch(new ShowToast({title: null, message: `Please, select items from the list.`, type: ToastTypes.INFO}));
    } else {
      if (!this.isSelectionValid()) {
        this.store.dispatch(new ShowToast({title: null, message: `You made an invalid selection.`, type: ToastTypes.INFO}));
      } else {
        this.approveEditor.data = selectedItems;
        this.store.dispatch(new ShowApproveEditor());
        this.approveEditor.fs.queueId= this.service.queueId;
      }
    }
  }

  isSelectionValid(): boolean {
    return true;
  }

  onDecline() {
    const selectedItems = this.itemsAwaitingMyActionGrid.selectedRows();
    if (selectedItems.length === 0) {
      this.store.dispatch(new ShowToast({title: null, message: `Please, select items from the list.`, type: ToastTypes.INFO}));
    } else {
      this.declineEditor.data = selectedItems;
      this.store.dispatch(new ShowDeclineEditor());
      this.declineEditor.fs.queueId= this.service.queueId;
    }
  }

  onRedirectAwaiting() {
    const selectedItems = this.itemsAwaitingMyActionGrid.selectedRows();
    if (selectedItems.length === 0) {
      this.store.dispatch(new ShowToast({title: null, message: `Please, select items from the list.`, type: ToastTypes.INFO}));
    } else {
      this.redirectEditor.data = selectedItems;
      this.redirectEditor.source = Sources.ITEMS_AWAITING_MY_ACTIONS
      this.store.dispatch(new ShowRedirectEditor());
      this.redirectEditor.fs.queueId= this.service.queueId;
    }
  }

  onRedirectSubmissions() {
    const selectedItems = this.mySubmissionsGrid.selectedRows();
    if (selectedItems.length === 0) {
      this.store.dispatch(new ShowToast({title: null, message: `Please, select items from the list.`, type: ToastTypes.INFO}));
    } else {
      this.redirectEditor.data = selectedItems;
      this.redirectEditor.source = Sources.MY_SUBMISSIONS
      this.store.dispatch(new ShowRedirectEditor());
      this.redirectEditor.fs.queueId= this.service.queueId;
    }
  }

  onRemove() {
    const selectedItems = this.mySubmissionsGrid.selectedRows();
    if (selectedItems.length === 0) {
      this.store.dispatch(new ShowToast({title: null, message: `Please, select items from the list.`, type: ToastTypes.INFO}));
    } else {
      this.removeEditor.data = selectedItems;
      this.store.dispatch(new ShowRemoveEditor());
      this.removeEditor.fs.queueId= this.service.queueId;
    }
  }

  onRefresh() {
    this.store.dispatch(new WorkLifeDataLoadWorkflowMessages({id:this.service.queueId?this.service.queueId:0}));
    this.store.dispatch(new WorkLifeDataLoadWorkflowSubmissions());
    this.store.dispatch(new LoadQueueList());
    this.store.dispatch(new LoadQueueNotification());
    this.store.dispatch(new ShowToast({title: null, message: `Notification data is being refreshed.`, type: ToastTypes.INFO}));
    this.deselectGridRows();
  }

  onWorkCompleted() {
    this.deselectGridRows();
  }

  deselectGridRows() {
    if (this.itemsAwaitingMyActionGrid) {
      this.itemsAwaitingMyActionGrid.deselectAllRows();
    }

    if (this.mySubmissionsGrid) {
      this.mySubmissionsGrid.deselectAllRows();
    }
  }

  onProcessListSelected(value) {
    this.search();
  }

  onFilterListSelected(value) {

  }

  getItemsAwaitingMyActionWorkflowMessages$(rowId: number): Observable<IWorkflowMessage[]> {
    return this.workflowMessages$.pipe(
      map(c => c.filter(val => val.msg_id === rowId)));
  }

  getMySubmissionsWorkflowMessages$(rowId: number): Observable<IWorkflowMessage[]> {
    return this.workflowSubmissions$.pipe(
      map(c => c.filter(val => val.msg_id === rowId)));
  }

  onApproveClicked(rowId: number) {
    this.approveEditor.data = null;
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.approveEditor.data = result;
          this.store.dispatch(new ShowApproveEditor());
          this.approveEditor.fs.queueId= this.service.queueId;
        }
      );
  }

  onDeclineClicked(rowId: number) {
    this.declineEditor.data = null;
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.declineEditor.data = result;
          this.store.dispatch(new ShowDeclineEditor());
          this.declineEditor.fs.queueId= this.service.queueId;
        }
      );
  }

  onRedirectAwaitingClicked(rowId: number) {
    this.redirectEditor.data = null;
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.redirectEditor.data = result;
          this.redirectEditor.source = Sources.ITEMS_AWAITING_MY_ACTIONS
          this.store.dispatch(new ShowRedirectEditor());
          this.redirectEditor.fs.queueId= this.service.queueId;
        }
      );
  }

  onRedirectSubmissionsClicked(rowId: number) {
    this.redirectEditor.data = null;
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.redirectEditor.data = result;
          this.redirectEditor.source = Sources.MY_SUBMISSIONS
          this.store.dispatch(new ShowRedirectEditor());
          this.redirectEditor.fs.queueId= this.service.queueId;
        }
      );
  }

  onRemoveClicked(rowId: number) {
    this.removeEditor.data = null;
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.removeEditor.data = result;
          this.store.dispatch(new ShowRemoveEditor());
          this.removeEditor.fs.queueId= this.service.queueId;
        }
      );
  }

  onViewerAwaitingClicked(rowId: number) {
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(
      map(d => d.filter(v => v.msg_id === rowId)),
      map(e => e.shift())).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new LoadLabelValue({msgId: result.msg_id}));
          this.store.dispatch(new ShowViewerApproval());
        }
      );
  }

  onViewerSubmissionsClicked(rowId: number) {
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(
      map(d => d.filter(v => v.msg_id === rowId)),
      map(e => e.shift())).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new LoadLabelValue({msgId: result.msg_id}));
          this.store.dispatch(new ShowViewerApproval());
        }
      );
  }

  onEditRequestClicked(rowId: number) {
    this.store.dispatch(new ResetLeaveEditData());

    this.requestEditor.data = null;

    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(
      take(1),
      map(d => d.filter(v => v.msg_id === rowId)),
      map(e => e.shift()))
      .subscribe((result) => {
        if (result && result.allow_transaction_edit ) {
          switch (result.msg_source) {
            case msgSources.LEAVEDETAILS:
              this.onEditLeaveWorkflow(result);
              break;
            case msgSources.PERFORMANCE_OBJECTIVES:
              this.onEditPerformanceWorkflow(result);
              break;
            case msgSources.EMPLOYEE_REBOARDING:
              this.onEditReboardWorkflow(result.msg_id);
              break;
            case msgSources.EMPLOYEE_RESIGNATION_HR:
              this.onEditResignationHRFinalize(result.msg_id);
              break;
            default:
              this.store.dispatch(new ShowToast({ title: null, message: `Invalid Action.`, type: ToastTypes.INFO }));
          }

        } else {
          this.store.dispatch(new ShowToast({ title: 'Action Not Allowed', message: `You are not allowed to edit this transaction. Please contact Admin.`, type: ToastTypes.INFO }));
        }
      }
    );
  }

  onViewReportClicked(rowId: number) {
    this.store.dispatch(new LoadReport(rowId));
  }

  onViewDownloadAttachmentAwaitingClicked(rowId: number) {
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(
      map(d => d.filter(v => v.msg_id === rowId)),
      map(e => e.shift())).pipe(take(1))
      .subscribe((result) => {
          if (result && result.has_document) {
            this.store.dispatch(new LoadDocument({docGuid: result.doc_name, docExtension: result.doc_extension}));
          } else {
            this.store.dispatch(new ShowToast({title: null, message: `Document is not available.`, type: ToastTypes.INFO}));
          }
        }
      );
   }

   onViewDownloadAttachmentSubmissionsClicked(rowId: number) {
    this.getItemsAwaitingMyActionWorkflowMessages$(rowId).pipe(
      map(d => d.filter(v => v.msg_id === rowId)),
      map(e => e.shift())).pipe(take(1))
      .subscribe((result) => {
          if (result && result.has_document) {
            this.store.dispatch(new LoadDocument({docGuid: result.doc_name, docExtension: result.doc_extension}));
          } else {
            this.store.dispatch(new ShowToast({title: null, message: `Document is not available.`, type: ToastTypes.INFO}));
          }
        }
      );
   }

  onViewApprovalPathClicked(rowId: number) {
    this.store.dispatch(new LoadApprovalPath({msgId: rowId}));
    this.store.dispatch(new ShowApprovalPathViewer());
  }

  onCancelApproveEditor() {
    this.store.dispatch(new HideApproveEditor());
  }

  onCancelDeclineEditor() {
    this.store.dispatch(new HideDeclineEditor());
  }

  onCancelRedirectEditor() {
    this.store.dispatch(new HideRedirectEditor());
  }

  onCancelRemoveEditor() {
    this.store.dispatch(new HideRemoveEditor());
  }

  onCancelRequestEditor() {
    this.store.dispatch(new HideRequestEditor());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerApproval());
  }

  onCancelApprovalPathViewer() {
    this.store.dispatch(new HideApprovalPathViewer());
    this.store.dispatch(new ClearApprovalPath());
  }

  unsubscribe() {
    this.ngDestroyed$.next();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  queueListResult(){
    this.queueLists$.subscribe(res=>{
      this.service.setToolTip(this.service.setupToolTips(res));
    })
  }

  onQueueSelect(event){
    this.queueListResult()
    this.service.queueId=event.value?event.value:1;
    if( this.service.queueId === 2){
      this.service.msgToShow=true;
    }
    else{
      this.service.msgToShow=false;
    }
    this.store.dispatch(new WorkLifeDataLoadWorkflowMessages({id:this.service.queueId}));

  }

  onEditLeaveWorkflow(data) {
    this.requestEditor.data = data;
    this.requestEditor.reset();
    this.requestEditor.loadData();
    this.store.dispatch(new ShowRequestEditor());
    this.requestEditor.fs.queueId= this.service.queueId;
  }

  onEditPerformanceWorkflow(data) {
    this.isProcessingPerfObjective$ = from([true]);
    this.service.loadExplicitlyWorkflowMetadata(data.msg_id).pipe(take(1)).subscribe((data) => {
      if(data.Success){
        this.isProcessingPerfObjective$ = from([false]);
        let result = data.Results[0];
        this.router.navigate([`${APPROVE_DATA_URLs.performanceObjectivesUrl}/${result.employee_id}/${result.plan_id}/${OBJECTIVE_APPROVAL_ACTION_CONSTS.loadLMObjectives}`]);
      } else {
        this.isProcessingPerfObjective$ = from([false]);
        this.store.dispatch(new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:`Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR}));
      }
    },
    (err) => {
      this.isProcessingPerfObjective$ = from([false]);
      this.store.dispatch(new ShowToast({title: 'Data Could Not Be Loaded', message: `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR}));
    });
  }

  onEditReboardWorkflow(messageId) {
    console.log(messageId)
    this.isProcessingPerfObjective$ = from([true]);

    this.service.loadReboardWorkflowMetadata(messageId).pipe(take(1)).subscribe((data) => {
      if (data.Success) {

        this.isProcessingPerfObjective$ = from([false]);
        let result = data.Results[0];
        if (result) {
          this.store.dispatch(new LoadReboardWorkflowMessageSuccess(result))
          this.router.navigate([`${STANDARD_ROUTES.hrReboardEmployeeDetails}/${result.employee_id}`]);
        }
      } else {
        this.isProcessingPerfObjective$ = from([false]);
        this.store.dispatch(new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR }));
      }
    },
      (err) => {
        this.isProcessingPerfObjective$ = from([false]);
        this.store.dispatch(new ShowToast({ title: 'Data Could Not Be Loaded', message: `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR }));
      });
  };

  onEditResignationHRFinalize(messageId: number) {
    this.isProcessingPerfObjective$ = from([true]);

    this.service.loadResignationHRFinalizeMetadata(messageId).pipe(take(1)).subscribe((data) => {
      if (data.Success) {

        this.isProcessingPerfObjective$ = from([false]);
        let result = data.Results[0];
        if (result) {
          this.store.dispatch(new LoadDataFinalizeWorkflowSuccess(result))
          this.router.navigate([`${STANDARD_ROUTES.hrProcessList}/${result.employee_id}`]);
        }
      } else {
        this.isProcessingPerfObjective$ = from([false]);
        this.store.dispatch(new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR }));
      }
    },
      (err) => {
        this.isProcessingPerfObjective$ = from([false]);
        this.store.dispatch(new ShowToast({ title: 'Data Could Not Be Loaded', message: `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR }));
      });
  };
}
