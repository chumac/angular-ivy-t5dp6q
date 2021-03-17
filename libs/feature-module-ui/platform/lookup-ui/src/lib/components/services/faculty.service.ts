import { Injectable } from "@angular/core";

import { Store, } from "@ngrx/store";

import { HrzCommandTypes, } from "@nutela/shared/ui";
import { ILookupState, LoadFacultyData, ShowEditorFaculty } from '../../store';
import { ISelectOption } from "@nutela/models/core-data";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowToast } from "@nutela/store/shared";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private store: Store<ILookupState>,) {
  }

  showEditor() {
    this.store.dispatch(new ShowEditorFaculty());
  }


  refresh(){
    this.store.dispatch(new LoadFacultyData());
    this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];
}
