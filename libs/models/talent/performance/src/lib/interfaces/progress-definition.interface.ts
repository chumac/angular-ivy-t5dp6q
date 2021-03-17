import { IPersonal } from "@nutela/models/workforce/employee-profiles";
import { IObjectiveDto } from "./objective-dto.interface";
import { IObjectiveMaster } from "./objective-master.interface";
import { IPerspective } from "./perspective.interface";
import { IProgressTransaction } from "./progress-transaction.interface";

export interface IProgressDefinition {
        id: number;
        description: string;
        progress_type: number;
        perc_complete: number;
        target_date: Date;
        importance: number;
        employeeInfo: IPersonal;
        objectiveInfo: IObjectiveDto;
        objective_id: number;       
        EmployeeInfo: IPersonal;
        ObjectiveMasterInfo: IObjectiveMaster;
        PerspectivesInfo: IPerspective;
        allow_self_rating: boolean;
        approval_status: number;
        due_date: Date;
        file_name: string;
        is_strategic: boolean;
        is_uploaded: boolean;
        lower_is_better: boolean;
        metric:  string;
        prob_of_success: number;
        source: number;
        start_date:  string;
        status: number;
        target:  string;
        target_type: number;
        target_type_other: string;
        visibility: number;
        weight: number;
        transactions: IProgressTransaction[];
}
