import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ISelectOptionData } from '@nutela/models/common';

export const selectOptionDataAdapter: EntityAdapter<
  ISelectOptionData
> = createEntityAdapter<ISelectOptionData>();

export const {
  selectIds: selectSelectOptionIds,
  selectEntities: selectSelectOptionEntities,
  selectAll: selectAllSelectOptions,
  selectTotal: SelectOptionCount
} = selectOptionDataAdapter.getSelectors();
