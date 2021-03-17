import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from '@nutela/core-services';
import { DxTreeViewComponent } from 'devextreme-angular';
import { EnterpriseStructureTreeViewService } from './enterprise-structure-tree-view.service';


@Component({
  selector: 'x365-shared-ui-enterprise-structure-tree-view',
  templateUrl: './enterprise-structure-tree-view.component.html',
  styleUrls: ['./enterprise-structure-tree-view.component.scss'],
  providers: [EnterpriseStructureTreeViewService]
})
export class EnterpriseStructureTreeViewComponent implements AfterViewInit {
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

  @ViewChild('treeView') treeView: DxTreeViewComponent;

  constructor(public utilService: UtilService, private cd: ChangeDetectorRef, public fs: EnterpriseStructureTreeViewService) {

  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  selectItem(e) {
    this.currentItem = e.itemData;
    this.selectedStructure.emit({
      structureType: this.currentItem.structure_type_id,
      structureDetail: this.currentItem.structure_id,
      costCenter: this.currentItem.structure_id
    })
  };

  onSubmit() {
    this.doneClick.emit();
  }

  onCancel() {
    this.cancelClick.emit();
    this.fs.loadData();
    // this.treeView.instance.collapseAll();
    // this.treeView.instance.endUpdate();
    // document.getElementById("treeview").remove();

  }
}
