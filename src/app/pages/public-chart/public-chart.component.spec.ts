import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicChartComponent } from './public-chart.component';

describe('PublicChartComponent', () => {
  let component: PublicChartComponent;
  let fixture: ComponentFixture<PublicChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
