export interface ICustomProcessMap{
    id:number;
    process_id: number;
    section_title: string;
    description: string;
    rank: number;
    form_id: number;
    role: number;
    emp_role_perm: number;
    has_attachment: boolean;
    has_comment: boolean;
    business_rule: string;
    form_text: string;
    role_text: string;
    emp_role_perm_text: string;
    form_json: string;
}