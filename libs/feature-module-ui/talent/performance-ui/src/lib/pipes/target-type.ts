import { Pipe, PipeTransform } from '@angular/core';
import * as pipeConstant from '../constants'

@Pipe({name: 'targetOpt'})
export class TargetType implements PipeTransform {
  transform(val: number): string {
    let returnArray = pipeConstant.targetTypeOptions;
    let result = null;
    if(val !== null){
      result =  returnArray[returnArray.findIndex(x => x.value === val)].label;
    }
    return result;
  }
}