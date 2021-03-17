import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { CustomProcessMapsEditorService } from './custom-process-maps-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import * as constants from '../../../../constants';
import { ISelectOption, IBasicData } from '@nutela/models/core-data';
import { ICustomProcessMap, ICustomFormEligibility, IProcessFormArea, ICustomForm } from '@nutela/models/workforce/employee-profiles';
import { isProcessingCustomProcessMap, ProcessingCustomProcessMap, SaveCustomProcessMap, AddCustomProcessMap, NotProcessingCustomProcessMap, LoadRolesCustomProcessMap, LoadPermissionsCustomProcessMap, getProcessFormRoles, getProcessFormEmpPermissions, LoadCustomFormListCustomProcessMap, getProcessFormCustomFormList } from '../../../../store/processes/custom-process-map';
import { IAppState } from '@nutela/store/app-state';
import { IWorkDefinition } from '@nutela/models/foundation';
import { getCustomFormEligibilityList, getCustomFormWorkFlowList, getCustomFormData, LoadDataCustomForm } from '../../../../store/processes/custom-form';
import { ActivatedRoute } from '@angular/router';
import { PROCESS_FORM_ACCESS, PROCESS_FORM_ROLE } from '../../../../constants';


@Component({
  selector: 'x365-fm-workforce-custom-process-maps-editor',
  templateUrl: './custom-process-maps-editor.component.html',
  styleUrls: ['./custom-process-maps-editor.component.scss'],
  providers: [CustomProcessMapsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CustomProcessMapsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICustomProcessMap;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  customFormList$: Observable<ICustomForm[]>;
  workFlowList$: Observable<IWorkDefinition[]>;
  rolesList$: Observable<IBasicData[]>;
  permissionsList$: Observable<IBasicData[]>;
  role = PROCESS_FORM_ROLE;
  permission = PROCESS_FORM_ACCESS;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(private route: ActivatedRoute, public utilService: UtilService, public fs: CustomProcessMapsEditorService, private store: Store<IAppState>) { 
    super();
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadRolesCustomProcessMap());
    this.store.dispatch(new LoadPermissionsCustomProcessMap());
    this.store.dispatch(new LoadCustomFormListCustomProcessMap());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomProcessMap));
    this.workFlowList$ = this.store.pipe(select(getCustomFormWorkFlowList));
    this.rolesList$ = this.store.pipe(select(getProcessFormRoles));
    this.permissionsList$ = this.store.pipe(select(getProcessFormEmpPermissions));
    this.customFormList$ = this.store.pipe(select(getProcessFormCustomFormList));
  }


  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    const processId = +this.route.snapshot.paramMap.get('id');
    this.fs.processId.setValue(processId);
    this.fs.hasComment.setValue(false);
    this.fs.hasAttachment.setValue(false);
    if(this.fs.role.value === this.role.employee) {
      this.fs.empPermission.setValue(this.permission.notApplicable);
    }
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingCustomProcessMap());
        this.store.dispatch(new SaveCustomProcessMap({data: <ICustomProcessMap>this.fs.value, recordId: recordId, processId: processId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingCustomProcessMap());
        this.store.dispatch(new AddCustomProcessMap({data: <ICustomProcessMap>this.fs.value, processId: processId }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
