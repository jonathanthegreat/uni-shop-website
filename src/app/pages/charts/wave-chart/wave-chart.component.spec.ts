import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WaveChartComponent} from './wave-chart.component';

describe('WaveChartComponent', () => {
  let component: WaveChartComponent;
  let fixture: ComponentFixture<WaveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaveChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
