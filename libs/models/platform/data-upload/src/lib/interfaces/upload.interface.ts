export interface IUpload {
      file_details:string;
      destination: number;
      delimeter: string;
      filename: string;
      id:number;
      datadestination:string;
      import_date:Date;
      reverse_date:Date;
      report_key:number;
      uploadstatus:string;
      verification_id:string;
      sys_message:string;
      total_records:string;
      import_table_index:number;
      is_reversible:boolean;
  }

export interface ITemplateImport {
  id:number;
  description:string;
  upload_template:string;
  is_reversible:string;
}

export interface IUploadStatus{
  id:number;
  transaction_date:Date;
  error_msg:string;
  import_request_id:number;
  sessiontype:number;
  import_table_index:number;
}
