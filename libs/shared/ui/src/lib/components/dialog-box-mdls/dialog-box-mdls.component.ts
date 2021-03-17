import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-uikit-pro-standard';


@Component({
  selector: 'x365-shared-ui-dialog-box-mdls',
  templateUrl: './dialog-box-mdls.component.html',
  styleUrls: ['./dialog-box-mdls.component.scss']
})
export class DialogBoxMdlsComponent implements OnInit {

  message = 'Are you sure you want to delete this ?';
  @Input() public show: boolean;
  @ViewChild('frame') public showModalOnClick: ModalDirective;

  constructor() { }

  ngOnInit() {
    // this.showModalOnClick.show();
  }

  onCommand1Click() {

  }

  onCommand2Click() {

  }


}
