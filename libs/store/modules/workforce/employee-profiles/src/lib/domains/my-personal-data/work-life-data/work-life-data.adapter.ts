import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IWorkLifeData } from '@nutela/models/workforce/employee-profiles';

export const adapter: EntityAdapter<IWorkLifeData> = createEntityAdapter<IWorkLifeData>();

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
