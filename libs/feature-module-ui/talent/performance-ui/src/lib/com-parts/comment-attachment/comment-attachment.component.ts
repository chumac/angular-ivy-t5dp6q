import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IImageData } from '@nutela/shared/ui';
import { GENERAL } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-talent-comment-attachment',
  templateUrl: './comment-attachment.component.html',
  styleUrls: ['./comment-attachment.component.scss']
})
export class CommentAttachmentComponent implements OnInit {
  @Input() blob: string;
  @Input() mimeType: string;
  @Input() extension: string;
  isImage: boolean;

  constructor(private utilService: UtilService) { }

  ngOnInit() { 
      switch (this.mimeType) {
        case 'image/jpeg':
          this.isImage = true;
          this.processImage();
            break;
        case 'image/png':
          this.isImage = true;
          this.processImage();
            break;
        default:
          this.isImage = false;
            break;
    }
  }

  processImage() {
    let image  = `${GENERAL.pngBase64Header}${this.blob}`;
    return image;
  }



}
