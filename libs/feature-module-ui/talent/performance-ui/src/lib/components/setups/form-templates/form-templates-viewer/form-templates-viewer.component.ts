import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IFormTemplate } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerFormTemplate } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-form-templates-viewer',
  templateUrl: './form-templates-viewer.component.html',
  styleUrls: ['./form-templates-viewer.component.scss']
})
export class FormTemplatesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IFormTemplate;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerFormTemplate());
  }
  
}
