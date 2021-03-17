export interface ILeaveProrate {
  leave_id: number;
  leaveprorate_id: number;
  leave_entitlement:number;
  GradeInfo:IGradeInfo;
}

export interface IGradeInfo{
  grade_id:number,
  description:string,
  grade_code:string,
};
