export interface IQualifications{
    qualification_code:string;
    description:string;
    qualification_category:number;
    qualification_type:number;
    qualification_id: number;
    QualCategoryInfo:IQualCategoryInfo;
}

export interface IQualCategoryInfo{
category_id: number;
description: string;
}
