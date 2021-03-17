import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IContractPageDefinition } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerContractPageDefinition } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-contract-page-definitions-viewer',
  templateUrl: './contract-page-definitions-viewer.component.html',
  styleUrls: ['./contract-page-definitions-viewer.component.scss']
})
export class ContractPageDefinitionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IContractPageDefinition;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerContractPageDefinition());
  }
  
}
