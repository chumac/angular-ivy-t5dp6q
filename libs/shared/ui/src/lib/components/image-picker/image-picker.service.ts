import { Injectable, OnDestroy } from '@angular/core';
import { MDBModalService, MDBModalRef } from "ng-uikit-pro-standard";
import { PictureCropperComponent } from '../picture-cropper/picture-cropper.component';
import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';

@Injectable()
export class ImagePickerService implements OnDestroy {
  modalRef: MDBModalRef;

  constructor(private modalService: MDBModalService) {}

  showModal(): MDBModalRef {
    this.modalRef = this.modalService.show(PictureCropperComponent, this.config());
    return this.modalRef;
  }

  config(): any {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      animated: true
    };
  }

  setCropperHeaderMessage(message: string) {
    this.modalRef.content.uploadHeaderMessage = message;
  }

  setCropperButtonLabels(labels: {selectText: string; changeText: string; previewText: string;}) {
    this.modalRef.content.uploadButtonLabels = labels;
  }

  getImageDataFromCropper(): Observable<any> {
    return new Observable(observer => {
      let imageDataObserver = this.modalRef.content.imageData;
      imageDataObserver.pipe(take(1)).subscribe(
        (imgData: any) => {
          observer.next(imgData);
        }
      );
    });
  }

  setCropperImage(blob: any) {
    this.modalRef.content.recroppedImage = blob;
  }

  ngOnDestroy() {

  }

}
