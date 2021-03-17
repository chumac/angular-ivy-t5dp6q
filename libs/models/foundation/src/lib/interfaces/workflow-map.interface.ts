import { ISystem } from "./system.interface";
import { IWorkDefinition } from "./work-definition.interface";

export interface IWorkflowMap{
    id:number;
    entity_id:number;
    wflow_id :number;
    entitydescription: string;
    description:string;
    SysEntitesInfo:ISystem;
    WorkflowDefintionInfo:IWorkDefinition;
    }
