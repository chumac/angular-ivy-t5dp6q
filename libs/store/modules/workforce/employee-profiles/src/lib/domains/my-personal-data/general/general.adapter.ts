import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';

export const generalAdapter: EntityAdapter<IGeneral> = createEntityAdapter<
  IGeneral
>();

export const {
  selectIds: selectGeneralIds,
  selectEntities: selectGeneralEntities,
  selectAll: selectAllGenerals,
  selectTotal: GeneralCount
} = generalAdapter.getSelectors();
