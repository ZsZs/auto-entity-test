import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../app.state';
import { TestEntityFacade } from './test-entity-facade';
import { MockBuilder, MockService, ngMocks } from 'ng-mocks';
import { TestEntity } from './test-entity';
import { TestEntityService } from './test-entity-service';
import { of } from 'rxjs';

describe( 'TestEntityFacade', () => {
  let facade: TestEntityFacade;

  beforeEach( () => {
    return MockBuilder()
      .keep(BrowserModule)
      .keep(EffectsModule.forRoot([]))
      .keep(NgrxAutoEntityModule.forRoot())
      .keep(StoreModule.forRoot(appReducer))
      .provide({ provide: TestEntity, useValue: MockService( TestEntityService, {loadAll: () => of([{id: 1}, {id: 2}])})})
  })

  beforeEach( () => {
    facade = ngMocks.findInstance( TestEntityFacade );
  })

  it( 'facade is created', () => {
    expect( facade ).toBeTruthy();
  })

  it( 'loadAll() retrieves all entities.', done => {
    facade.all$.subscribe( entities => {
      expect(entities.length).toEqual( 2 );
      expect(entities[0].id).toEqual(1);
      done();
    })
    expect( facade.loadAll() ).toBeTruthy();
  })
})
