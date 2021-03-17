import { Pipe, PipeTransform } from '@angular/core';
import * as pipeConstant from '../constants'

@Pipe({name: 'eligibilityRuleOpt'})
export class EligibilityRuleType implements PipeTransform {
  transform(val: number): string {
    let returnArray = pipeConstant.eligibilityRuleOptions;
    let result = null;
    if(val !== null){
      result =  returnArray[returnArray.findIndex(x => x.value === val)].label;
    }
    return result;
  }
}