import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorConsultingComponent} from './doctor-consulting.component';

describe('DoctorConsultingComponent', () => {
  let component: DoctorConsultingComponent;
  let fixture: ComponentFixture<DoctorConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorConsultingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
