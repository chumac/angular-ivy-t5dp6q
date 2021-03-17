import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';

@Injectable({
    providedIn: 'root'
})
export class ReliefEditorService {
    private form: FormGroup = new FormGroup({});

    public filterList: ISelectOption[] = [
        { value: '', label: 'All Columns' },
        { value: 'code', label: 'Code' },
        { value: 'description', label: 'Description' },
        { value: 'relief_type_text', label: 'Relief Type' },
    ];

    constructor() { }

    init(
        data: IReliefProfile
    ) {
        if (data) {
            this.form.patchValue(this.fieldData(data));
        }
    }

    fieldData(data: IReliefProfile): IReliefProfile | {} {
        if (data) {
          return {
            code:data.code,
            description: data.description,
            relief_type_text: data.relief_type_text,
          };
        } else {
          return {};
        }
      }

    search(grid: IgxGridComponent, term: string, filterBy: string): any {
        if (grid) {
            if (filterBy) {
                grid.clearFilter();
                grid.filteringLogic = FilteringLogic.Or;
                grid.filter(
                    filterBy,
                    term,
                    IgxStringFilteringOperand.instance().condition('contains'),
                    false
                );
            } else {
                grid.clearFilter();
                grid.filteringLogic = FilteringLogic.Or;
                grid.filterGlobal(
                    term,
                    IgxStringFilteringOperand.instance().condition('contains'),
                    false
                );
            }
        }
    }
    get f() {
        return this.form;
    }

    get value(): any {
        return this.form.getRawValue();
    }

    get valid(): boolean {
        return this.form.valid;
    }

    patch(value: { [key: string]: any }) {
        this.form.patchValue(value);
    }
}