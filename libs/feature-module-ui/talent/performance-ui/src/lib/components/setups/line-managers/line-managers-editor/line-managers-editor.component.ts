import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { LineManagersEditorService } from './line-managers-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ILineManager, IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingLineManager, ProcessingLineManager, SaveLineManager, AddLineManager, getLineManagerEmployeeList, getLineManagerPlanList, LoadEmployeeListLineManager } from '../../../../store';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-talent-line-managers-editor',
  templateUrl: './line-managers-editor.component.html',
  styleUrls: ['./line-managers-editor.component.scss'],
  providers: [LineManagersEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class LineManagersEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ILineManager;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  planList$: Observable<IPlan[]>;
  employeeList$: Observable<IPersonal[]>;
  lineManagerRoleOptions = constants.lineManagerRoleOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: LineManagersEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadEmployeeListLineManager());
  }

  storeSelects() {
    this.planList$ = this.store.pipe(select(getLineManagerPlanList));
    this.isProcessing$ = this.store.pipe(select(isProcessingLineManager));
    this.employeeList$ = this.store.pipe(select(getLineManagerEmployeeList));
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
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingLineManager());
        this.store.dispatch(new SaveLineManager({data: <ILineManager>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingLineManager());
        this.store.dispatch(new AddLineManager({data: <ILineManager>this.fs.value }));
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
