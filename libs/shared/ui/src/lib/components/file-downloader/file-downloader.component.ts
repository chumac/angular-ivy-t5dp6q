import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'x365-shared-ui-file-downloader',
  templateUrl: './file-downloader.component.html',
  styleUrls: ['./file-downloader.component.scss']
})
export class FileDownloaderComponent implements OnInit {
  @Input() public data: any;
  @Input() public htmlDoc: string;
  @Input() public htmlName: string;
  @Input() public showText: boolean = true;
  @Input() public useIcon: boolean = false;
  @Input() public downloadIconTitle: string = 'Download file';

  constructor() {  }

  ngOnInit() {
  }

  download() {
    if (this.data) {
      console.log(this.data);
      window.open(this.data, '_blank');
    }
    if (this.htmlDoc) {
      this.downloadAsPDF()
    }
  }

  downloadAsPDF() {

    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true
      }
    }
    doc.fromHTML(this.htmlDoc, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    })

    doc.save(this.htmlName);
  }
}
