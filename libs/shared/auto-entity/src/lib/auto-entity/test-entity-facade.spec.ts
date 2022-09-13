import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { TestEntityFacade } from './test-entity-facade';
import { TestEntity } from './test-entity';
import { TestEntityService } from './test-entity-service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FEATURE_NAME, testFeatureReducer } from './test-entity-state';
import { ENVIRONMENT } from '../environment.token';
import { TestBed } from '@angular/core/testing';
import { getEntityInfo } from '../../test-setup';
import { SharedAutoEntityModule } from '@myorg/test-auto-entity';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';

describe( 'TestEntityFacade', () => {
  let facade: TestEntityFacade;
  let mockEntityService: TestEntityService;

  beforeEach( async () => {
    mockEntityService = MockService( TestEntityService, {loadAll: () => of([{id: 1}, {id: 2}])});

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([]),
        HttpClientModule,
        NgrxAutoEntityModule.forFeature(),
        SharedAutoEntityModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(FEATURE_NAME, testFeatureReducer),
        StoreDevtoolsModule.instrument({maxAge: 25, autoPause: true }),
      ],
      providers: [
        { provide: ENVIRONMENT, useValue: { rootUrl: 'http://localhost:3000' }},
//        { provide: TestEntity, useClass: TestEntityService },
        { provide: TestEntity, useValue: mockEntityService }
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
    facade.loadAll();
    facade.all$.subscribe( entities => {
      expect(entities.length).toEqual( 2 );
      expect(entities[0].id).toEqual(1);
      done();
    })
  })
})
