import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseStructureTreeViewService {
  createChildren: any;
  rootParent: number;
  parentEx: string;
  key: number;

  constructor(private apiService: ApiService, ) {
    this.loadData();
  }

  loadData() {
    this.createChildren = (parent) => {
      let parentId = parent ? parent.key : 0;
      let treeUrl = '/api/enterprise-structure/tree/hr/get';
      this.rootParent = parent ? parent.itemData.sourced_from_id : 0;
      this.parentEx = parent ? (parent.itemData.sourced_from_id) : 0;
      return new Promise((resolve, reject) => {
        this.apiService.read(`${treeUrl}/${parentId}`).subscribe((response: any) => {
          resolve(response.Results);
        }, reject);
      });
    }
  }

  getParentIdExpr() {

  }
}
