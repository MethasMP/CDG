import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosestFacilityComponent } from './closest-facility.component';

describe('ClosestFacilityComponent', () => {
  let component: ClosestFacilityComponent;
  let fixture: ComponentFixture<ClosestFacilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosestFacilityComponent]
    });
    fixture = TestBed.createComponent(ClosestFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
