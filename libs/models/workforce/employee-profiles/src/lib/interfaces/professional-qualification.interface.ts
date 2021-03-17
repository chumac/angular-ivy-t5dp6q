import { IInstitution, IQualification, IProfessionalAward } from "@nutela/models/talent/learning";
export interface IProfessionalQualification {
  proqual_id: number;
  employee_id: number;
  institution: IInstitution;
  institution_id:number;
  qualification: IQualification;
  qualification_id:number;
  proAwards: IProfessionalAward;
  award: IProfessionalAward;
  award_id:number;
  membershipID: string;
  year_of_award: Date;
  requirement_type: number;
  requirement_type_text: string;
  req_renewal: boolean;
  next_renewal_date: Date;
  archive_status: boolean;
  approval_status: number;
  approval_status_text: string;
  certificate_picture: string;
  img_extension: string;
  img_url: string;
  img_guid: string;
  img_size: number;
}
