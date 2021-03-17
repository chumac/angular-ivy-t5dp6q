export interface IRatingAssetDefinition {
    id: number;
    title: string;
    description: string;
    allow_self_rating: boolean;
    use_rating_stars: boolean;
    widget_guid: string;
    is_for_360: boolean;
    role_360: number;
    role_360_anon_emp: number;
}