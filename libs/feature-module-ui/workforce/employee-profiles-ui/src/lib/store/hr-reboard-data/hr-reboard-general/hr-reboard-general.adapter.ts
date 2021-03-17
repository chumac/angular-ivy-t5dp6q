import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';

export const hrReboardGeneralAdapter: EntityAdapter<IGeneral> = createEntityAdapter<
  IGeneral
>();

export const {
  selectIds: selectReboardGeneralIds,
  selectEntities: selectReboardGeneralEntities,
  selectAll: selectAllReboardGenerals,
  selectTotal: ReboardGeneralCount
} = hrReboardGeneralAdapter.getSelectors();
