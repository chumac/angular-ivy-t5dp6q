import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { HrzCommandTypes, } from "@nutela/shared/ui";
import { LoadDepartmentData, ShowEditorDepartment } from "../../store";
import { ILookupState } from '../../store';
import { ISelectOption } from "@nutela/models/core-data";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowToast } from "@nutela/store/shared";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private store: Store<ILookupState>,) {
  }

  showEditor() {
    this.store.dispatch(new ShowEditorDepartment());
  }


  refresh(){
    this.store.dispatch(new LoadDepartmentData());
    this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];
}
