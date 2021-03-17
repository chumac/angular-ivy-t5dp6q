import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError, ExternalLookupService } from '@nutela/core-services';
import { EventDetailEditorService } from './event-detail-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { IEventDetailData, ICourse, IEventDetailType, IEventDetailFaculty } from '@nutela/models/talent/learning';
import { ILearningState, ProcessingEventDetail, SaveEventDetail, AddEventDetail, getEventDetailData, HideEditorEventDetail } from '../../../../../store';

@Component({
  selector: 'x365-fm-talent-event-detail-editor',
  templateUrl: './event-detail-editor.component.html',
  styleUrls: ['./event-detail-editor.component.scss'],
  providers: [EventDetailEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EventDetailEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IEventDetailData;
  @Input() public courseData: ICourse;
  @Input() public eventDetailType: IEventDetailType;
  @Input() public eventDetailFaculty: IEventDetailFaculty;
  @Input() public selectOptionData: ISelectOptionData;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  EventDetailDataList$: Observable<IEventDetailData[]>;
  showHidePay: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, private externalLookupService: ExternalLookupService,
    public fs: EventDetailEditorService, private store: Store<ILearningState>) {
    super();
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
    if(this.fs.value != null){
      this.showHidePay = this.fs.value.use_kudos;
    }
    else{
      this.showHidePay = this.data.use_kudos;
    }
    
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event) { }

  onSubmit() {
    if (this.fs.valid) {
      if (this.inEditMode()) {
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingEventDetail());
        this.store.dispatch(new SaveEventDetail({ data: <IEventDetailData>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      } else {
        this.store.dispatch(new ProcessingEventDetail());
        this.store.dispatch(new AddEventDetail({ data: <IEventDetailData>this.fs.value }));
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
    this.store.dispatch(new HideEditorEventDetail());
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

  onKudosChange(isKudos) {
    this.showHidePay;
    if (!isKudos) {
      this.fs.patch({ kudos_pay: 0 });
      this.fs.patch({ kudos_receipt: 0 });
    }
  }

  setFieldvalue(data: IEventDetailData) {
    this.fs.patch({ use_kudos: data.use_kudos });
  }

  setFieldvalueOnAdd() {
    this.fs.patch({ use_kudos: false });
    this.showHidePay = false;
  }

} 
