
export interface IAnnouncement {
  announcement_id: number,
  employee_id:number,
  template_key: number,
  subject: string,
  html_content: string,
  image_url: string,
  created_by: string,
  created_date: Date,
  expiry_date: Date,
  is_published: boolean,
  publish_date: Date,
  org_id: number,
  image_filename: string,
  Username: string
}
