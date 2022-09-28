import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConsultingComponent } from './user-consulting.component';

describe('UserConsultingComponent', () => {
  let component: UserConsultingComponent;
  let fixture: ComponentFixture<UserConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserConsultingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
