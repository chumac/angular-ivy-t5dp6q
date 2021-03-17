import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { HrzCommandTypes, DialogBoxCommandTypes, DialogBoxService } from "@nutela/shared/ui";
import { ShowToast } from "@nutela/store/shared";
import { LoadDocumentTagsData, ShowEditorDocumentTags } from "../../store";
import { ILookupState } from '../../store';
import { ISelectOption } from "@nutela/models/core-data";
import { ToastTypes } from "@nutela/shared/app-global";

@Injectable({
  providedIn: 'root'
})
export class DocumentTagsService {

  constructor(private store: Store<ILookupState>, private dialogBoxService: DialogBoxService) {
  }

  showEditor() {
    this.store.dispatch(new ShowEditorDocumentTags());
  }

  refresh(){
    this.store.dispatch(new LoadDocumentTagsData());
    this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'description', label: 'Description' }
  ];
}
