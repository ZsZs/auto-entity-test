import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { TestEntity } from './test-entity';

export const { initialState, facade: TestEntityFacadeBase } = buildState( TestEntity );

export function testEntityReducer( state = initialState ): IEntityState<TestEntity> {
  return state;
}
