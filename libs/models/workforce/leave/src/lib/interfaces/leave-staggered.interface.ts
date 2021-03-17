import { ILeaveStaggeredMaster } from "./leave-staggered-master.interface";
import { ILeaveStaggeredDetail } from "./leave-staggered-detail.interface";

export interface ILeaveStaggered {
  DetailsModel?: ILeaveStaggeredDetail;
  MasterModel?: ILeaveStaggeredMaster;
}
