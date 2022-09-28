import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFinancialInfoComponent} from './user-financial-info.component';

describe('UserFinancialInfoComponent', () => {
  let component: UserFinancialInfoComponent;
  let fixture: ComponentFixture<UserFinancialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFinancialInfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFinancialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
