export interface IEventDetail {
  id?: number;
  course?: string;
  start?: string;
  end_date?: string;
  status_id?: number;
  status_text?: string;
  subject?: string;
  facilitator?: string;
  max_class_size?: number
}

export interface IEventDetailData {
  id: number,
  course_id: number,
  course_id_text: string,
  event_title: string,
  code: string,
  description: string,
  detail: string,
  event_type: number,
  event_type_text: string,
  is_e_learning: boolean,
  is_self_initiated: boolean,
  start_date: string,
  end_date: string,
  organized_by: number,
  approval_status: number,
  is_active: boolean,
  employees_can_apply: boolean,
  application_open_date: string,
  application_close_date: string,
  has_certification: boolean,
  use_kudos: boolean,
  kudos_pay: string,
  kudos_receipt: string,
  status: number,
  status_text: string,
  in_active_reason: string,
  is_publishable: boolean
}

export interface IEventDetailFaculty {
  id: number,
  fac_title: string,
  fac_name: string,
  event_id: number,
  event_text: string
}

export interface IEventDetailType {
  id: number,
  description: string
}

export interface IEventDetailPreRequisites {
  id: number,
  event_id: number,
  event_text: string,
  pre_requisite_type_text: string,
  pre_requisite_type: number,
  course_id: number,
  course_text: string
}

export interface IEventDetailPreRequisitesType {
  id: number,
  description: string
}

export interface IEventDetailAssets {
  id: number,
  event_id: number,
  event_text: string,
  asset_availability: number,
  asset_availability_text: string,
  asset_type: number,
  asset_type_text: string,
  asset_filename: string,
  asset_filename_upload: string,
  asset_guid: string,
  asset_url: string,
  asset_ext: string,
  asset_size: number,
  asset_mime: any
}

export interface IEventDetailAssetAvaiability {
  id: number,
  description: string
}

export interface IEventDetailAssetType {
  id: number,
  description: string
}

export interface IEventDetailFacilitators {
  id: number,
  event_id: number,
  event_text: string,
  fac_type: number,
  fac_type_text: string,
  email_address: string,
  fac_title: string,
  fac_firstname: string,
  fac_surname: string,
  doc_filename: string,
  doc_filename_upload: string,
  img_filename: string,
  img_filename_upload: string,
  doc_guid: string,
  doc_url: string,
  doc_size: number,
  doc_ext: string,
  doc_mime: string,
  img_guid: string,
  img_url: string,
  img_ext: string,
  img_size: number,
  img_mime: string
}

export interface IEventDetailFacilitatorsType {
  id: number,
  description: string
}

export interface IEventDetailFeedbackForms {
  id: number,
  event_id: number,
  event_text: string,
  form_id: number,
  form_text: string,
  form_availability: number,
  form_availability_text: string,
  no_of_months_after: number,
  feedback_role: number,
  feedback_role_text: string
}


export interface IEventDetailCustomForms {
  id: number,
  process_id: number,
  section_title: string,
  description: string,
  rank: number,
  form_id: number,
  role: number,
  emp_role_perm: number,
  has_attachment: boolean,
  has_comment: boolean,
  business_rule: string
}

export interface IEventDetailFormAvailability {
  id: number,
  description: string
}

export interface IEventDetailFeedbackRole {
  id: number,
  description: string
}

export interface IEventEmployee {
  employee_id: number,
  employee_number: string,
  employee_surname: string,
  employee_midname: string,
  employee_firstname: string,
  logon_name: string
}

export interface INominationCreate {
  employee_id: number,
  event_id: number,
  nominated_reason: string
}