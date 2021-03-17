import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { IEventDetailAssets, IEventDetailAssetType, IEventDetailAssetAvaiability } from '@nutela/models/talent/learning';
import { EventDetailAssetsEditorService } from './event-detail-assets-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Observable } from 'rxjs/internal/Observable';
import { ILearningState, ProcessingAssets, SaveAssets, AddAssets } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { BaseFormComponent, ToastTypes, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { FilePickerComponent } from '@nutela/shared/ui';

@Component({
  selector: 'x365-fm-talent-event-detail-assets-editor',
  templateUrl: './event-detail-assets-editor.component.html',
  styleUrls: ['./event-detail-assets-editor.component.scss']
})
export class EventDetailAssetsEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  constructor(public utilService: UtilService, private store: Store<ILearningState>, public fs: EventDetailAssetsEditorService) {
    super();
  }

  @Input() public width: number;
  @Input() public show: boolean;
  @Input() public eventDetailId: number;
  @Input() public AssetsDataAvailable: IEventDetailAssetAvaiability;
  @Input() public AssetsDataType: IEventDetailAssetType;
  @Input() public data: IEventDetailAssets;
  @Output() cancelClick = new EventEmitter<any>();
  @ViewChild('filePicker') filePicker: FilePickerComponent;
  format: any;
  url: any;
  isVideo = false;

  isProcessing$: Observable<boolean>;
  AssetsList$: Observable<IEventDetailAssets[]>;

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

  onEventTypeSelect(event) {
    if (event.value === 1) {
      this.isVideo = true;
    } else {
      this.isVideo = false;
    }
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        asset_filename_upload: data.content,
      });
      this.fs.patch({
        asset_filename: data.name,
      });
      this.fs.patch({
        asset_ext: data.extension,
      });
      this.fs.patch({
        asset_size: data.size,
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved() {
    this.fs.patch({
      asset_filename: null,
    });
    this.fs.patch({
      asset_filename_upload: null,
    });
    this.fs.patch({
      asset_ext: null,
    });
    this.fs.patch({
      asset_size: null,
    });
  }

  onVideoUpload($event) {
    const file = $event.target.files && $event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      } else {
        this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported, Please upload only video format', type: ToastTypes.ERROR }));
        return false;
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        const index = this.url.indexOf(',');
        this.url = this.url.slice(index + 1);

        this.fs.patch({
          asset_filename_upload: this.url,
        });
        this.fs.patch({
          asset_filename: $event.target.files[0].name,
        });
        this.fs.patch({
          asset_ext: $event.target.files[0].name.substr(($event.target.files[0].name.lastIndexOf('.') + 1)),
        });
        this.fs.patch({
          asset_size: $event.target.files[0].size,
        });
      }
    }
    console.log(this.fs);
  }

  onSubmit() {
    if (!this.inEditMode()) {
      this.fs.form.controls['event_id'].setValue(this.eventDetailId);
    }
    if (this.fs.valid) {
      if (this.inEditMode()) {
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingAssets());
        this.store.dispatch(new SaveAssets({ data: <IEventDetailAssets>this.fs.value, recordId: recordId, editMode: this.inEditMode(), eventDetailId: this.eventDetailId }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      } else {
        this.store.dispatch(new ProcessingAssets());
        this.store.dispatch(new AddAssets({ data: <IEventDetailAssets>this.fs.value, eventDetailId: this.eventDetailId }));
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
