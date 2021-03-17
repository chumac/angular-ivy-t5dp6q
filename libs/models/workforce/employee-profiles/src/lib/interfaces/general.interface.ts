import {
  ILGA,
  ICity,
  IState,
  ICountry,
  IReligion
} from '@nutela/models/core-data';
import { IEmployeeSummary } from './employee-summary.interface';

export interface IGeneral {
  ess_emp_id: number;
  title: string;
  employee_number: string;
  employee_surname: string;
  employee_midname: string;
  employee_firstname: string;
  employee_id: number;
  EmployeeInfo: IEmployeeSummary
  marital_status: string;
  gender: string;
  employee_fileno: string;
  date_of_birth: Date;
  maiden_name: string;
  homeplace: string;
  wedding_date: Date;
  emp_twitterhandle: string;
  emp_facebook: string;
  emp_linkedin: string;
  emp_fullname: string;
  logon_name: string;
  is_image_prof_upd: boolean;
  is_image_file_upd: boolean;
  birth_country: ICountry;
  BirthCountryInfo: ICountry;
  birthstate: IState;
  BirthStateInfo: IState;
  area: ICity;
  AreaInfo: ICity;
  nationality: ICountry;
  NationalityInfo: ICountry;
  state: IState;
  StateInfo: IState;
  lga: ILGA;
  LGAInfo: ILGA;
  religion: IReligion;
  ReligionInfo: IReligion;
  additional_document: string;
  img_size: number;
  img_extension: string;
  area_id:  number;
  image_personal: string;
  image_profile: string;
  img_guid:string;
  img_url: string;
  img_personal_extension_passport: string;
  img_profile_extension_passport: string;
  sys_surname:string;
  sys_firstname:string;
  sync_surname: string;
  sync_firstname: string;
}
