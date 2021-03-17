import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StructureTreeViewService } from './structure-tree-view.service';
import { Observable } from 'rxjs';
import { IStructureTree } from '@nutela/models/common';

@Component({
  selector: 'x365-shared-ui-structure-tree-view',
  templateUrl: './structure-tree-view.component.html',
  styleUrls: ['./structure-tree-view.component.scss'],
  providers: [StructureTreeViewService] 
})
export class StructureTreeViewComponent implements OnInit {
  @Input() public checkedText = '';
  @Output() selectedStructure = new EventEmitter<IStructureTree>();
  public structures$: Observable<IStructureTree[]>;
  public createChildren;

  constructor(private service: StructureTreeViewService, private http: HttpClient) {
    // this.loadData(0);
  }

  ngOnInit() {
    this.loadData();
  }

  getStructure(structureId): Observable<IStructureTree[]> {
    return this.service.fetchUrl(`${structureId}`);
  }
  
  loadData() {
    this.createChildren = (parent) => {
      let parentId = parent ? parent.itemData.structure_id : 0;
      return new Promise((resolve, reject) => {
        this.getStructure(parentId).subscribe((response: any) => {
          resolve(response.Results);
        }, reject);
      });
    }
  }

  selectStructure($evt) {
    this.selectedStructure.emit($evt.itemData);
  }

}
