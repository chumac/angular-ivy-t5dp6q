import { Component, OnInit, Input } from '@angular/core';
import { IUpload } from '@nutela/models/platform/data-upload';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IDataUploadState } from '../../../store/root';
import { HideViewerUpload } from '../../../store/upload';

@Component({
  selector: 'x365-fm-plf-dataupload-uploads-viewer',
  templateUrl: './uploads-viewer.component.html',
  styleUrls: ['./uploads-viewer.component.scss']
})
export class UploadsViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IUpload;

  constructor(public utilService: UtilService, private store: Store<IDataUploadState>,) {}

  ngOnInit() {  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerUpload());
  }
}

