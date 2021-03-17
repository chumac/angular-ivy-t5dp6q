import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from '@nutela/core-services';
import { DxTreeViewComponent } from 'devextreme-angular';
import { OrganogramService } from './organogram.service';


@Component({
  selector: 'x365-shared-ui-organogram',
  templateUrl: './organogram.component.html',
  styleUrls: ['./organogram.component.scss'],
  providers: [OrganogramService]
})
export class OrganogramComponent {
  message = '';

  currentItem: any;
  structureID: number;

  dataSource: any;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any[];

  isProcessing$: Observable<boolean>;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() openClick = new EventEmitter<any>();
  @Output() selectedStructure = new EventEmitter<any>();
  @Output() doneClick = new EventEmitter<any>();

  // @ViewChild('treeView') treeView: DxTreeViewComponent;

  constructor(public utilService: UtilService, private cd: ChangeDetectorRef, public fs: OrganogramService) {

  }


  onSubmit() {
    this.doneClick.emit();
  }

  onCancel() {
    this.cancelClick.emit();
  }
}
