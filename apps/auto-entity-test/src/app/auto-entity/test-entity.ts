import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({ modelName: 'TestEntity' })
export class TestEntity {
  @Key id: number | undefined;
}
