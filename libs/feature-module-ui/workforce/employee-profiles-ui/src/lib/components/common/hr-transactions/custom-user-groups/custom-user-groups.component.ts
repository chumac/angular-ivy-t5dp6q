import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { CustomUserGroupsEditorComponent } from './custom-user-groups-editor/custom-user-groups-editor.component';
import { CustomUserGroupsViewerComponent } from './custom-user-groups-viewer/custom-user-groups-viewer.component';
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
import { showEditorCustomUserGroup, showViewerCustomUserGroup, isProcessingCustomUserGroup, getApprovedDataCustomUserGroup, getAwaitingApprovalDataCustomUserGroup, LoadApprovedDataCustomUserGroup, LoadAwaitingApprovalDataCustomUserGroup, ShowEditorCustomUserGroup, HideEditorCustomUserGroup, LoadValuesCustomUserGroup, DeleteDataCustomUserGroup, HideViewerCustomUserGroup, ShowViewerCustomUserGroup, getCustomGroupsCustomUserGroup, getValuesCustomUserGroup, LoadCustomGroupsCustomUserGroup, ProcessingCustomUserGroup } from '../../../../store/hr-transactions/custom-user-group';
import { ICustomUserGroup, ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { CustomUserGroupService } from './custom-user-groups.service';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';

@Component({
  selector: 'x365-fm-workforce-custom-user-groups',
  templateUrl: './custom-user-groups.component.html',
  styleUrls: ['./custom-user-groups.component.scss'],
  providers: [CustomUserGroupService]

})
export class CustomUserGroupsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;


  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  approvedData$: Observable<ICustomUserGroup[]>;
  awaitingApprovalData$: Observable<ICustomUserGroup[]>;
  activePersonnel$: Observable<ISelectOption[]>;
  customGroups$: Observable<ICustomUserGroupSetup[]>;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: CustomUserGroupsEditorComponent;
  @ViewChild('viewer') viewer: CustomUserGroupsViewerComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('awaitingApprovalDataGrid') awaitingApprovalDataGrid: IgxGridComponent;
  @ViewChild('customGroupsGridLookup') customGroupsGridLookup: DxLookupComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: CustomUserGroupService,
    private store: Store<IAppState>, 
    private dialogBoxService: DialogBoxService, 
    public utilService: UtilService,) {
      titleService.setTitle(`${'Custom Staff Groups'}${this.partialDocumentTitle}`)
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCustomUserGroup));
    this.showViewer$ = this.store.pipe(select(showViewerCustomUserGroup));
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomUserGroup));
    this.approvedData$ = this.store.pipe(select(getApprovedDataCustomUserGroup));
    // this.awaitingApprovalData$ = this.store.pipe(select(getAwaitingApprovalDataCustomUserGroup));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
    this.customGroups$ = this.store.pipe(select(getCustomGroupsCustomUserGroup));
  }

  storeDispatches() {
    // this.store.dispatch(new LoadApprovedDataCustomUserGroup());
    // this.store.dispatch(new LoadAwaitingApprovalDataCustomUserGroup());
    this.store.dispatch(new LoadCustomGroupsCustomUserGroup());
  }

  loadUsersByGroupId(){
    if(this.customGroupsGridLookup.value){
      this.store.dispatch(new ProcessingCustomUserGroup());
      this.store.dispatch(new LoadApprovedDataCustomUserGroup({recordId: this.customGroupsGridLookup.value}));
    }
  }

  getRowApprovedData$(rowId: number): Observable<ICustomUserGroup> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<ICustomUserGroup> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onApplyBtnClicked() {
    this.editor.data = null;
    this.editor.reset();
    this.store.dispatch(new ShowEditorCustomUserGroup());
  }

  onRefreshBtnClicked() {
    if(this.customGroupsGridLookup.value){
      this.store.dispatch(new LoadApprovedDataCustomUserGroup({recordId: this.customGroupsGridLookup.value}));
      // this.store.dispatch(new LoadAwaitingApprovalDataCustomUserGroup());  
      this.store.dispatch(new ShowToast({title: null, message: `Custom Staff Group Transaction Information is being refreshed.`, type: ToastTypes.INFO}));
    } else {
      this.store.dispatch(new ShowToast({title: null, message: `Select a custom group.`, type: ToastTypes.INFO}));
    }

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCustomUserGroup());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCustomUserGroup());
        }
      );
  }

  onApprovedEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCustomUserGroup());
        }
      );
  }

  onAwaitingApprovalEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCustomUserGroup());
        }
      );
  }

  onApprovedDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataCustomUserGroup({recordId: id, groupId: this.customGroupsGridLookup.value}));
      }
    });
  }

  onAwaitingApprovalDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        // this.store.dispatch(new DeleteDataCustomUserGroup({recordId: id}));
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
    this.store.dispatch(new HideEditorCustomUserGroup());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerCustomUserGroup());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}

