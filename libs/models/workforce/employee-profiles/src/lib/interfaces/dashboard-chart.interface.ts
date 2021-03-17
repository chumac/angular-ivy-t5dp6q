import { IGenderCount } from './gender-count.interface';
import { IAgeCount } from './age-count.interface';
import { IServiceCount } from './service-length-count.interface';


export interface IDashboardChart {
  TotalCount: number;
  GendersCount: IGenderCount[];
  AgeCount: IAgeCount[];
  ServiceLength: IServiceCount[];
  JoinersCount: number;
  LeaversCount: number;
};