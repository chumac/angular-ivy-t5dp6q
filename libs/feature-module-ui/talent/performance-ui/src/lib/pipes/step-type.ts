import { Pipe, PipeTransform } from '@angular/core';
import * as pipeConstant from '../constants'

@Pipe({name: 'stepOpt'})
export class StepType implements PipeTransform {
  transform(val: number): string {
    let returnArray = pipeConstant.stepOptions;
    let result = null;
    if(val !== null){
      result =  returnArray[returnArray.findIndex(x => x.value === val)].label;
    }
    return result;
  }
}