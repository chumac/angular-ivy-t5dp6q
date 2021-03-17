import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { HrzCommandTypes} from "@nutela/shared/ui";

import { ILookupState, LoadLgaData } from '../../store';
import { ShowEditorLga } from "../../store";
import { ISelectOption } from "@nutela/models/core-data";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";


@Injectable({
  providedIn: 'root'
})
export class LgaService {
  public country_id:number;
  public state_id:number;

  constructor(private store: Store<ILookupState>,) {
  }

  showEditor() {
    this.store.dispatch(new ShowEditorLga());
  }


  refresh(){
    this.store.dispatch(new LoadLgaData({stateId:this.state_id}));
    this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];

}
