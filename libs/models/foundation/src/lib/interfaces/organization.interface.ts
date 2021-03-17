
import { ICity, IState, ICountry } from '@nutela/models/core-data';

export interface IOrganization {
  org_id: number;
  city: string;
  country:string;
  code: string;
  email: string;
  description: string;
  user_prefix:string;
  short_name: string;
  state: string;
  street1: string;
  street2: string;
  tel_1: string;
  tel_2: string
  zip: string;
  business_type: string;
  industry:string;
  org_logo_vtwo: string;
  same_address: boolean;
  website: string;
  last_modified_by: string;
  last_modified_date: Date;
}
