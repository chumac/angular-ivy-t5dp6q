import { IBasicData } from "dist/libs/models/core-data";

export interface ISubscriptionDefinition {
    id: number;
    asset_id: number;
    widget_guid: string;
    subscription_type: number;
    FormBuilderInfo: IBasicData
}