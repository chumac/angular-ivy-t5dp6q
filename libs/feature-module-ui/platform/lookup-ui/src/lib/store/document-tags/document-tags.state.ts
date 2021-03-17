import { IDocumentTags } from "@nutela/models/platform/lookup";

export interface IDocumentTagsState {
  documentTagData: IDocumentTags[];
  showEditor:boolean;
  isProcessing: boolean;
 
}

export const initialDocumentTagsState: IDocumentTagsState = {
  documentTagData: [],
  showEditor: false,
  isProcessing: false,
}

