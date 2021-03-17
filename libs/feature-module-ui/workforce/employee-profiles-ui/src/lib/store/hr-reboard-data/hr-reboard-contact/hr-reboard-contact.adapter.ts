import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IContact } from '@nutela/models/workforce/employee-profiles';

export const hrReboardContactAdapter: EntityAdapter<IContact> = createEntityAdapter<IContact>();

export const {
  selectIds: selectReboardContactIds,
  selectEntities: selectReboardContactEntities,
  selectAll: selectAllReboardContacts,
  selectTotal: ReboardContactCount
} = hrReboardContactAdapter.getSelectors();
