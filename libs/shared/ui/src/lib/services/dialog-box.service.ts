import { Injectable, Inject } from "@angular/core";
import { MDBModalService } from "ng-uikit-pro-standard";
import { Subject } from "rxjs/internal/Subject";
import { DialogBoxComponent, DialogBoxMdlsComponent } from "../components";
import { DOCUMENT } from "@angular/common";

@Injectable()
export class DialogBoxService {

  // private dialogBoxComponentSource = new Subject<boolean>();

  // // Observable string streams
  // dialogBoxComponent$ = this.dialogBoxComponentSource.asObservable();
  constructor(private modalService: MDBModalService, @Inject(DOCUMENT) private document: Document,) {}

  show(message: string, mode = DialogBoxModes.MODAL): Subject<any> {
    let modalRef = null;

    if (mode === DialogBoxModes.MODAL) {
      modalRef = this.modalService.show(DialogBoxComponent, this.modalConfig());
      modalRef.content.message = message;
      this.addBackDrop();
    } else {
      modalRef = this.modalService.show(DialogBoxMdlsComponent, this.modalessConfig());
      modalRef.content.message = message;
      this.addBackDrop();
    }

    return modalRef.content.action;
  }

  showCustom(message: string, content: any, mode = DialogBoxModes.MODAL): Subject<any> {
    let modalRef = null;

    if (mode === DialogBoxModes.MODAL) {
      modalRef = this.modalService.show(content, this.modalConfig());
    } else {
      modalRef = this.modalService.show(content, this.modalessConfig());
    }

    modalRef.content.message = message;
    this.addBackDrop();

    return modalRef.content.action;
  }

  modalConfig(): any {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      animated: true
    };
  }

  modalessConfig(): any {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      animated: true
    };
  }

  addBackDrop() {
    this.document.body.classList.add('modal-open');
    let backdrop = document.querySelector('mdb-modal-backdrop');
    backdrop.classList.add("modal-backdrop");
  }


  alertComponent() {
    // this.dialogBoxComponentSource.next(); // emit event
  }

}

export enum DialogBoxModes {
  MODAL = 'MODAL',
  MODALESS = 'MODALESS'
}
