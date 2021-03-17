import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'boolDisplay' })
export class BoolDisplay implements PipeTransform {
    transform(val: any): string {
        if (val === true) {
            return 'YES';
        } else if(val === false) {
            return 'NO';
        } else {
            return '---'
        }
    }
}