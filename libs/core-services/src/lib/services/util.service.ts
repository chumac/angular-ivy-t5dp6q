import { Injectable } from '@angular/core';
import {
  ISelectOption,
  IParameter,
  INationalitySelectOption,
  IErrorMessage,
  IName
} from '@nutela/models/core-data';
import {
  GENERAL,
  MIME_TYPES,
  FILE_EXTENSIONS,
  ToastTypes
} from '@nutela/shared/app-global';
import { formatDate } from '../factories/date.util.factory';
import { ToastService } from 'ng-uikit-pro-standard';
import { toastOptionsSuccess, toastOptionsInformation, toastOptionsWarning, toastOptionsError } from '../factories';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  version: string;

  constructor(private toast: ToastService) {}

  clone(value: any) {
    return JSON.parse(JSON.stringify(value));
  }

  get currentDate(): string {
    return formatDate(new Date());
  }

  get maximumImageSize(): number {
    return 999999999;
  }

  convertToPercent(value: number): string {
    return value.toString() + '%';
  }

  convertToNegativePercent(value: number): string {
    return (value * -1).toString() + '%';
  }

  convertEmptyStringObjectFieldsToNull(obj: Object): Object {
    let object  = obj;
    for (let key in object) {
      let value = object[key];
      if(value === '' || value === undefined){
        object[key] = null
      }
    }
    return object;
  }

  transformToSelectDataList(
    list: any,
    valueProp?: string,
    labelProp?: string,
    addDefaultOption: boolean = false,
    defaultOption: ISelectOption = null
  ): ISelectOption[] {
    let tempList: ISelectOption[] = [];

    if (addDefaultOption) {
      tempList.push(defaultOption);
    }

    list.forEach(element => {
      let value = '';
      let label = '';

      if (valueProp) {
        value = this.fetchPropertyValue(element, valueProp);
      } else {
        value = element;
      }

      if (labelProp) {
        label = this.fetchPropertyValue(element, labelProp);
      } else {
        label = element;
      }

      let newObj = { value: value, label: label };

      tempList.push(newObj);
    });

    return <ISelectOption[]>tempList;
  }

  transformToSelectDataList2(
    list: any,
    valueProp?: string,
    labelProp?: string,
    labelProp2?: string,
    addDefaultOption: boolean = false,
    defaultOption: ISelectOption = null
  ): ISelectOption[] {
    let tempList: ISelectOption[] = [];

    if (addDefaultOption) {
      tempList.push(defaultOption);
    }

    list.forEach(element => {
      let value = '';
      let label = '';

      if (valueProp) {
        value = this.fetchPropertyValue(element, valueProp);
      } else {
        value = element;
      }

      if (labelProp) {
        if(labelProp2){
        let  lab2 = this.fetchPropertyValue(element, labelProp2);
        let  lab1 = this.fetchPropertyValue(element, labelProp);
        label = label.concat(lab1,' (',lab2,')');
        }else {
          label = this.fetchPropertyValue(element, labelProp);
        }
      } else {
        label = element;
      }

      let newObj = { value: value, label: label };

      tempList.push(newObj);
    });

    return <ISelectOption[]>tempList;
  }

  deepTransformToSelectDataList(param: IParameter): INationalitySelectOption[] {
    let tempList: any[] = [];

    param.list.forEach(element => {
      let value = '';
      let label = '';

      if (param.valueProp) {
        value = this.fetchPropertyValue(element, param.valueProp);
      } else {
        value = element;
      }

      if (param.labelProp) {
        label = this.fetchPropertyValue(element, param.labelProp);
      } else {
        label = element;
      }

      let newObj: { [key: string]: any } = { value: value, label: label };

      if (param.innerProp1) {
        let innerProp1 = param.innerProp1;
        innerProp1.list = element[innerProp1.propName];

        newObj[innerProp1.propName] = this.deepTransformToSelectDataList(
          innerProp1
        );
      }

      if (param.innerProp2) {
        let innerProp2 = param.innerProp2;
        innerProp2.list = element[innerProp2.propName];

        newObj[innerProp2.propName] = this.deepTransformToSelectDataList(
          innerProp2
        );
      }

      tempList.push(newObj);
    });

    return <INationalitySelectOption[]>tempList;
  }

  fetchPropertyValue(obj, prop): any {
    if (typeof obj === 'undefined') {
      return null;
    }

    var index = prop.indexOf('.');
    if (index > -1) {
      return this.fetchPropertyValue(
        obj[prop.substring(0, index)],
        prop.substr(index + 1)
      );
    }

    return obj[prop];
  }

  getNationalityDeepTransformParameters() {
    let param4 = {
      list: null,
      valueProp: 'city_id',
      labelProp: 'description',
      propName: 'CityList'
    };

    let param3 = {
      list: null,
      valueProp: 'lga_id',
      labelProp: 'description',
      propName: 'LgaList'
    };

    let param2 = {
      list: null,
      valueProp: 'state_id',
      labelProp: 'description',
      propName: 'StatesList',
      innerProp1: param3,
      innerProp2: param4
    };

    return {
      list: null,
      valueProp: 'nationality_id',
      labelProp: 'description',
      propName: 'Nationality',
      innerProp1: param2
    };
  }

  public errorHtmlString(errorMessages: IErrorMessage[]): string {
    let htmlText = '';

    if (errorMessages && errorMessages.length > 0) {
      for (let i = 0; i < errorMessages.length; i++) {
        const errorMessage = errorMessages[i];

        htmlText =
          htmlText +
          `<div class="text-dark"><h6 class="mb-0 toast-header text-uppercase">${
            errorMessage.title
          }</h6><ul class="mb-3 toast-bullet">`;

        const messages = errorMessage.messages;
        for (let j = 0; j < messages.length; j++) {
          htmlText =
            htmlText +
            `<li><span class="toast-line-text"> ${messages[j]} </span></li>`;
        }

        htmlText = htmlText + `</ul></div>`;
      }
    }

    return htmlText;
  }

  showToast(title: string, message: string, type: ToastTypes = ToastTypes.INFO) {
    if (type === ToastTypes.SUCCESS) {
      this.toast.success(message, title, toastOptionsSuccess());
    } else if (type === ToastTypes.INFO) {
      this.toast.success(message, title, toastOptionsInformation());
    } else if (type === ToastTypes.WARNING) {
      this.toast.success(message, title, toastOptionsWarning());
    } else if (type === ToastTypes.ERROR) {
      this.toast.success(message, title, toastOptionsError());
    } else {
      this.toast.success(message, title, toastOptionsInformation());
    }
  }

  public getDataURL(value: any): any {
    if (value !== null || '') {
      return GENERAL.pngBase64Header + value;
    }
  }

  public getDataURLData(value: string): any {
    const index = value.indexOf(',');
    return value.slice(index + 1);
  }

  public getSafeBase64URL(base64: any, mimeType): any {
    const byteCharacters = atob(base64);

    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: mimeType });

    return window.URL.createObjectURL(blob);
  }

  public openBase64URL(base64URL: any) {
    window.open(base64URL, '_blank');
  }

  public getDocumentData(rawData: any, fileExtension: string): any {
    return this.getSafeBase64URL(rawData, this.getMimeType(fileExtension));
  }

  public getMimeType(fileExtension: string): string {
    if (!fileExtension) {
      return '';
    } else {
      switch (fileExtension.toLocaleLowerCase()) {
        case FILE_EXTENSIONS.pdf: {
          return MIME_TYPES.pdf;
        }
        case FILE_EXTENSIONS.text: {
          return MIME_TYPES.text;
        }
        case FILE_EXTENSIONS.doc: {
          return MIME_TYPES.doc;
        }
        case FILE_EXTENSIONS.docx: {
          return MIME_TYPES.docx;
        }
        case FILE_EXTENSIONS.xls: {
          return MIME_TYPES.xls;
        }
        case FILE_EXTENSIONS.xlsx: {
          return MIME_TYPES.xlsx;
        }
        case FILE_EXTENSIONS.richText: {
          return MIME_TYPES.richText;
        }
        case FILE_EXTENSIONS.jpeg: {
          return MIME_TYPES.jpeg;
        }
        case FILE_EXTENSIONS.jpg: {
          return MIME_TYPES.jpg;
        }
        case FILE_EXTENSIONS.png: {
          return MIME_TYPES.png;
        }
        case FILE_EXTENSIONS.bmp: {
          return MIME_TYPES.bmp;
        }
        default: {
          return MIME_TYPES.default;
        }
      }
    }
  }

  getNPText(value: number, singularText: string, pluralText: string, zeroText: string, returnFullText: boolean = false): string {
    // getNumberPluralizationText
    if (value <= 0) {
      return zeroText;
    } else if (value === 1) {
      return singularText;
    } else {
      return pluralText;
    }
  }

  getImageSize(value: number): number {
    return Math.round((value - GENERAL.pngBase64Header.length) * 3 / 4) ;
  }

  getEmployeeFullName(title: string, firstName: string, surname: string, middleName: string): IName {
    let name: IName = {employeeId: 0};

    let fullName = '';
    let displayName = '';
    let titleFullName = '';
    let titleDisplayName = '';

    name.title = title;
    name.firstName = firstName;
    name.surname = surname;
    name.middleName = middleName;

    // Full name
    fullName = fullName + firstName;
    if (middleName !== '') {
      fullName = fullName + ' ' + middleName;
    }
    fullName = fullName + ' ' + surname;

    // Display name
    displayName = displayName + firstName;
    displayName = displayName + ' ' + surname;

    // Full name with title
    if (title !== '') {
      titleFullName = title + ' ' + fullName;
    } else {
      titleFullName =  fullName;
    }

    // Display name with title
    if (title !== '') {
      titleDisplayName = title + ' ' + displayName;
    } else {
      titleDisplayName =  displayName;
    }

    name.fullName = fullName;
    name.displayName = displayName;
    name.titleFullName = titleFullName;
    name.titleDisplayName = titleDisplayName;

    return name;
  }

  maskInput(value: any): string {
    let result: string = ''; 
    if (typeof value === 'string' || value instanceof String) {
      result = new Number(value.replace(/\D/g,'')).toLocaleString();
    }
    if(Number.isInteger(value)) {
      result = new Number(value.toString().replace(/\D/g,'')).toLocaleString();
    }
    return result;
  }

  unsubscribe1(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }

  unsubscribe(...subs: Subscription[]) {
    subs.filter(sub => sub instanceof Subscription && typeof sub.unsubscribe === 'function')
    .forEach(sub => sub.unsubscribe());
  }

}
