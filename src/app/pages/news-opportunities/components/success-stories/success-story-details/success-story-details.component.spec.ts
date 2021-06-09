import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStoryDetailsComponent } from './success-story-details.component';

describe('SuccessStoryDetailsComponent', () => {
  let component: SuccessStoryDetailsComponent;
  let fixture: ComponentFixture<SuccessStoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessStoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessStoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
