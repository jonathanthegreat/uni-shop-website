import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdminsDetailComponent } from './profile-admins-detail.component';

describe('ProfileAdminsDetailComponent', () => {
  let component: ProfileAdminsDetailComponent;
  let fixture: ComponentFixture<ProfileAdminsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAdminsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdminsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
