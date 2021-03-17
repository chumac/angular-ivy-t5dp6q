import { Component, OnInit, Input, Inject } from '@angular/core';

import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs/internal/Subject';
import { DOCUMENT } from '@angular/common';
import { DialogBoxService } from '../../services';

export enum DialogBoxCommandTypes {
  COMMAND1 = 'COMMAND1',
  COMMAND2 = 'COMMAND2',
  CANCEL = 'CANCEL'
}

@Component({
  selector: 'x365-shared-ui-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  message = '';

  @Input() command1Text: string;
  @Input() command2Text: string;
  @Input() showCancelButton = false;

  action: Subject<any> = new Subject();

  constructor(public modalRef: MDBModalRef, @Inject(DOCUMENT) private document: Document ) {
    // this.dialogBoxService.dialogBoxComponent$.subscribe(res => {
    //   this.toggleModalOpenClass()
    // })
  }

  ngOnInit() { }

  closeModal() {
    this.action.next(DialogBoxCommandTypes.CANCEL);
    // this.modalRef.hide();
    this.forceCloseModal();
  }

  onCommand1Click() {
    this.action.next(DialogBoxCommandTypes.COMMAND1);
    // this.modalRef.hide();
    this.forceCloseModal();
  }

  onCommand2Click() {
    this.action.next(DialogBoxCommandTypes.COMMAND2);
    // this.modalRef.hide();
    this.forceCloseModal();
  }

  forceCloseModal() {
    this.document.body.classList.toggle('modal-open');
    let container = document.querySelector('mdb-modal-container');
    let backdrop = document.querySelector('mdb-modal-backdrop');
    container.parentNode.removeChild(container);
    console.log('modal-backdrop', document.querySelectorAll('modal-backdrop'))
    backdrop.classList.remove("modal-backdrop");
    // backdrop.parentNode.removeChild(backdrop);

    // backdrop.classList.remove("show");
  }

  toggleModalOpenClass() {
    console.log('hello world')
    this.document.body.classList.toggle('modal-open');
  }
}
