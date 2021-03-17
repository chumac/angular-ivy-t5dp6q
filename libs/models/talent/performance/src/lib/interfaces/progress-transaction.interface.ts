import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IObjectiveDto } from "./objective-dto.interface";
import { IProgressDefinition } from "./progress-definition.interface";
import { ITransactionComment } from "./transaction-comment.interface";

export interface IProgressTransaction {   
    transaction_date: Date;
    progress_type_id: number;
    progress_type: number;
    perc_complete: number;
    actual_complete_date: Date;
    comment: string;
    doc_binary: string;
    doc_extension: string;
    is_active: boolean;

    Mgr_feedback: string;
    doc_guid: string;
    doc_url: string;
    email_sent: boolean;
    employeeInfo: IPersonal;
    feedback_email_sent: boolean;
    id: number;
    progressDefDto: IProgressDefinition;
    reportsToInfo: IPersonal;
    status: number;
    ProgressTransactionCommentList: ITransactionComment;
    description: string;
}
