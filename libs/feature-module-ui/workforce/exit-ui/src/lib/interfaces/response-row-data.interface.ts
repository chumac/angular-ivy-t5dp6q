import { ISelectOption } from "@nutela/models/core-data";

export interface IResponseRowData {
  option_values: ISelectOption[];
  validator_comment: string;
  selected_option: string;
  instruction: string;
  requires_comment: string;
  resignation_id: number;
  employee_id: number;
  checklist_trans_id: number;
  description: string;
  summary: string;
  is_validated: string;
  validated_by: string;
}
