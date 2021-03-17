import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { IOrganization } from '@nutela/models/foundation';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, INationalitySelectOption, ISelectOption } from '@nutela/models/core-data';

import { OrganizationEditorService } from './organization-editor.service';
import { NotProcessingOrganization, LoadStatesOrganization, LoadCitiesOrganization, ProcessingOrganization, SaveOrganization } from '../../../store/organization/organization.actions';
import { IHRFoundationState } from '../../../store/root';
import { isProcessingOrganization, getOrganizationStateList, getOrganizationCityList } from '../../../store/organization/organization.selectors';


@Component({
  selector: 'x365-fm-plf-hrf-organization-editor',
  templateUrl: './organization-editor.component.html',
  styleUrls: ['./organization-editor.component.scss'],
  providers: [OrganizationEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class OrganizationEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IOrganization;

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  isProcessing$: Observable<boolean>;
  constructor(
    public fs: OrganizationEditorService,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingOrganization));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onImageSelected($event) {
      const data = $event;
      if (data) {
        this.fs.patch({
          org_logo_vtwo: data.data,
        });
      }
    }

    onFileRemoved() {
      this.fs.patch({
        org_logo_vtwo: null,
      });
    }



    onSubmit() {
      if (this.fs.valid) {
        const recordId = this.data? this.data.org_id: 0;
        this.store.dispatch(new ProcessingOrganization());
        this.store.dispatch(new SaveOrganization({data: this.fs.value, recordId: recordId}));
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingOrganization());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }
}
