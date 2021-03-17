import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IObjectiveMasterDto } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { HideViewerLoadObjectives, HideViewerManageObjectives, HideViewerObjectiveApproval } from '../../../store';

@Component({
  selector: 'x365-fm-talent-objective-master-viewer',
  templateUrl: './objective-master-viewer.component.html',
  styleUrls: ['./objective-master-viewer.component.scss']
})
export class ObjectiveMasterViewerComponent implements OnInit {

  public sharingComponents = ['manage-objectives', 'manage-review', 'objective-approval'];

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public componentName: string;

  @Input() public data: any;
  @Output() cancelClick = new EventEmitter<any>();

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
  }

  onDoneClicked() {
    this.cancelClick.emit();
  }

}
