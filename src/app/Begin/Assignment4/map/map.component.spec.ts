import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent4 } from './map4.component';

describe('MapComponent', () => {
  let component: MapComponent4;
  let fixture: ComponentFixture<MapComponent4>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent4]
    });
    fixture = TestBed.createComponent(MapComponent4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
