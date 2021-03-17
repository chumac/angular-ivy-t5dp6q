import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'valueTransform'})
export class ValueTransform implements PipeTransform {
  transform(value: any, arr: Array<any>): string {
    let returnArray = arr;
    let result = null; 
    let val = +value;
    if(val !== null && returnArray.length > 0){
        result =  returnArray.filter((data) => {
          return data.value == val;
        });
    }
    return (result.length>0)?result[0].label:null;
  }
}