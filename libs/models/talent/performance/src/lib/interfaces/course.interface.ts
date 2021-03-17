
export interface ICourse {
  course_id: number,
  course_code: string,
  description: string,
  isSelected: boolean,
  comment: string,
  eduCourseCategory: {
    category_id: number,
    description: string
  }
}

