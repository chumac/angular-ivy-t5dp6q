import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';

import { DxListComponent } from 'devextreme-angular';
import { IRoles, IRolesTransform } from '../../../../models/interfaces';
import { NotProcessingNewEmployee } from '../../../../store/new-employee';


@Component({
  selector: 'x365-fm-plf-prov-provisioning-roles-picker',
  templateUrl: './roles-picker.component.html',
  styleUrls: ['./roles-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesPickerComponent implements OnInit {

  public rolesToAssign: IRoles[] = [];
  @Output() rolesPicked = new EventEmitter<any>();

  @ViewChild("isAdmin") isAdmin: ElementRef;
  @ViewChild("rolesList") public rolesList: DxListComponent;
  @ViewChild("addedRolesList") public addedRolesList: DxListComponent;

  @Input() rolesData: IRolesTransform[];
  selectedRolesList: IRolesTransform[] = [];

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
  ) {  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.getTransformedRoles()
  }

  storeDispatches() {

  }

  storeSelects() {

  }

  getTransformedRoles() {
    this.rolesList.selectedItems = [];
    this.addSelectedRows();
  }

  addSelectedRows() {
      this.rolesData.forEach(role => {
        this.rolesList.selectedItems.forEach(item => {
          if(role.role_name === item.role_name) {
            this.selectedRolesList.push(role);
          }
        })
      });

    for( var i=this.rolesData.length - 1; i>=0; i--){
      for( var j=0; j<this.rolesList.selectedItems.length; j++){
          if(this.rolesData[i] && (this.rolesData[i].role_name === this.rolesList.selectedItems[j].role_name)){
           this.rolesData.splice(i, 1);
         }
       }
      }

    this.rolesPicked.emit(this.selectedRolesList);
    this.addedRolesList.selectedItems = [];
    this.store.dispatch(new NotProcessingNewEmployee())
  }

  removeSelectedRows() {
    this.selectedRolesList.forEach(role => {
      this.addedRolesList.selectedItems.forEach(item => {
        if(role.role_name === item.role_name) {
          this.rolesData.unshift(role);
        }
      })
    });
    for( var i=this.selectedRolesList.length - 1; i>=0; i--){
      for( var j=0; j<this.addedRolesList.selectedItems.length; j++){
          if(this.selectedRolesList[i] && (this.selectedRolesList[i].role_name === this.addedRolesList.selectedItems[j].role_name)){
          this.selectedRolesList.splice(i, 1);
        }
      }
    }
    this.rolesList.selectedItems = [];

    this.store.dispatch(new NotProcessingNewEmployee())
  }
}
