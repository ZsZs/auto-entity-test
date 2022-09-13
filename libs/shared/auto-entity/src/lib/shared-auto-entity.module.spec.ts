import { TestBed } from '@angular/core/testing';
import { SharedAutoEntityModule } from '@myorg/test-auto-entity';
import { StoreModule } from '@ngrx/store';

describe( 'SharedAutoEntityModule', () => {
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        SharedAutoEntityModule,
        StoreModule.forRoot({})
      ]
    })
  });

  it( 'initializes', () => {
    const module = TestBed.inject(SharedAutoEntityModule);
    expect( module ).toBeTruthy();
  })
})
