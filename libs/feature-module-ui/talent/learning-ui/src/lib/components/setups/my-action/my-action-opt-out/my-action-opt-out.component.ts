import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IEventEmployee, IManagerOptOutEvent } from '@nutela/models/talent/learning';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ILearningState, ManagerOptOutEvent, ProcessingMyAction } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Observable } from 'rxjs';
import { MyActionOptOutService } from './my-action-opt-out.service';

@Component({
  selector: 'x365-fm-talent-my-action-optout-editor',
  templateUrl: './my-action-opt-out.component.html',
  styleUrls: ['./my-action-opt-out.component.scss'],
  providers: [MyActionOptOutService],
})

export class MyActionOptOutComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public selectedEventId: number;
  @Input() public allEmployee: IEventEmployee;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor(public utilService: UtilService, public fs: MyActionOptOutService, private store: Store<ILearningState>) {
    super();
  }

  ngOnInit() {
  }

  onCancel() {
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event) { }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingMyAction());
      this.store.dispatch(new ManagerOptOutEvent({ data: <IManagerOptOutEvent>this.fs.value, recordId: this.selectedEventId }));
      this.reset();
      this.cancelClick.emit();
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
  }

  ngOnDestroy() {
  }

} 
