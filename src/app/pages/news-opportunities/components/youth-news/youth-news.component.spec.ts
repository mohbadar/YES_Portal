import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthNewsComponent } from './youth-news.component';

describe('YouthNewsComponent', () => {
  let component: YouthNewsComponent;
  let fixture: ComponentFixture<YouthNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouthNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouthNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
