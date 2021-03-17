import { Injectable } from '@angular/core';
import { IBusinessOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class BusinessOptionService {
  constructor() {}

  public getStringValue(
    list: IBusinessOption[],
    key: string,
    defaultValue = ''
  ): string {
    const value = list.filter(item => (item.option_key = key));
    if (value === null || value.length === 0) {
      return defaultValue;
    } else {
      return <string>value[0].option_value;
    }
  }

  public getNumberValue(
    list: IBusinessOption[],
    key: string,
    defaultValue = 0
  ): number {
    const value = list.filter(item => (item.option_key = key));
    if (value === null || value.length === 0) {
      return defaultValue;
    } else {
      const result: any = value[0].option_value;
      return <number>result;
    }
  }

  public getBooleanValue(
    list: IBusinessOption[],
    key: string,
    defaultValue = false
  ): boolean {
    const value = list.filter(item => (item.option_key = key));
    if (value === null || value.length === 0) {
      return defaultValue;
    } else if (value[0].option_value === 'YES') {
      return true;
    } else if (value[0].option_value === 'NO') {
      return false;
    } else {
      return defaultValue;
    }
  }
}
