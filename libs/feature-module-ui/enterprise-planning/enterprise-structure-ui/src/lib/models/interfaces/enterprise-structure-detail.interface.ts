import { IAnalysisInfo } from "./analysis-info.interface";
import { IAnalysisDetailLinkInfo } from "./analysis-detail-link-info.interface";
import { IEmployee } from "./employee.interface";
import { ICity, IState } from "@nutela/models/core-data";

import { ICountry } from "dist/libs/models/core-data";
import { IPosition } from "@nutela/models/workforce/personnel";

export interface IEnterpriseStructureDetail {
  analysis_det_id: number;
  analysis_det_code: string;
  description: string;
  address_line1: string;
  address_line2: string;
  phone_number: string;
  email: string;
  website: string;
  cost_centre_code: string;
  link_to_nonvirtual: number;
  analysis_det_id_link: number;
  shared_code: string;
  mis_code: string;
  headed_by: IEmployee;
  headed_by_position: IPosition;
  analysis_id: number;
  AnalysisInfo: IAnalysisInfo;
  AnalysisDetailsLinkInfo: IAnalysisDetailLinkInfo;
  cityInfo: ICity;
  stateInfo: IState;
  nationalityInfo: ICountry;
}
