import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { IEventDetailPreRequisites, ICourse, IEventDetailPreRequisitesType } from '@nutela/models/talent/learning';
import { EventDetailPreRequisitesEditorService } from './event-detail-pre-requisites-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Observable } from 'rxjs/internal/Observable';
import { ILearningState, ProcessingPreRequisites, AddPreRequisites, SavePreRequisites } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-talent-event-detail-pre-requisites-editor',
  templateUrl: './event-detail-pre-requisites-editor.component.html',
  styleUrls: ['./event-detail-pre-requisites-editor.component.scss'],
  providers: [EventDetailPreRequisitesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailPreRequisitesEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  constructor(public utilService: UtilService, private store: Store<ILearningState>, public fs: EventDetailPreRequisitesEditorService) {
    super();
  }

  @Input() public width: number;
  @Input() public show: boolean;
  @Input() public eventDetailId: number;
  @Input() public data: IEventDetailPreRequisites;
  @Input() public PreRequisitesDataType: IEventDetailPreRequisitesType;
  @Input() public courseData: ICourse;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  preRequisitesList$: Observable<IEventDetailPreRequisites[]>;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']) {
      this.fs.init(this.data);
    }
  }



  ngOnInit() {
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

  onFileSelected($event) { }

  onSubmit() {
    if (!this.inEditMode()) {
      this.fs.form.controls['event_id'].setValue(this.eventDetailId);
    }
    if (this.fs.valid) {
      if (this.inEditMode()) {
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingPreRequisites());
        this.store.dispatch(new SavePreRequisites({ data: <IEventDetailPreRequisites>this.fs.value, recordId: recordId, editMode: this.inEditMode(), eventDetailId: this.eventDetailId }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      } else {
        this.store.dispatch(new ProcessingPreRequisites());
        this.store.dispatch(new AddPreRequisites({ data: <IEventDetailPreRequisites>this.fs.value, eventDetailId: this.eventDetailId }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
