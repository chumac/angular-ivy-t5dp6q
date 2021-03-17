
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export interface IMyTeamState {
  isLoading: boolean;
  data: IPersonal[];
  profilePicMap: {[key: number]: any};
}

export const initialMyteamState: IMyTeamState = {
  isLoading: false,
  data: [],
  profilePicMap: {}
};
