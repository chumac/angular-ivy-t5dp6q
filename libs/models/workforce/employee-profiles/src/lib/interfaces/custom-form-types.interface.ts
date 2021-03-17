export interface ICustomFormType{
    id:number;
    code : string;
    description: string;
    title: string;
    type: number;
    area: number;
    scope: number;
    eligibility: number;
    business_rule: string;
    workflow_id: number;
    has_document_attach: boolean;
    form_json: string;
 }
 