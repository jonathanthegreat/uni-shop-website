import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorFinancilComponent} from './doctor-financil.component';

describe('DoctorFinancilComponent', () => {
  let component: DoctorFinancilComponent;
  let fixture: ComponentFixture<DoctorFinancilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorFinancilComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFinancilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
