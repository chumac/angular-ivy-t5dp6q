import { IFormBuilder } from "./form-builder.interface";

export interface ICustomForm{
    id:number;
    code : string;
    description: string;
    title: string;
    type: number;
    area: number;
    scope: number;
    eligibility: number;
    type_text: string;
    area_text: string;
    scope_text: string;
    eligibility_text: string;
    workflow_text: string;
    business_rule: string;
    workflow_id: number;
    has_document_attach: boolean;
    form_json: string;
    is_published: boolean
 }
 