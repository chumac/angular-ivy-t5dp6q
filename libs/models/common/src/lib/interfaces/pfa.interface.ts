import { IBank } from './bank.interface';
import { ICity, IState, ICountry } from '@nutela/models/core-data';

export interface IPFA {
  pfa_id: number;
  pfa_code: string;
  description: string;
  street1: string;
  street2: string;
  cityInfo: ICity;
  stateInfo: IState;
  zip: string;
  countryInfo: ICountry;
  shortname: string;
  tel1: string;
  tel2: string;
  contact: string;
  email: string;
  website: string;
  bankInfo: IBank;
  pfc_account_no: string;
  pfa_schedule_contact: string;
  pfa_schedule_contact_title: string;
  pfa_schedule_email: string;
}
