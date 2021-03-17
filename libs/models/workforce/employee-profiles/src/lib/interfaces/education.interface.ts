import { IInstitution, IQualification, ICourse, IEducationalGrade } from "@nutela/models/talent/learning";

export interface IEducation {
  edu_id: number;
  employee_id: number;
  country:string;
  InstitutionInfo: IInstitution;
  institution: IInstitution;
  institution_id: number;
  CourseInfo: ICourse;
  course: ICourse;
  course_id: number;
  graduation_year: Date;
  QualificationInfo: IQualification;
  qualification_id: number;
  qualification: IQualification;
  edugrade: IEducationalGrade;
  EdugradeInfo: IEducationalGrade;
  edugrade_id: number;
  faculty: string;
  department: string;
  matricno: string;
  location: string;
  remark: string;
  approval_status: number;
  dateref_sent: Date;
  dateref_received: Date;
  requirement_type: string;
  requirement_type_text: string;
  certificate_picture: string;
  img_size: string;
  img_url: string;
  img_extension: string;
  img_guid: string;
  Qualification: IQualification;
  Course: ICourse;
  Institution: IInstitution;
  edu_grade_text: string;
}
