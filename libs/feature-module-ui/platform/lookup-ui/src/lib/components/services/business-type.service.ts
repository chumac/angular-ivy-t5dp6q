import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { HrzCommandTypes, DialogBoxCommandTypes, DialogBoxService } from "@nutela/shared/ui";
import { LoadBusinessTypeData, ShowEditorBusinessType } from "../../store";
import { ILookupState } from '../../store';
import { ISelectOption } from "@nutela/models/core-data";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowToast } from "@nutela/store/shared";

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  constructor(private store: Store<ILookupState>,) {
  }

  add(){
    this.showEditor();
  }

  showEditor() {
    this.store.dispatch(new ShowEditorBusinessType());
  }


  refresh(){
    this.store.dispatch(new LoadBusinessTypeData());
    this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];
}
