import { Component, OnInit, ViewChild } from '@angular/core';
import {
  HrzCommandTypes,
  DialogService,
  DialogBoxCommandTypes,
} from '@nutela/shared/ui';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IWorkflowAlternates } from '@nutela/models/foundation';
import {
  IWorkflowMapAlternateState,
  LoadWorkflowAlternates,
  getAltWorkflowMapData,
  ShowEditorWorkflowAlternates,
  HideEditorWorkflowAlternates,
  DeleteWorkflowAlternates,
  getSingleAltWorkflowMapData,
  LoadSingleWorkflowAlternates,
  isProcessingAltWorkflowMap,
  ProcessingWorkflowAlternates,
  showEditorAltWorkflowMap,
  LoadSystemData,
  LoadWorkDefinition,
  getEntityData,
  getWorkDefinitionData,
  getGrade,
  getForEmployee,
  LoadGrade,
  LoadForEmployee,
  getPositionCategory,
  getCategory,
  getPosition,
  getDesignation,
  getStaffGroup,
  LoadPosition,
  LoadPositionCategory,
  LoadCategory,
  LoadDesignation,
  LoadStaffGroup,
  isLoadingAltWorkflowMap,
  LoadingWorkflowAlternates
} from '../../store/alt-workflow-map';
import { UtilService } from '@nutela/core-services';
import { WorkFlowMapAltService } from './workflow-map.alt.service';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-plf-hrf-workflow-map-alt',
  templateUrl: './workflow-map-alt.component.html',
  styleUrls: ['./workflow-map-alt.component.scss'],
  providers:[WorkFlowMapAltService]
})
export class WorkflowMapAltComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  altWorkflowMapData$: Observable<IWorkflowAlternates[]>;
  singleMap$: Observable<IWorkflowAlternates[]>;
  altMap = [];
  systemData$: Observable<ISelectOption[]>;
  workDefinition$: Observable<ISelectOption[]>;
  grade$: Observable<ISelectOption[]>;
  position$: Observable<ISelectOption[]>;
  positionCategory$: Observable<ISelectOption[]>;
  category$: Observable<ISelectOption[]>;
  designation$: Observable<ISelectOption[]>;
  staffGroup$: Observable<ISelectOption[]>;
  forEmployee$: Observable<ISelectOption[]>;
  public show: boolean = true;
  public ruleType:number;

  dropDownFilterValue:string;
 @ViewChild('altMapGrid') altMapGrid: IgxGridComponent;
 @ViewChild('singleGrid') singleGrid: IgxGridComponent;

  constructor(
    private store: Store<IWorkflowMapAlternateState>,
    private dialogService: DialogService,
    private utilService: UtilService,
    public workFlowMapAltService: WorkFlowMapAltService
  ) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadWorkflowAlternates());
    this.store.dispatch(new ProcessingWorkflowAlternates());
    this.store.dispatch(new LoadSystemData());
    this.store.dispatch(new LoadWorkDefinition());
    this.store.dispatch(new LoadGrade());
    this.store.dispatch(new LoadPosition());
    this.store.dispatch(new LoadPositionCategory());
    this.store.dispatch(new LoadCategory());
    this.store.dispatch(new LoadDesignation());
    this.store.dispatch(new LoadStaffGroup());
    this.store.dispatch(new LoadForEmployee());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorAltWorkflowMap));
    this.isProcessing$ = this.store.pipe(select(isProcessingAltWorkflowMap));
    this.isLoading$ = this.store.pipe(select(isLoadingAltWorkflowMap));
    this.singleMap$ = this.store.pipe(select(getSingleAltWorkflowMapData));
    this.altWorkflowMapData$ = this.store.pipe(select(getAltWorkflowMapData));
    this.altWorkflowMapData$.subscribe(result => {
      this.altMap = this.utilService.transformToSelectDataList(
        result,
        'id',
        'description'
      );
    });
    this.systemData$ = this.store.pipe(select(getEntityData));
    this.workDefinition$= this.store.pipe(select(getWorkDefinitionData));
    this.grade$=  this.store.pipe(select(getGrade));
    this.position$=  this.store.pipe(select(getPosition));
    this.positionCategory$=  this.store.pipe(select(getPositionCategory));
    this.category$=  this.store.pipe(select(getCategory));
    this.designation$=  this.store.pipe(select(getDesignation));
    this.staffGroup$=  this.store.pipe(select(getStaffGroup));
    this.forEmployee$= this.store.pipe(select(getForEmployee));
  }

  showEditor() {
    this.store.dispatch(new ShowEditorWorkflowAlternates());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorWorkflowAlternates());
  }

  onDeleteIconClicked(row_id: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete this?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteWorkflowAlternates({ recordId: row_id, ruleType: this.ruleType }));
      }
    });
  }

  onButtonClicked() {
    this.showEditor();
  }

  onRefreshBtnClicked(){
    if(this.show===true){
     this.store.dispatch(new LoadWorkflowAlternates());
     this.store.dispatch(new ShowToast({title: null, message: ` Alternate Workflow map is being refreshed.`, type: ToastTypes.INFO}));
    }
    else{
      this.store.dispatch(
        new LoadSingleWorkflowAlternates({ recordId: this.ruleType })
      );
      this.store.dispatch(new ShowToast({title: null, message: `List is being refreshed.`, type: ToastTypes.INFO}));
    }
  }

  Rule($event) {
    this.store.dispatch(
      new LoadSingleWorkflowAlternates({ recordId: $event.value })
    );
    console.log('value', $event.value);
  }

  Mapping($event) {
    this.store.dispatch(new LoadingWorkflowAlternates());
    this.show = false;
    this.ruleType=$event.itemData.value;
    this.store.dispatch(
      new LoadSingleWorkflowAlternates({ recordId: this.ruleType })
    );
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.altMapGrid) {
      if (filterValue) {
        this.altMapGrid.clearFilter();
        this.altMapGrid.filteringLogic = FilteringLogic.Or;
        this.altMapGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.altMapGrid.clearFilter();
        this.altMapGrid.filteringLogic = FilteringLogic.Or;
        this.altMapGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
    else if(this.singleGrid){
      if (filterValue) {
        this.singleGrid.clearFilter();
        this.singleGrid.filteringLogic = FilteringLogic.Or;
        this.singleGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.singleGrid.clearFilter();
        this.singleGrid.filteringLogic = FilteringLogic.Or;
        this.singleGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
