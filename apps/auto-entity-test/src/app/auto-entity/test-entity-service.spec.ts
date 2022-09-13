import { MockBuilder, ngMocks } from 'ng-mocks';
import { TestEntityService } from './test-entity-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TestEntityService', () => {
  let httpMock: HttpTestingController;
  let testEntityService: TestEntityService;

  beforeEach( () => {
    return MockBuilder(TestEntityService)
      .replace( HttpClientModule, HttpClientTestingModule )
  })

  beforeEach( () => {
    httpMock = ngMocks.findInstance(HttpTestingController);
    testEntityService = ngMocks.findInstance( TestEntityService );
  })

  it( 'creates service', () => {
    expect(testEntityService).toBeTruthy();
  })
})
