import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserMedicalInfoComponent} from './user-medical-info.component';

describe('UserMedicalInfoComponent', () => {
  let component: UserMedicalInfoComponent;
  let fixture: ComponentFixture<UserMedicalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMedicalInfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMedicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
