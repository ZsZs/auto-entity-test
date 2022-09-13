import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({ modelName: 'TestEntity' })
export class TestEntity {
  @Key id?: number | undefined;
  dummyProperty?: string | undefined;
}

export const INITIAL_TEST_ENTITY_VALUE: TestEntity = {
  id: 1,
  dummyProperty: 'anything'
}
