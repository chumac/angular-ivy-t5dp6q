import { ChartTypes } from "../enumerations";
import { IConcentraDataPoint } from "./concentria-data-point.interface";

export interface IConcentriaData {
  headerText: string;
  type: ChartTypes;
  width: number;
  percent: number;
  rank: number;
  
  ring1Caption: string;
  ring2Caption: string;
  ring3Caption: string;

  dataPoint1: IConcentraDataPoint;
  dataPoint2: IConcentraDataPoint;
  dataPoint3: IConcentraDataPoint;
}


