export interface IRatingAssetDetail {
    id: number;
    rating_table_id: number;
    title: string;
    detail: string;
    weight: number;
    info: string;
    emp_rating_list: string;
    emp_comment_rq: boolean;
    mgr_rating_list: string;
    mgr_comment_rq: boolean;
    max_rating: number;
    grouping_category: string;
}
