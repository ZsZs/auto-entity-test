import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { TestEntityFacade } from './test-entity-facade';
import { TestEntity } from './test-entity';
import { TestEntityService } from './test-entity-service';
import { FEATURE_NAME, testFeatureReducer } from './test-entity-state';
import { MockBuilder, MockService, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';

describe( 'TestEntityFacade', () => {
  let facade: TestEntityFacade;

  beforeEach( () => {
    return MockBuilder()
      .keep(BrowserModule)
      .keep(EffectsModule.forRoot([]))
      .keep(NgrxAutoEntityModule.forRoot())
      .keep(StoreModule.forRoot( {}))
      .keep(StoreModule.forFeature(FEATURE_NAME, testFeatureReducer))
      .provide({ provide: TestEntity, useValue: MockService( TestEntityService, {loadAll: () => of([{id: 1}, {id: 2}])})})
  })

  beforeEach( () => {
    facade = ngMocks.findInstance( TestEntityFacade );
  })

  it( 'facade & mock created', () => {
    expect( facade ).toBeTruthy();
  })

  it( 'loadAll() retrieves all entities.', done => {
    facade.all$.subscribe( entities => {
      console.log( 'entities: ', entities );
      expect(entities.length).toEqual( 2 );
      expect(entities[0].id).toEqual(1);
      done();
    })
    expect( facade.loadAll() ).toBeTruthy();
  })
})
