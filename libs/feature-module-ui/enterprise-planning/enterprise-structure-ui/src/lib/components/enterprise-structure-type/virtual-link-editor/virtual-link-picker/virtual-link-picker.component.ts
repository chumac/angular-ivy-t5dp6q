import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Input, ViewContainerRef, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';

import { DxListComponent } from 'devextreme-angular';
import { getVirtualLinks } from '../../../../store/enterprise-structure-type';
import { IEnterpriseStructure, IVirtualLinkTransform } from '../../../../models/interfaces';


@Component({
  selector: 'x365-fm-es-virtual-link-picker',
  templateUrl: './virtual-link-picker.component.html',
  styleUrls: ['./virtual-link-picker.component.scss']
})
export class VirtualLinkPickerComponent  extends BaseFormComponent
  implements OnInit {

  @Output() linksPicked = new EventEmitter<any>();

  @ViewChild("isAdmin") isAdmin: ElementRef;
  @ViewChild("virtualLinksList") public virtualLinksList: DxListComponent;
  @ViewChild("addedVirtualLinksList") public addedVirtualLinksList: DxListComponent;

  @Input() allVirtualLinks: any[] = [];
  enterpriseStructure: IEnterpriseStructure;
  @Input() selectedVirtualLinks: IVirtualLinkTransform[] = [];

  virtualLinks$: Observable<any[]>;
  availableLinks$: Observable<any[]>;
  enterpriseStructureData$: Observable<IEnterpriseStructure[]>;


  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes['clickedId']) {

  //   }
  // }

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    // this.addSelectedRows()
  }

  storeDispatches() {


  }

  storeSelects() {
    this.virtualLinks$ = this.store.pipe(select(getVirtualLinks))
  }

  addSelectedRows() {
    this.allVirtualLinks.forEach(link => {
      this.virtualLinksList.selectedItems.forEach(item => {
        if(link.analysis_id === item.analysis_id) {
          if(this.selectedVirtualLinks.find(e => e.analysis_id === link.analysis_id) === undefined) {
            this.selectedVirtualLinks.push(link);
          };
            // if(vLink.analysis_id !== link.analysis_id) {
            //   this.selectedVirtualLinks.push(link);
            // } else {
            //   return this.selectedVirtualLinks
            // }
      }
    });
  })

    for( var i=this.allVirtualLinks.length - 1; i>=0; i--){
      for( var j=0; j<this.virtualLinksList.selectedItems.length; j++) {
          if(this.allVirtualLinks[i] && (this.allVirtualLinks[i].description === this.virtualLinksList.selectedItems[j].description)){
            this.allVirtualLinks.splice(i, 1);
          }
        }
      }
    this.linksPicked.emit(this.selectedVirtualLinks);
  }

  containsObject(obj, list) {
    list.forEach(link => {

    })
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

  removeSelectedRows() {
    this.selectedVirtualLinks.forEach(link => {
      this.addedVirtualLinksList.selectedItems.forEach(item => {
        if(link.analysis_id === item.analysis_id) {
          if(this.allVirtualLinks.find(e => e.analysis_id === link.analysis_id) === undefined) {
            this.allVirtualLinks.unshift(link);
          };

        }
      })
    });
    for( var i=this.selectedVirtualLinks.length - 1; i>=0; i--){
      for( var j=0; j<this.addedVirtualLinksList.selectedItems.length; j++){
          if(this.selectedVirtualLinks[i] && (this.selectedVirtualLinks[i].analysis_id === this.addedVirtualLinksList.selectedItems[j].analysis_id)){
          this.selectedVirtualLinks.splice(i, 1);
        }
      }
    }
    this.virtualLinksList.selectedItems = [];
  }
}
