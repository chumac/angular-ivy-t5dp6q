import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject, from, of } from 'rxjs';
import { ImageCroppedEvent, } from 'ngx-image-cropper';
import { DOCUMENT } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IAppState } from '@nutela/store/app-state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'x365-shared-ui-picture-cropper',
  templateUrl: './picture-cropper.component.html',
  styleUrls: ['./picture-cropper.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class PictureCropperComponent implements OnInit {
  uploadHeaderMessage: string;
  uploadButtonLabels: ICropperButtonLabels;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  recroppedImage: any;
  reselectMode = false;
  entranceAnimation = false;
  exitAnimation = false;
  animationClasses = '';
  fileExt: string;
  imageData: Subject<any> = new Subject();

  @ViewChild('image') image: ElementRef;

  public previewMode = false;
  hideModal: boolean = false;

  constructor(public modalRef: MDBModalRef, private el: ElementRef,  @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private store: Store<IAppState>) {}

  ngOnInit() {}


  fileChangeEvent(event: any): void {
    const imgIsValid = event.target.value.endsWith('jpg')
      || event.target.value.endsWith('jpeg')
      || event.target.value.endsWith('png')
      || event.target.value.endsWith('bmp');
    if (event.target.value !== '' && imgIsValid) {
      this.reselectMode = true;
      this.imageChangedEvent = event;
    } else {
      this.store.dispatch(new ShowToast({
        title: 'Correct the following Errors',
        message: 'The Image selected is not valid',
        type: ToastTypes.ERROR
      }))
    }
  }

  triggerFileChange() {
    this.image.nativeElement.click();
   }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  toggleEntranceAnimation() {
    this.entranceAnimation = true;
    if (this.entranceAnimation) {
      this.animationClasses = 'animated fadeInLeft';
    }
    this.resetAnimation(this.entranceAnimation);
  }

  toggleExitAnimation() {
    this.exitAnimation = true;
    if (this.entranceAnimation) {
      this.animationClasses = 'animated fadeInRight';
    }
    this.resetAnimation(this.exitAnimation);
  }

  resetAnimation(animation: boolean) {
    setTimeout(() => {
      animation = false;
      this.animationClasses = '';
    }, 1000);
  }

  onPreviewClick() {
    this.fileExt = this.image.nativeElement.value.split('.').pop();
    if (this.croppedImage !== '') {
      this.previewMode = true;
      this.toggleEntranceAnimation();
    } else {
      this.previewMode = false;
    }
  }

  onGoBack() {
    this.previewMode = false;
    this.toggleExitAnimation();
  }

  async onSelect() {
    if (this.croppedImage !== '') {

      const data = this.croppedImage;

      const blobAttr = await fetch(this.croppedImage)
        .then(result => result.blob())
        .then(blob => blob);

        let fileExt: string;


        if (this.recroppedImage !== null && !this.reselectMode) {
          const fileExtRE = /\w+(?=;)/gi;
          fileExt = fileExtRE.exec(this.recroppedImage)[0];
        } else {
          if (this.previewMode) {
            fileExt = this.fileExt;
          } else {
            fileExt = this.image.nativeElement.value.split('.').pop();
          }
        }

      this.imageData.next({
        data: data,
        fileExt: fileExt,
        mimeType: blobAttr.type,
        size: blobAttr.size
      });
      // this.forceCloseModal();
      this.modalRef.hide();
    } else {
      this.store.dispatch(new ShowToast({
        title: 'Correct the following Errors',
        message: 'You may not have selected any image or may have selected an invalid image',
        type: ToastTypes.ERROR
      }))
    }
  }

  onClear() {
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }

  onCancel() {
    // this.forceCloseModal();
    this.modalRef.hide();
  }

  forceCloseModal() {
    this.document.body.classList.remove('modal-open');
    let container = document.querySelector('mdb-modal-container');
    let backdrop = document.querySelector('mdb-modal-backdrop');
    container.parentNode.removeChild(container);
    backdrop.classList.remove("modal-backdrop");
    backdrop.parentNode.removeChild(backdrop);
  }

}


interface ICropperButtonLabels {
  selectText: string;
  changeText: string;
  previewText: string;
};
