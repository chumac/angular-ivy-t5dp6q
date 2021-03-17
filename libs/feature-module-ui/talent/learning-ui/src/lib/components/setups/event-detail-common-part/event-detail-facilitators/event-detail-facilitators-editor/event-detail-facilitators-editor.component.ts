import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { IEventDetailFacilitators, ICourse, IEventDetailFacilitatorsType } from '@nutela/models/talent/learning';
import { EventDetailFacilitatorsEditorService } from './event-detail-facilitators-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Observable } from 'rxjs/internal/Observable';
import { ILearningState, ProcessingFacilitators, AddFacilitators, SaveFacilitators } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-talent-event-detail-facilitators-editor',
  templateUrl: './event-detail-facilitators-editor.component.html',
  styleUrls: ['./event-detail-facilitators-editor.component.scss'],
  providers: [EventDetailFacilitatorsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailFacilitatorsEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  constructor(public utilService: UtilService, private store: Store<ILearningState>, public fs: EventDetailFacilitatorsEditorService) {
    super();
  }

  @Input() public width: number;
  @Input() public show: boolean;
  @Input() public eventDetailId: number;
  @Input() public data: IEventDetailFacilitators;
  @Input() public FacilitatorsTypeData: IEventDetailFacilitatorsType;
  @Input() public courseData: ICourse;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  FacilitatorsList$: Observable<IEventDetailFacilitators[]>;

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

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        doc_filename_upload: data.content,
      });
      this.fs.patch({
        doc_filename: data.name,
      });
      this.fs.patch({
        doc_size: data.size,
      });
      this.fs.patch({
        doc_ext: data.extension,
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved() {
    this.fs.patch({
      doc_filename_upload: null,
    });
    this.fs.patch({
      doc_filename: null,
    });
    this.fs.patch({
      doc_size: null,
    });
    this.fs.patch({
      doc_ext: null,
    });
  }

  onImageSelected(data) {

    console.log(data);
    var d = new Date();
    var n = d.getTime();

    if (data) {
      this.fs.patch({
        img_filename_upload: data.data,
      });
      this.fs.patch({
        img_filename: n+'.'+ data.fileExt,
      });
      this.fs.patch({
        img_size: data.size,
      });
      this.fs.patch({
        img_ext: data.fileExt,
      });
    }
  }

  onImageRemoved() {
    this.fs.patch({
      img_filename_upload: null,
    });
    this.fs.patch({
      img_filename: null,
    });
    this.fs.patch({
      img_size: null,
    });
    this.fs.patch({
      img_ext: null,
    });

  }

  onSubmit() {
    if (!this.inEditMode()) {
      this.fs.form.controls['event_id'].setValue(this.eventDetailId);
    }
    if (this.fs.valid) {
      if (this.inEditMode()) {
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingFacilitators());
        this.store.dispatch(new SaveFacilitators({ data: <IEventDetailFacilitators>this.fs.value, recordId: recordId, editMode: this.inEditMode(), eventDetailId: this.eventDetailId }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      } else {
        this.store.dispatch(new ProcessingFacilitators());
        this.store.dispatch(new AddFacilitators({ data: <IEventDetailFacilitators>this.fs.value, eventDetailId: this.eventDetailId }));
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
    this.onFileRemoved();
    this.onImageRemoved();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
