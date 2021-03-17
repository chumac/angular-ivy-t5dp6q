import { Pipe, PipeTransform } from '@angular/core';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

@Pipe({
    name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

    transform(value: IPersonal[], filter: string): IPersonal[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((data: IPersonal) =>
            data.title.toLocaleLowerCase().search(filter) !== -1) : value;
    }
}
