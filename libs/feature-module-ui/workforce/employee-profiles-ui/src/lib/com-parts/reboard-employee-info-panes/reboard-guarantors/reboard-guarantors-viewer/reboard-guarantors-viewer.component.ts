
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IGuarantor } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'x365-fm-workforce-reboard-guarantors-viewer',
  templateUrl: './reboard-guarantors-viewer.component.html',
  styleUrls: ['./reboard-guarantors-viewer.component.scss']
})
export class ReboardGuarantorsViewerComponent implements OnInit {
  approvalPhoto$: Observable<any>;
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGuarantor;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  @Output() public cancelClick: EventEmitter<any> = new EventEmitter();

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
