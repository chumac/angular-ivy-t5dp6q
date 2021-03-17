import { ICountry, IState, ICity, IBusinesType } from "@nutela/models/core-data";

export interface IHrDependant {
  dependent_id: number;
  employee_id: number;
  surname: string;
  firstname: string;
  othernames: string;
  dobirth: Date;
  gender: string;
  passport_picture: string;
  dependent_type: number;
  dependent_type_text: string;
  business_type: IBusinesType;
  address_line1: string;
  address_line2: string;
  area_id: number;
  areaInfo: ICity;
  area: ICity;
  stateInfo: IState;
  state: IState;
  country_id: number;
  countryInfo: ICountry;
  country: ICountry;
  phone_no: number;
  email: string;
  comment: string;
  hmo_id: number;
  hmoplan_id: number;
  hospital_id: number;
  org_id: number;
  archive_status: boolean;
  approval_status: number;
  img_extension: string;
  img_url: string;
  img_guid: string;
  img_size: string;
  img_extension_passport: string;
  nationality_id: number;
  state_id: number;
  city_id: number;

}
