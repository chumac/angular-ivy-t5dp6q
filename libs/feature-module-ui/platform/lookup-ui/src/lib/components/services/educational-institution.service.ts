import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";

import { HrzCommandTypes} from "@nutela/shared/ui";

import { ILookupState, LoadProfessionalInstitution } from '../../store';
import { ShowEditorEducationalInstitution, LoadEducationalInstitution } from "../../store";
import { ISelectOption } from "@nutela/models/core-data";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class EducationalInstitutionService {

  public countryName:String;
  constructor(private store: Store<ILookupState>,) {
  }

  showEditor() {
    this.store.dispatch(new ShowEditorEducationalInstitution());
  }


  refresh(){
    if(this.countryName){
    this.store.dispatch(new LoadEducationalInstitution({countryName: this.countryName}));
    }
    this.store.dispatch(new LoadProfessionalInstitution());
    this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];
}
