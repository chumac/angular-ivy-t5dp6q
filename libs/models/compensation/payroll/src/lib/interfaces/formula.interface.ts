import { IRole } from "@nutela/models/foundation";
import { IProfile } from "./profile.interface";

export interface IFormula {
  id: number;
  formula_id: number;
  formula_code: string;
  description: string;
  formula_text: string;
  is_system_formula: boolean;
  status: string;
  archive_status: boolean;
  comp_status: number;
  restrict_to_role: boolean;
  role_list: IRole[]
  link_to_profile: boolean;
  PayrollProfileInfo: IProfile;
  payroll_profile_id: number;
  payroll_profile: string;
}

