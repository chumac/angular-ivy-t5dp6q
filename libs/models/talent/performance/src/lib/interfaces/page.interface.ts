export interface IPage {
    id: number;
    asset_type: number;
    asset_key: string;
    parent_id: number;
    code: string;
    description: string;
    widget: number;
    json_properties: string;
    eligibility: number;
    rank: number;
    perm_emp: number;
    perm_lm: number;
    perm_reviewer: number;
    perm_moderator: number;
    perm_hr: number;
    perm_reviewer_assessing: number;
    title: string;
    sub_title: string;
    widget_guid: string;
}
