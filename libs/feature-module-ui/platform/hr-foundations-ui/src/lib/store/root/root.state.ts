
import { IOrganizationState } from "../organization";
import { IOptionsState } from "../option";
import { INotificationState } from "../notification";
import { IWorkDefinitionState } from "../workflow-definition";
import { IWorkflowMapState } from "../workflow-map";
import { createFeatureSelector } from "@ngrx/store";
import { ISystemState } from "../system";
import { IEmailState } from "../email";
import { IWorkDetailsState } from "../workflow-details";
import { IWorkflowMapAlternateState } from "../alt-workflow-map";
import { ISecurityState } from "../security";
import { IReportState } from "../report";



export interface IHRFoundationState {
  organization: IOrganizationState;
  Options: IOptionsState;
  notification: INotificationState;
  workDefinition: IWorkDefinitionState;
  workFlowMap: IWorkflowMapState;
  system: ISystemState;
  email: IEmailState;
  workDetails: IWorkDetailsState;
  altWorkFlowMap: IWorkflowMapAlternateState;
  report: IReportState;
  security: ISecurityState;
}

export const initialState: IHRFoundationState = {
  organization: null,
  Options: null,
  notification: null,
  workDefinition: null,
  workFlowMap: null,
  system: null,
  email: null,
  workDetails: null,
  altWorkFlowMap: null,
  report: null,
  security: null,
};

export const getHRFoundationState = createFeatureSelector<IHRFoundationState>('hr-foundation');


