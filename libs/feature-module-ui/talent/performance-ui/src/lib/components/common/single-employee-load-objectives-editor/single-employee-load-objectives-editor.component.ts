import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { SingleEmployeeLoadObjectivesEditorService } from './single-employee-load-objectives-editor.service';
import { IPerformanceState, ProcessingLoadObjectives, isProcessingLoadObjectives, SaveLoadObjectives, ProcessingManageObjectives, SaveManageObjectives } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IObjectiveDto, IObjectiveMasterDto } from '@nutela/models/talent/performance';
import * as constants from '../../../constants/common';
import { ProcessingSingleEmployeeLoadObjectives, SaveSingleEmployeeLoadObjectives, isProcessingSingleEmployeeLoadObjectives } from '../../../store/planning';

@Component({
  selector: 'x365-fm-talent-single-employee-load-objectives-editor',
  templateUrl: './single-employee-load-objectives-editor.component.html',
  styleUrls: ['./single-employee-load-objectives-editor.component.scss'],
  providers: [SingleEmployeeLoadObjectivesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class SingleEmployeeLoadObjectivesEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public filename: string;
  @Input() public employeeId: number;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  targetTypeOptions = constants.targetTypeOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: SingleEmployeeLoadObjectivesEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingSingleEmployeeLoadObjectives));
  }

  inEditMode(){}

  onCancel() {
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingSingleEmployeeLoadObjectives());
      this.store.dispatch(new SaveSingleEmployeeLoadObjectives({objectiveData: <IObjectiveDto>this.fs.value, employeeID: this.employeeId}));

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
