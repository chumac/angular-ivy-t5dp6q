import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { HrzCommandTypes} from "@nutela/shared/ui";

import { ILookupState } from '../../store';
import { ShowEditorCity, LoadCityData } from "../../store";
import { ISelectOption } from "@nutela/models/core-data";
import { ToastTypes } from "@nutela/shared/app-global";
import { ShowToast } from "@nutela/store/shared";


@Injectable({
  providedIn: 'root'
})
export class CityService {
  public state_id:number;

  constructor(private store: Store<ILookupState>,) {
  }

  showEditor() {
    this.store.dispatch(new ShowEditorCity());
  }


  refresh(){
    this.store.dispatch(new LoadCityData({stateId:this.state_id}));
    this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];

}
