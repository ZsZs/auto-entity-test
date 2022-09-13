import { MockBuilder, ngMocks } from 'ng-mocks';
import { TestEntityService } from './test-entity-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getEntityInfo } from '../../test-setup';
import { TestEntity } from './test-entity';
import { ENVIRONMENT, SharedAutoEntityModule } from '@myorg/test-auto-entity';

describe('TestEntityService', () => {
  const testEntities: TestEntity[] = [{id: 1}, {id: 2}];
  let httpMock: HttpTestingController;
  let testEntityService: TestEntityService;

  beforeEach( () => {
    return MockBuilder(TestEntityService, SharedAutoEntityModule)
      .replace( HttpClientModule, HttpClientTestingModule )
      .provide({ provide: ENVIRONMENT, useValue: { rootUrl: 'http://localhost:4200' }})
  })

  beforeEach( () => {
    httpMock = ngMocks.findInstance(HttpTestingController);
    testEntityService = ngMocks.findInstance( TestEntityService );
  })

  it( 'creates service and httpMock', () => {
    expect(testEntityService).toBeTruthy();
    expect(testEntityService).toBeInstanceOf(TestEntityService);

    expect(httpMock).toBeTruthy();
  })

  it( 'loadAll() retrieves entities.', () => {
    let response: TestEntity[];

    testEntityService.loadAll( getEntityInfo( TestEntity ) ).subscribe( entities => {
      response = entities;
    });
    const request = httpMock.expectOne('http://localhost:4200/TestEntity');
    expect( request.request.method ).toEqual('GET');
    request.flush(testEntities);
    httpMock.verify();

    // @ts-ignore
    expect( response ).toEqual( testEntities );
  })
})
