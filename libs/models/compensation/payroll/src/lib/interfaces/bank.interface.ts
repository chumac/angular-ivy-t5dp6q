import { ICity, IState, ICountry } from "@nutela/models/core-data";

export interface IBank{
  bank_id:number;
  bank_code:string;
  description:string;
  street1:string;
  street2:string;
  cityInfo:ICity;
  stateInfo:IState;
  countryInfo:ICountry;
  area_id:number;
  state:number;
  country:number;
  zip:string;
  shortname:string;
  tel1:string;
  tel2:string;
  contact:string;
  email:string;
  website:string;
}
