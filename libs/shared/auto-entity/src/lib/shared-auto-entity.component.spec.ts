import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAutoEntityComponent } from './shared-auto-entity.component';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, testFeatureReducer } from './auto-entity/test-entity-state';

describe('SharedAutoEntityComponent', () => {
  let component: SharedAutoEntityComponent;
  let fixture: ComponentFixture<SharedAutoEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), StoreModule.forFeature(FEATURE_NAME, testFeatureReducer)],
      declarations: [SharedAutoEntityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedAutoEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
