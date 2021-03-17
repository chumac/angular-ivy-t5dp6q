import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ILookupData } from '@nutela/models/common';

export const lookupDataAdapter: EntityAdapter<
  ILookupData
> = createEntityAdapter<ILookupData>();

// export const {
//   selectIds: selectLookupIds,
//   selectEntities: selectLookupEntities,
//   selectAll: selectAllLookups,
//   selectTotal: LookupCount
// } = lookupDataAdapter.getSelectors();

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = lookupDataAdapter.getSelectors();

// select the array of ids
export const selectLookupIds = selectIds;

export const selectLookupEntities = selectEntities;

export const selectAllLookup = selectAll;

export const selectLookupTotal = selectTotal;
