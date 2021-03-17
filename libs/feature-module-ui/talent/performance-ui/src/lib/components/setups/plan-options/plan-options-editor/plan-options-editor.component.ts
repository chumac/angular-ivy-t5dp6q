import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { PlanOptionsEditorService } from './plan-options-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IPlanOption, IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingPlanOption, ProcessingPlanOption, SavePlanOption, AddPlanOption, getPlanListPlanOption, LoadPlanListPlanOption } from '../../../../store';
import { ISelectOption } from '@nutela/models/core-data';


@Component({
  selector: 'x365-fm-talent-plan-options-editor',
  templateUrl: './plan-options-editor.component.html',
  styleUrls: ['./plan-options-editor.component.scss'],
  providers: [PlanOptionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PlanOptionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPlanOption;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  planList$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: PlanOptionsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPlanOption));
    this.planList$ = this.store.pipe(select(getPlanListPlanOption));
    this.store.dispatch(new LoadPlanListPlanOption());
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
        this.store.dispatch(new ProcessingPlanOption());
        this.store.dispatch(new SavePlanOption({data: <IPlanOption>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingPlanOption());
        this.store.dispatch(new AddPlanOption({data: <IPlanOption>this.fs.value }));
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
