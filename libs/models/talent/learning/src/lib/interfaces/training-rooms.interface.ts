import { ICity, ICountry, IState } from "@nutela/models/core-data";

export interface ITrainingRooms {
  id?: number;
  code?: string;
  description?: string;
  capacity?: number;
  address?: string;
  city?: number;
  state?: number;
  country?: number ;
  CityInfo?: ICity;
  CountryInfo?: ICountry; 
  StateInfo?: IState;
}