
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IDisciplinaryActionTransaction } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../../store';

@Component ({
  selector: 'x365-fm-workforce-disciplinary-action-viewer',
  templateUrl: './disciplinary-action-viewer.component.html',
  styleUrls: ['./disciplinary-action-viewer.component.scss']
})
export class DisciplinaryActionViewerComponent implements OnInit {


  @Input() public show: boolean;
  @Input() public isPending: boolean;
  @Input() public hideValues: boolean;
  @Input() public width: number;
  @Input() public data: IDisciplinaryActionTransaction;
  @Input() public dataDoc: any;
  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
