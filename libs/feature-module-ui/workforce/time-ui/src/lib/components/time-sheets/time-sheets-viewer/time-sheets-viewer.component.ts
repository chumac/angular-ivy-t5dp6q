import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITimeSheetData } from '@nutela/models/workforce/time-sheet';
import { UtilService } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-workforce-time-time-sheets-viewer',
  templateUrl: './time-sheets-viewer.component.html',
  styleUrls: ['./time-sheets-viewer.component.scss']
})
export class TimeSheetsViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITimeSheetData;
  @Output() cancelClick = new EventEmitter<any>();
  constructor(public utilService: UtilService, ) { }

  ngOnInit() {
  }

  onDoneClicked() {
    this.cancelClick.emit(true);
  }

}
