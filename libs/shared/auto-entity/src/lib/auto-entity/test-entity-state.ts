import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { INITIAL_TEST_ENTITY_VALUE, TestEntity } from './test-entity';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const FEATURE_NAME = 'test-feature';

export interface IFeatureState {
  testEntity: IEntityState<TestEntity>;
}

export const featureStateSelector = createFeatureSelector<IFeatureState>( FEATURE_NAME );

export const { initialState, facade: TestEntityFacadeBase } = buildFeatureState( TestEntity, FEATURE_NAME, featureStateSelector, INITIAL_TEST_ENTITY_VALUE );

export function testEntityState( state = initialState ): IEntityState<TestEntity> {
  return state;
}

export const testFeatureReducer: ActionReducerMap<IFeatureState> = {
  testEntity: testEntityState
}
