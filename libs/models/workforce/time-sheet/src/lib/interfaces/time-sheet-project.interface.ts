import { IAnalysisDetail } from "@nutela/models/workforce/personnel";

export interface ITimeSheetProject {
    id: number;
    code: string;
    sub_code: string;
    description: string;
    sys_rule: string;
    analysis_det_id: number;
    is_active: boolean;
    AnalysisDetailsMapDTO: IAnalysisDetail
  }
  