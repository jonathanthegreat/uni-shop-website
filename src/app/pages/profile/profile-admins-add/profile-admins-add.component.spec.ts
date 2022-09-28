import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdminsAddComponent } from './profile-admins-add.component';

describe('ProfileAdminsAddComponent', () => {
  let component: ProfileAdminsAddComponent;
  let fixture: ComponentFixture<ProfileAdminsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAdminsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdminsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
