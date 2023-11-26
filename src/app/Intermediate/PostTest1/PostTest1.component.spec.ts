import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTest1 } from './PostTest1.component';

describe('PostTest1Component', () => {
  let component: PostTest1;
  let fixture: ComponentFixture<PostTest1>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostTest1]
    });
    fixture = TestBed.createComponent(PostTest1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
