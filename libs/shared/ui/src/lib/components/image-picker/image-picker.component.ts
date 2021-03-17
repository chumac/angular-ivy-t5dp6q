import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter, Inject } from '@angular/core';
import { ImagePickerService } from './image-picker.service';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { IDocMaxSize } from '@nutela/models/core-data';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { selectMaxDocSize } from '@nutela/store/modules/foundation';

const DEFAULT_CROPPER_BUTTON_LABELS = {
  selectText: 'Select Photo',
  changeText: 'Change Photo',
  previewText: 'Preview Photo'
};

@Component({
  selector: 'x365-shared-ui-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  providers: [ImagePickerService],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('image') image: ElementRef;
  public imageUploaded: boolean;
  public selectedImageSrc: any;
  docMaxSize$: Observable<IDocMaxSize>;

  @Input() defaultMode: boolean;
  @Input() caption: string;
  @Input() captionSubText: string;
  @Input() imagePickerLabel: string;
  @Input() cropperHeaderMessage: string;
  @Input() cropperButtonLabels: ICropperButtonLabels = DEFAULT_CROPPER_BUTTON_LABELS;
  @Input() maxImageSize: number;

  @Output() imageSelected = new EventEmitter<any>();
  @Output() imageOversize = new EventEmitter<any>();

  @Output() fileRemoved = new EventEmitter<IImageData>();

  constructor(private imagePickerService: ImagePickerService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.imageUploaded = false;
    this.docMaxSize$ = this.store.pipe(select(selectMaxDocSize))
  }

  getSelectedImageAttributes(): any {
    const value = {
      imageSource: this.image.nativeElement.dataset.src,
      imageSize: this.image.nativeElement.dataset.size
    }

    return value;
  }

  removeFile() {
    this.selectedImageSrc = null;
    this.imageUploaded = false;

    let image: IImageData = {
      data: '',
      fileExt: '',
      mimeType: '',
      size: 0,
      maxSize: 0,
      oversized: null
    };

    this.fileRemoved.emit(image);
  }

  showModal() {
    this.imagePickerService.showModal();

    this.imagePickerService.setCropperHeaderMessage(this.cropperHeaderMessage);
    this.imagePickerService.setCropperButtonLabels(this.cropperButtonLabels);

    if (this.image !== undefined) {
      const recroppedImageSrc = this.image.nativeElement.dataset.src;
      this.imagePickerService.setCropperImage(recroppedImageSrc);
    } else {
      this.imagePickerService.setCropperImage(null);
    }

    this.imagePickerService.getImageDataFromCropper().subscribe((img: any) => {
        if (img.data !== '') {
          this.selectedImageSrc = img.data;
          this.imageUploaded = true;

          const size = img.size
          const data = this.getDataURLWithoutMimeType(img.data);
          const mimeType = img.mimeType;
          const fileExt = img.fileExt

          let image: IImageData = {
            data: data,
            fileExt: fileExt,
            mimeType: mimeType,
            size: size,
            maxSize: this.maxImageSize,
            oversized: size > this.maxImageSize
          };

          this.imageSelected.emit(image);
        } else {
          this.selectedImageSrc = null;
          this.imageUploaded = false;
        }
      }
    );
  }

  private getDataURLWithoutMimeType(value: string): any {
    const index = value.indexOf(',');
    return value.slice(index + 1);
  }

  getSelectedImage(data: any): any {
    return `url(${data})`;
  }

  showSecondModalOption() {
    this.imagePickerService.showModal();
  }
}

export interface IImageData {
  data: any,
  fileExt: string,
  mimeType: string,
  size: number,
  maxSize: number,
  oversized: boolean
}

interface ICropperButtonLabels {
  selectText: string;
  changeText: string;
  previewText: string;
};
