import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface ITransactionComment {
    employee_id: number;
    progress_trans_id: number;
    comment_by: number;
    role: number;
    comment: string;
    email_sent: boolean;
    doc_url: string;
    doc_binary: string;
    doc_extension: string;
    doc_mime: string;
    doc_guid: string;
    CommentByInfo: IPersonal;
    created_date: Date;
    id: number;
}