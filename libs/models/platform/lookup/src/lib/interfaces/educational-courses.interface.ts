export interface IEducationalCourses{
    course_code:string;
    description:string;
    course_id: number;
    eduCourseCategory:IEducationCategory;
}

export interface IEducationCategory{
    category_id:number;
    description:string;
}