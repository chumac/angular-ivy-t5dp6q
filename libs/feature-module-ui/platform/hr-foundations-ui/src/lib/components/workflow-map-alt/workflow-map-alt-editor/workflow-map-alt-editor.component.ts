import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { WorkflowMapAltEditorService } from './workflow-map-alt-editor.service';
import { ISystem, IWorkDefinition, IWorkflowAlternates } from '@nutela/models/foundation';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IHRFoundationState } from '../../../store/root';
import { isProcessingAltWorkflowMap, NotProcessingWorkflowAlternates, ProcessingWorkflowAlternates, LoadCostCenter, getCostCenter, SaveWorkflowAlternates } from '../../../store/alt-workflow-map';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { getSpecificType, getSpecificStructure, getUsers, LoadSpecificType, LoadSpecificStructure } from '../../../store/security';
import { IGradeInfo } from '@nutela/models/workforce/leave';
import { IPeople, IPosition, IDesignation } from '@nutela/models/workforce/personnel';
import { ShowToast } from '@nutela/store/shared';
import { IStaffCategory } from '@nutela/models/platform/lookup';

@Component({
  selector: 'x365-fm-plf-hrf-workflow-map-alt-editor',
  templateUrl: './workflow-map-alt-editor.component.html',
  styleUrls: ['./workflow-map-alt-editor.component.scss'],
  providers: [ WorkflowMapAltEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkflowMapAltEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public ruleType: number;

  @Input() public data: IWorkflowAlternates;
  @Input() public sysOption: ISystem[];
  @Input() public workOption: IWorkDefinition[];
  @Input() public grade: IGradeInfo[];
  @Input() public position: IPosition[];
  @Input() public positionCategory: any[];
  @Input() public category: IStaffCategory[];
  @Input() public designation: IDesignation[];
  @Input() public staffGroup: any[];
  @Input() public forEmployee: IPeople[];

  @Output() cancelClick = new EventEmitter<any>();

  specificType$: Observable<ISelectOption[]>;
  specificStructure$: Observable<ISelectOption[]>;
  costCenter$: Observable<ISelectOption[]>;
  specificType=[];
  specificStructure=[];
  costCenter=[];

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['data']) {
    //   this.fs.init(this.data);
    // }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }

  }
  isProcessing$: Observable<boolean>;
  constructor(
    public fs: WorkflowMapAltEditorService,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatch();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingAltWorkflowMap));
      this.specificType$= this.store.pipe(select(getSpecificType));
      this.specificStructure$=this.store.pipe(select(getSpecificStructure));
      this.costCenter$=this.store.pipe(select(getCostCenter));
      this.specificType$.subscribe(result => {
        // console.log('type', result);
        this.specificType = this.utilService.transformToSelectDataList(result,'analysis_id','description');
      });
    }

    storeDispatch(){
    this.store.dispatch(new LoadSpecificType());
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      this.fs.patch({
        ruletype:this.ruleType,
      });
      console.log('form value', this.fs.value);
      if (this.fs.valid) {
        this.store.dispatch(new ProcessingWorkflowAlternates());
        this.store.dispatch(new SaveWorkflowAlternates({data: this.fs.value,ruleType:this.ruleType, editMode: this.inEditMode()}));
      }
      else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingWorkflowAlternates());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      // this.fs.init(this.data);
    }

  onWork($event){
    console.log('event from console workdef', $event.value);
  }

  onStructure($event){
    this.store.dispatch(new LoadSpecificStructure({Id:$event.value}));
    this.specificStructure$.subscribe(result => {
      this.specificStructure = this.utilService.transformToSelectDataList(result,'analysis_det_id','description');
    });
  }

  onStructureDetail($event){
  this.store.dispatch(new LoadCostCenter({analysis_det_id:$event.value}));
  this.costCenter$.subscribe(result => {
    this.costCenter = this.utilService.transformToSelectDataList(result,'analysis_det_id','description');
  });
  }
}







