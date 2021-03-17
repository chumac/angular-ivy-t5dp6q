export interface ICustomUserGroupSetup {
    id: number;
    code: string;
    description: string;
    details: string;
    has_values: boolean;
    restricted_values: string;
    sys_rule: string;
    is_restricted: boolean;

}