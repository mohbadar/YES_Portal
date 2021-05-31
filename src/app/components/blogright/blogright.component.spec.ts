import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogrightComponent } from './blogright.component';

describe('BlogrightComponent', () => {
  let component: BlogrightComponent;
  let fixture: ComponentFixture<BlogrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogrightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
