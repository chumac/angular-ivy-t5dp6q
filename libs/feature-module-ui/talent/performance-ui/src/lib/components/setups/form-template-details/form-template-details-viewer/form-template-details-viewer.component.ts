import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IFormTemplateDetail } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerFormTemplateDetail } from '../../../../store';
import * as constants from '../../../../constants';



@Component({
  selector: 'x365-fm-talent-form-template-details-viewer',
  templateUrl: './form-template-details-viewer.component.html',
  styleUrls: ['./form-template-details-viewer.component.scss']
})
export class FormTemplateDetailsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IFormTemplateDetail;
  permOptions = constants.permOptions;


  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerFormTemplateDetail());
  }
  
}
