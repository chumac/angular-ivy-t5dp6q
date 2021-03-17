
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IDisciplinaryActionTransaction, ISeparation } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../../store';

@Component ({
  selector: 'x365-fm-workforce-separation-viewer',
  templateUrl: './separation-viewer.component.html',
  styleUrls: ['./separation-viewer.component.scss']
})
export class SeparationViewerComponent implements OnInit {


  @Input() public show: boolean;
  @Input() public isPending: boolean;
  @Input() public hideValues: boolean;
  @Input() public width: number;
  @Input() public data: ISeparation;
  @Input() public dataDoc: any;
  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
