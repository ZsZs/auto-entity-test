import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAutoEntityComponent } from './shared-auto-entity.component';

describe('SharedAutoEntityComponent', () => {
  let component: SharedAutoEntityComponent;
  let fixture: ComponentFixture<SharedAutoEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
