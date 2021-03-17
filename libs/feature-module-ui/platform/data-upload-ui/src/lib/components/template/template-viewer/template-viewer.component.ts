import { Component, OnInit, Input } from '@angular/core';
import { ITemplateImport } from '@nutela/models/platform/data-upload';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IDataUploadState } from '../../../store/root';
import { HideViewerUpload } from '../../../store/upload';

@Component({
  selector: 'x365-fm-plf-dataupload-template-viewer',
  templateUrl: './template-viewer.component.html',
  styleUrls: ['./template-viewer.component.scss']
})
export class TemplateViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ITemplateImport;
  @Input() public temp:string;
  upload:any;

  constructor(public utilService: UtilService, private store: Store<IDataUploadState>,) {}

  ngOnInit() {  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerUpload());
  }

  formatUploadTemplate(){
    if(this.temp){
      this.upload=this.temp.split(',');
      console.log('arr', this.upload);
    }
  }
}


