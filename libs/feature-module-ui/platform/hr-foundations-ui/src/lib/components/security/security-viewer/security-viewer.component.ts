import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { ISecurity } from '@nutela/models/foundation';
import { ISecurityState, HideViewerSecurity } from '../../../store/security';


@Component({
  selector: 'x365-fm-plf-hrf-security-viewer',
  templateUrl: './security-viewer.component.html',
  styleUrls: ['./security-viewer.component.scss']
})
export class SecurityViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ISecurity;

  constructor(public utilService: UtilService, private store: Store<ISecurityState>) { }

  ngOnInit() {
  }

  onDoneClicked() {
     this.store.dispatch(new HideViewerSecurity());
  }

}







 
  
