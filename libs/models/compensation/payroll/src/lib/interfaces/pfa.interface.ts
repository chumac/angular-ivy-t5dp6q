import { ICity, IState, ICountry } from "@nutela/models/core-data";
import { IBank } from "./bank.interface";

export interface IPfa{
  pfa_id:number;
  pfa_code:string;
  description:string;
  street1:string;
  street2:string;
  cityInfo:ICity;
  stateInfo:IState;
  countryInfo:ICountry;
  area_id:number;
  state_id:number;
  country_id:number;
  zip:string;
  shortname:string;
  tel1:string;
  tel2:string;
  contact:string;
  email:string;
  website:string;
  bankInfo:IBank;
  pfc_id:number;
  pfc_account_no:string;
  pfa_schedule_contact:string;
  pfa_schedule_contact_title:string;
  pfa_schedule_email:string;
}
