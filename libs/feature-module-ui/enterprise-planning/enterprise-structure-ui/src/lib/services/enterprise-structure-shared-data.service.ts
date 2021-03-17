import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { IEnterpriseStructureDetail } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseStructureSharedDataService {

  selectedItems: IEnterpriseStructureDetail[];
  structureId: number;
  structureName: string;

    constructor(private store: Store<IAppState>) { }

}
