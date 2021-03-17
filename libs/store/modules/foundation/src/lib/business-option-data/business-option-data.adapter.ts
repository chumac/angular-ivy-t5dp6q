import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IBusinessOption } from '@nutela/models/core-data';

const businessOptionDataAdapter: EntityAdapter<IBusinessOption> = createEntityAdapter<IBusinessOption>();

const {
  selectIds: selectBusinessOptionIds,
  selectEntities: selectBusinessOptionEntities,
  selectAll: selectAllBusinessOptions,
  selectTotal: BusinessOptionCount
} = businessOptionDataAdapter.getSelectors();
