import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as jsPDF from 'jspdf';
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-shared-ui-preview-file-picker',
  templateUrl: './preview-file-picker.component.html',
  styleUrls: ['./preview-file-picker.component.scss']
})
export class PreviewFilePickerComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput>;
  file: UploadFile | any;
  previewHolder: string;

  constructor(public domSanitizationService: DomSanitizer, private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  onFileSelect(output: UploadOutput | any): void {
    let reader = new FileReader();
    let ref = this;
    if (output.type === 'addedToQueue') {
      this.file = output.file; // add file to array when added
      console.log('selected event: ', output);
      // this.file.nativeFile.text().then((e)=>{
      //   console.log('selected event text: ', e);
      //   let base64Binary = btoa(unescape(encodeURIComponent(e)));
      //   console.log('selected event text b64: ', base64Binary);
      //   this.preview(base64Binary);

      // });

      reader.onload = function(e) {
        // binary data
        console.log('reading', e.target.result);
        ref.preview(e.target.result);
      };
      reader.onerror = function(e) {
        // error occurred
        console.log('Error : ' + e.type);
      };
      reader.readAsDataURL(this.file.nativeFile);
    }
  }

  preview(base64Binary: any) {
    this.previewHolder = `data:image/jpeg;base64,${base64Binary}`;
    this.cd.markForCheck();
    console.log('preview: ', this.previewHolder);
  }
}
