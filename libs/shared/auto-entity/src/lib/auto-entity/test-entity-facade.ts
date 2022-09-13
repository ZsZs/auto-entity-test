import { Injectable } from '@angular/core';
import { IFeatureState, TestEntityFacadeBase } from './test-entity-state';
import { Store } from '@ngrx/store';
import { TestEntity } from './test-entity';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';

@Injectable({providedIn: 'root'})
export class TestEntityFacade extends TestEntityFacadeBase implements IEntityFacade<TestEntity>{

  constructor( store: Store<IFeatureState> ) {
    super( TestEntity, store );
  }
}
