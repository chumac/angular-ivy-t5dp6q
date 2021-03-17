import { IDocument, IDocumentType } from '@nutela/models/platform/document';

export interface IDocumentState {
  documentType: IDocumentType[];
  documentData: IDocument[];
  isProcessing: boolean;
  isLoading: boolean;
}

export const initialDocumentState: IDocumentState = {
  documentType: [],
  documentData: [],
  isProcessing: false,
  isLoading: false
};
