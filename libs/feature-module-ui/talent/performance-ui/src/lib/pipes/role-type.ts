import { Pipe, PipeTransform } from '@angular/core';
import * as pipeConstant from '../constants'

@Pipe({name: 'roleOpt'})
export class RoleType implements PipeTransform {
  transform(val: number): string {
    let returnArray = pipeConstant.roleOptions;
    let result = null;
    if(val !== null){
      result =  returnArray[returnArray.findIndex(x => x.value === val)].label;
    }
    return result;
  }
}