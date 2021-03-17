export interface ICurrentJob{
   id:number;
   employee_id : number;
   grade_id : number;
   grade_text:string;
   position_id :number;
   position_text:string;
   currentPosition:string;
   designation_id :number;
   designation_text:string;
   paygroup_id :number;
   paygroup_text:string;
}


export interface ICurrentLocation{
  currentLocationText:CurrentLocationText;
  currentLocationID :CurrentLocationID;
}

export interface CurrentLocationText{
        employee_id: number;
        current_location_type: string;
        current_location: string;
        current_location_shared_code: string;
        current_location_cost_centre_code: string;
      }

export interface CurrentLocationID{
  current_location_structure_id: number;
  current_location_details_id: number;
}
