import { IAnalysisDetail } from "./analysis-detail.interface";

export interface IEnterpriseStructure {
  analysis_id: number;
  analysis_code: string;
  description: string;
  analysis_detailsInfo: IAnalysisDetail[]
}
