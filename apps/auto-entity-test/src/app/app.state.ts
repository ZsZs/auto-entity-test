import { IEntityState } from '@briebug/ngrx-auto-entity';
import { TestEntity } from './auto-entity/test-entity';
import { ActionReducerMap } from '@ngrx/store';
import { testEntityReducer } from './auto-entity/test-entity-state';

export interface IAppState {
  testEntity: IEntityState<TestEntity>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
  testEntity: testEntityReducer
}
