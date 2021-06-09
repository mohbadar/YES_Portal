import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsOpportunitiesComponent } from './news-opportunities.component';

describe('NewsOpportunitiesComponent', () => {
  let component: NewsOpportunitiesComponent;
  let fixture: ComponentFixture<NewsOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
