
import { IBusinessOption } from "@nutela/models/core-data";

export interface IBusinessOptionDataState {
  options: IBusinessOption[]
 }

 export const initialBusinessOptionDataState: IBusinessOptionDataState = {
  options: []
 };
