import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorWeekBookComponent} from './doctor-week-book.component';

describe('DoctorWeekBookComponent', () => {
  let component: DoctorWeekBookComponent;
  let fixture: ComponentFixture<DoctorWeekBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorWeekBookComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorWeekBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
