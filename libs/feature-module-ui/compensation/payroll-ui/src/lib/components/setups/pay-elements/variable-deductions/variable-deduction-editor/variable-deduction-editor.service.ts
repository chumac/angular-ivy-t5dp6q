import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IVariableDeduction } from '@nutela/models/compensation/payroll';

@Injectable()
export class VariableDeductionEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showGroupName = false

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      code: [null, Validators.required],
      description: [null, Validators.required],
      ordering_rank: [null, Validators.required],
	    shortname: [null],
      addto_relief: [false, Validators.required],
      group_item: [false, Validators.required],
      groupname_id: [null],
      transaction_unit: [null, Validators.required],
      must_apply_for:[false, Validators.required],
      use_global_rate:[false, Validators.required],
      payroll_profile: [null, Validators.required],
      ledger_account: [null],
      sys_rule: [null],

      // Fields that are not in the document

      // rate_table: [null],
      // relief_amount: [null],
      // relief_percent: [null],
      // usedirect_amount: [false, Validators.required],
      // direct_amount: [null],
      // formula_id: [null],
      // currency_id: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IVariableDeduction
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IVariableDeduction): IVariableDeduction | {} {
    if (data) {

      return {
        code:data.code,
        description: data.description,
        ordering_rank: data.ordering_rank,
        shortname: data.shortname,
        addto_relief: data.addto_relief.toLowerCase() === 'yes' ? true : false,
        groupname_id: data.groupname_id,
        transaction_unit:data.transaction_unit,
        must_apply_for: data.must_apply_for.toLowerCase() === 'yes' ? true : false,
        use_global_rate: data.use_global_rate.toLowerCase() === 'yes' ? true : false,
        group_item: data.group_item.toLowerCase() === 'yes' ? true : false,
        payroll_profile: data.payroll_profile,
        ledger_account: data.ledger_account,
        sys_rule: data.sys_rule,

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      Code: {
        fieldTitle: `code`,
        required: `This field is required.`
      },
      Description: {
        fieldTitle: `description`,
        required: `This field is required.`
      },
        Rank: {
        fieldTitle: `ordering_rank`,
        required: `This field is required.`
      },
        TransactionUnit: {
        fieldTitle: `transaction_unit`,
        required: `This field is required.`
      },
        PayrollProfile: {
        fieldTitle: `payroll_profile`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  rebuildForm() {
    this.form = this.buildForm();
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

  get Code(): AbstractControl {
    return this.form.get('code');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get groupName(): AbstractControl {
    return this.form.get('groupname_id');
  }


  onGroupItemChecked(event) {
    if (event.target.checked) {
      this.showGroupName = true;
    } else {
      this.showGroupName = false
      this.groupName.setValue(null);
    }
  }
}
