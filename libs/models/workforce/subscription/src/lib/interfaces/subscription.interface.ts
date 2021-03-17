import { ISubscriptionType } from "./subscription-type.interface";
import { IMembershipInfo } from "./membership-info.interface";

export interface ISubscription {
    id: number;
    is_refund: boolean;
    HrSubcriptionType: ISubscriptionType;
    HrSubcriptionTypeList: IMembershipInfo;
    details: string;
    EmployeeList: null;
    status: number;
    approval_status: number;
    doc_extension: string;
    doc_binary: any;
    doc_url: string;
    doc_size: number;
    doc_guid: string;
    created_date: Date;
    request_refund_amount: number;
    currency: string;
    membership_number: string;
    organization_name: string;
  }
  