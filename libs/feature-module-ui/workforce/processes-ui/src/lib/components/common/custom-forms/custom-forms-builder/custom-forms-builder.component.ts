import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take, switchMap } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { CustomFormsBuilderService } from './custom-forms-builder.service';
import {Location} from '@angular/common';
import { FormBuilderComponent } from '../../../../com-parts/form-builder/form-builder.component';
import { ProcessingCustomForm, SaveCustomForm, isProcessingCustomForm, getCustomFormData } from '../../../../store/processes/custom-form';
import { ICustomForm, ICustomFormScope, IFormBuilder } from '@nutela/models/workforce/employee-profiles';
import { of } from 'rxjs';


@Component({
  selector: 'x365-fm-talent-custom-forms-builder',
  templateUrl: './custom-forms-builder.component.html',
  styleUrls: ['./custom-forms-builder.component.scss'],
  providers: [CustomFormsBuilderService],

})
export class CustomFormsBuilderComponent implements OnInit {
  @ViewChild('builder') builder: FormBuilderComponent;
  isProcessing$: Observable<boolean>;

  constructor(private store: Store<IAppState>, public service: CustomFormsBuilderService, private dialogBoxService: DialogBoxService, private location: Location) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {

  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomForm));
  }

  onSaveButtonClicked() {
    const workAreaData: ICustomForm = this.builder.fbWorkAreaData;
    const masterFBData: IFormBuilder[] = this.builder.masterFormBuilderData;
    if(workAreaData){
      this.dialogBoxService.show(`Are you sure you want to save this form?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          workAreaData.form_json = JSON.stringify(masterFBData);
          const recordId = workAreaData.id;
          this.store.dispatch(new ProcessingCustomForm());
          this.store.dispatch(new SaveCustomForm({data: <ICustomForm>workAreaData, recordId: recordId, editMode: true }));
        }
      });
    }
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Custom Form Builder Information is being refreshed.`, type: ToastTypes.INFO}));
  }

  goBack() {
    this.location.back();
  }

  // checkForChangesInFormBuilder(id: number): Observable<number> {
  //   return this.store.pipe(select(getCustomFormData)).pipe(
  //     map(d => d.filter(v => v.id === id)),
  //     switchMap((d)=> {
  //       let diff = 0;
  //       if(d[0].form_json !== JSON.stringify(this.builder.masterFormBuilderData)){
  //         diff = 1;
  //       }
  //       return of(diff);
  //     })
  //   );
  // }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
