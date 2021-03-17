import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { HrzCommandTypes} from "@nutela/shared/ui";

import { ILookupState } from '../../store';
import { ShowEditorState, LoadStateData } from "../../store";
import { ISelectOption } from "@nutela/models/core-data";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";


@Injectable({
  providedIn: 'root'
})
export class StateService {
  public country_id:number;
  constructor(private store: Store<ILookupState>) {
  }

  showEditor() {
    this.store.dispatch(new ShowEditorState());
  }


  refresh(){
    this.store.dispatch(new LoadStateData({countryId:this.country_id}));
    this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];

}
