import { IPosition } from "@nutela/models/workforce/personnel";

export interface IDesignationDefinition {
  title_id: number;
  title_code: string;
  description: string;
  mis_code: string;
  PositionInfo: IPosition;
}
