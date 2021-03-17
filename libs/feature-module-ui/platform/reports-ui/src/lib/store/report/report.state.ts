import { IReport } from '@nutela/models/platform/report';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface IReportState {
  reportData: IReport[];
  reportSingleData: IReport;
  reportUrl: SafeResourceUrl;
  isProcessing: boolean;
}

export const initialReportState: IReportState = {
  reportData: [],
  reportSingleData: null,
  reportUrl: null,
  isProcessing: false
};
