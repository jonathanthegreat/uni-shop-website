import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdminsComponent } from './profile-admins.component';

describe('ProfileAdminsComponent', () => {
  let component: ProfileAdminsComponent;
  let fixture: ComponentFixture<ProfileAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
