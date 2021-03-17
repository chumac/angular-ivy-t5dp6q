import { IAsset, IReviewForm } from ".";

export interface IFormTemplateDetail {
    id: number;
    review_form_id: number;
    asset_type: number;
    asset_id: number;
    weight: number;
    page_rank: number;
    is_active: boolean;
    perm_emp: number;
    perm_lm: number;
    perm_reviewer: number;
    perm_moderator: number;
    perm_hr: number;
    perm_reviewer_assessing: number;
    AssetInfo: IAsset;
    ReviewFormInfo: IReviewForm
    perspective_filter_id: number;

}