import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IContact } from '@nutela/models/workforce/employee-profiles';

export const contactAdapter: EntityAdapter<IContact> = createEntityAdapter<IContact>();

export const {
  selectIds: selectContactIds,
  selectEntities: selectContactEntities,
  selectAll: selectAllContacts,
  selectTotal: ContactCount
} = contactAdapter.getSelectors();
