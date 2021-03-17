import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WIDGET_DEFINITION, widgetType, optionsType } from './config/constants.constant';
import { IFormBuilder, ICustomForm, ICustomFormArea, ICustomFormScope } from '@nutela/models/workforce/employee-profiles';
import { FormGroup, FormBuilder, FormArray, FormControl, NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IProcessesState } from '../../store/root/processes.state';
import { ShowToast } from '@nutela/store/shared';
import { MatAccordion, MatDialog } from '@angular/material';
import { FormBuilderEditorComponent } from './form-builder-editor/form-builder-editor.component';
import { ToastTypes } from '@nutela/shared/app-global';
import { FormBuilderViewerComponent } from './form-builder-viewer/form-builder-viewer.component';
import { Observable } from 'rxjs';
import { IBasicData } from '@nutela/models/core-data';
import { getCustomFormDataSetType, getCustomFormCascadeDataSetType, LoadDataSetTypeCustomForm, LoadCascadeDataSetTypeCustomForm, getCustomFormData } from '../../store/processes/custom-form';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormRendererComponent } from '@nutela/shared/ui';

@Component({
  selector: 'x365-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('scroll') private scroll: any;
  @ViewChild('renderer') renderer: FormRendererComponent;

  // @ViewChild('requiredField') requiredField: ElementRef;
  @ViewChild('cascChild') cascChild: ElementRef;
  @ViewChild('childDataSet') childDataSet: any;

  form: FormGroup;
  ctrlForm: FormGroup;

  accIndexExpanded: number;

  widgetDefinitionsList = WIDGET_DEFINITION;
  selectOptionTypes = optionsType; // Enumeration for all the types of dropdowns e.g dataset, cascade, simple drop downs
  formWidgetType = widgetType;
  fbData: any = {};
  fbWorkAreaData: ICustomForm;
  masterFormBuilderData: IFormBuilder[];
  showRenderer: boolean;
  dataSetTypes$: Observable<IBasicData[]>; // Holds the list of select option dataset type e.g list of employees
  cascadeDataSetTypes$: Observable<IBasicData[]>; // Holds the list of select option cascade dataset type e.g list of states in a country nigeria


  constructor( private store: Store<IProcessesState>, private fb: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute) {
    this.initFormArrayList();
  }

  ngOnInit() {
    this.initBuilderData(+this.route.snapshot.paramMap.get('id'));
    this.storeSelects();
    this.storeDispatches();

  }

  initBuilderData(id: number) {
    this.masterFormBuilderData = [];
    this.store.pipe(select(getCustomFormData)).pipe(
        map(d => d.filter(v => v.id === id)),
        take(1)
    ).subscribe((data: ICustomForm[])=>{
      if(data){
        this.fbWorkAreaData = data[0];
        try {
          this.masterFormBuilderData = JSON.parse(this.fbWorkAreaData.form_json);
        } catch(e) {
          this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Invalid JSON Property', type: ToastTypes.ERROR}));
        }
      }
    });
    
  }

  storeSelects() {
    this.dataSetTypes$ = this.store.pipe(select(getCustomFormDataSetType));
    this.cascadeDataSetTypes$ = this.store.pipe(select(getCustomFormCascadeDataSetType));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataSetTypeCustomForm());
    this.store.dispatch(new LoadCascadeDataSetTypeCustomForm());
  }

  addWidgetToForm(form: FormGroup, widgetData) {

    if(form.valid) {
      let values: IFormBuilder = form.value;
      let result: IFormBuilder = {
        widget_id: widgetData.id,
        widget: widgetData.spec,
        field_name: values.field_name,
        label: values.label,
        value: values.value,
        type: widgetData.type,
        validationType: values.validationType,
        extra: (widgetData.optionsType === this.selectOptionTypes.cascade)?{ field_name: this.cascChild.nativeElement.value, optionDataSetId: this.childDataSet.value }:values.extra,
        hasOptions: widgetData.hasOptions,
        optionsType: widgetData.optionsType, 
        optionsData: [...widgetData.optionsData], 
        optionsDataSetId: values.optionsDataSetId
      };
      console.log('form builder: ', result);
      this.masterFormBuilderData.push(result);
      this.cascChild.nativeElement.value = null;
      this.childDataSet.value = null;
      form.reset();
      this.scrollToBottom();
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Fill all required fields', type: ToastTypes.ERROR}));
    }

  }

  onSubmit() {

  }

  openEditorDialog(data, index): void {
    const dialogRef = this.dialog.open(FormBuilderEditorComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.masterFormBuilderData[index] = result.value;  
      }
    });
  }

  openViewerDialog(data): void {
    const dialogRef = this.dialog.open(FormBuilderViewerComponent, {
      width: '500px',
      data: data
    });
  }

  removeWidgetFromForm(values, key) {
    if (key > -1) {
      this.masterFormBuilderData.splice(key, 1);
    }
  }

  levelUpControl(values, index) {
    let length: number = this.masterFormBuilderData.length;
    if((index - 1) >= 0) {
      let temp = this.masterFormBuilderData[index - 1];
      this.masterFormBuilderData[index - 1] = this.masterFormBuilderData[index];
      this.masterFormBuilderData[index] = temp;
    }
  }

  levelDownControl(value, index) {
    let length: number = this.masterFormBuilderData.length;
    if((index + 1) < length) {
      let temp = this.masterFormBuilderData[index + 1];
      this.masterFormBuilderData[index + 1] = this.masterFormBuilderData[index];
      this.masterFormBuilderData[index] = temp;
    }
  }

  onShowRenderer(data) {
    this.renderer.data = JSON.stringify(this.masterFormBuilderData);
    this.showRenderer = true;
  }

  onCancelRenderer() {
    this.renderer.data = null;
    this.showRenderer = false;
  }

  initFormArrayList() {
    this.form = this.fb.group({
      ctrls: this.fb.array([]),
    });
    this.ctrlForm = this.fb.group({
      widget_id: [null],
      widget: [null],
      field_name: [null],
      label: [null],
      value: [null],
      type: [null],
      validationType: [null],
      extra: [null],
      hasOptions: [null],
      optionsType: [null],
      optionsData: [null], 
      optionsDataSetId: [null]
    });
  }


  parseToJson(value): any {
    let result = null;
    try {
      result = JSON.parse(value);
    } catch (e) {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Invalid key pair values', type: ToastTypes.ERROR}));
    }
    return result;
  }

  toJson(value): any {
    if(value){
      let result = null;
      try {
        result = JSON.parse(value);
      } catch (e) {
        console.log(e);
      }
      return result;
    }
  }

  scrollToBottom(): void {
    try {
      this.scroll.scrollToBottom();
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  // To be removed  -- testing purpose only
  onRendererSubmit($event) {
    const entries = Object.entries($event);
    for (const key of entries) {
      console.log(key[0]);
      this.masterFormBuilderData.forEach((record)=>{
        if (record.field_name === key[0]) {
          record.value = key[1];
        }
      });
    }
    this.fbWorkAreaData.form_json = JSON.stringify(this.masterFormBuilderData);
    console.log('Final Master Submit Value after: ', this.fbWorkAreaData);
  }

}
