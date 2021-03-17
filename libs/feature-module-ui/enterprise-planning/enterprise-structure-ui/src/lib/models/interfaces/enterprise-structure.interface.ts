import { IEnterpriseStructureDetail } from "./enterprise-structure-detail.interface";

export interface IEnterpriseStructure {
  analysis_id: number
  analysis_Code: string;
  description: string;
  usefor_organization_chart: boolean;
  ranking: number;
  has_address: boolean;
  Known_type: string;
  can_transfer: boolean;
  analysis_id_link: number;
  has_virtual_links: boolean;
  analysisDetailsInfo: IEnterpriseStructureDetail[];
}
