import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ObjectiveRecallService } from './objective-recall.service';
import { IPerformanceState, ProcessingLoadObjectives, isProcessingLoadObjectives, SaveLoadObjectives, ProcessingManageObjectives, RecallManageObjectives, isProcessingManageObjectives } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IObjectiveDto, IRecallObjective } from '@nutela/models/talent/performance';

@Component({
  selector: 'x365-fm-talent-objective-recall',
  templateUrl: './objective-recall.component.html',
  styleUrls: ['./objective-recall.component.scss'],
  providers: [ObjectiveRecallService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ObjectiveRecallComponent extends BaseFormComponent 
implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public planID: number;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  recallTypeOptions: { value: number, label: string }[] = [
    {value: 0, label:'Major Recall'},
    {value: 1, label:'Minor Recall'}
   ];


  constructor(public utilService: UtilService, public fs: ObjectiveRecallService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingManageObjectives));
  } 

  inEditMode(){}

  onCancel() {
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      
      this.fs.planID.setValue(this.planID);

      this.store.dispatch(new ProcessingManageObjectives());
      this.store.dispatch(new RecallManageObjectives({recallData: <IRecallObjective>this.fs.value }));

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
