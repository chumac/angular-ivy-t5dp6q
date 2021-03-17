import { ICity, IState, ICountry } from '@nutela/models/core-data';

export interface IBeneficiary {
  beneficiary_id: number;
  employee_id: number;
  title: string;
  surname: string;
  firstname: string;
  othernames: string;
  gender: string;
  address_line1: string;
  address_line2: string;
  areaInfo: ICity;
  stateInfo: IState;
  CityInfo: ICity;
  StateInfo: IState;
  countryInfo: ICountry;
  NationalityInfo: ICountry;
  nationality_id?:number;
  state_id?:number;
  city_id?:number;
  area: ICity;
  state: IState;
  country: ICountry;
  phone_no: string;
  email: string;
  percentage: number;
  archive_status: boolean;
  approval_status: number;
  approval_status_text: string;
  relationship_type: string;
  relationship_type_text: string;
  img_extension: string;
  img_url: string;
  img_guid: string;
  img_size: string;
  passport_picture: string;
  img_extension_passport: string;
}
