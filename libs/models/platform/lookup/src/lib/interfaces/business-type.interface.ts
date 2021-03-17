export interface IBusinessType{
    biztype_id:number;
    description:string;
    archive_status?:boolean;
    approval_status?:number;
    master_rec_id?: number;
}