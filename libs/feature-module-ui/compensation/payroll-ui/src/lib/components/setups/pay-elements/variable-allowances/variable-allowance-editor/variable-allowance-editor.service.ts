import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UtilService} from '@nutela/core-services';
import { IVariableAllowance } from '@nutela/models/compensation/payroll';

@Injectable()
export class VariableAllowanceEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;
  showGroupName = false;

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
      transaction_unit: [null, Validators.required],
      payroll_profile: [null, Validators.required],
      ledger_account: [null],
      must_apply_for:[false, Validators.required],
      use_global_rate:[false, Validators.required],
      is_taxable: [false, Validators.required],
      group_item: [false, Validators.required],
      groupname_id: [null],
      sys_rule: [null]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IVariableAllowance
  ) {
    if (data) {
       this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IVariableAllowance): IVariableAllowance | {} {
    if (data) {

      return {
        code:data.code,
        description: data.description,
        ordering_rank: data.ordering_rank,
        shortname: data.shortname,
        is_taxable: data.is_taxable.toLowerCase() === 'yes' ? true : false,
        transaction_unit: data.transaction_unit,
        payroll_profile: data.payroll_profile,
        ledger_account: data.ledger_account,
        must_apply_for: data.must_apply_for.toLowerCase() === 'yes' ? true : false,
        use_global_rate: data.use_global_rate.toLowerCase() === 'yes' ? true : false,
        group_item: data.group_item.toLowerCase() === 'yes' ? true : false,
        groupname_id: data.groupname_id,
        sys_rule: data.sys_rule

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
        ordering_rank: {
        fieldTitle: `Rank`,
        required: `This field is required.`
      },
        transaction_unit: {
        fieldTitle: `Transaction Unit`,
        required: `This field is required.`
      },
        payroll_profile: {
        fieldTitle: `Payroll Profile`,
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
