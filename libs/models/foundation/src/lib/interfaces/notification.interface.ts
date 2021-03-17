import { ISystem } from "./system.interface";
import { IPositionInfo } from "./position.interface";

export interface INotification{
    id:number;
    sysentity_id:number;
    SysEntitesInfo:ISystem;
    process_id:number;
    group_type:number;
    group_value:string;
    position_id:number;
    PositionInfo:IPositionInfo;
    org_id:number;
    final_actiontype:number;
}