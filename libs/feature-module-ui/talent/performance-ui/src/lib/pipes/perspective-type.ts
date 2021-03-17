import { Pipe, PipeTransform } from '@angular/core';
import * as pipeConstant from '../constants'

@Pipe({name: 'measureOpt'})
export class PerspectiveType implements PipeTransform {
  transform(val: any): string {
    let returnArray = pipeConstant.typeOptions;
    let result = null;
    if(val){
      if(returnArray.includes(val)){
        result =  returnArray[returnArray.findIndex(x => x.value === val)].label;
      }
    }
    return result;
  }
}
