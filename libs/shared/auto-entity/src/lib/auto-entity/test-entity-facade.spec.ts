import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { TestEntityFacade } from './test-entity-facade';
import { TestEntity } from './test-entity';
import { TestEntityService } from './test-entity-service';
import { FEATURE_NAME, testFeatureReducer } from './test-entity-state';
import { TestBed } from '@angular/core/testing';
import { getEntityInfo } from '../../test-setup';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';

describe( 'TestEntityFacade', () => {
  let facade: TestEntityFacade;
  let mockEntityService: TestEntityService;

  beforeEach( async () => {
    mockEntityService = MockService( TestEntityService, {
      loadAll: () => of([{id: 1}, {id: 2}])
    });

    await TestBed.configureTestingModule({
      imports: [
        NgrxAutoEntityModule.forFeature(),
        StoreModule.forRoot({}),
        StoreModule.forFeature(FEATURE_NAME, testFeatureReducer),
      ],
      providers: [
        { provide: TestEntity, useValue: mockEntityService },
        TestEntityFacade
      ]
    }).compileComponents();
  });

  beforeEach( () => {
    facade = TestBed.inject( TestEntityFacade );
  })

  it( 'facade & mock created', () => {
    expect( facade ).toBeTruthy();
    expect( mockEntityService ).toBeTruthy();
  })

  it( 'service.loadAll() is properly mocked.', done => {
    mockEntityService.loadAll( getEntityInfo( TestEntity )).subscribe( entities => {
      expect(entities.length).toEqual( 2 );
      expect(entities[0].id).toEqual(1);
      done();
    })
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
