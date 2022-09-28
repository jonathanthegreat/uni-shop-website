import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorsAddComponent} from './doctors-add.component';

describe('DoctorsAddComponent', () => {
  let component: DoctorsAddComponent;
  let fixture: ComponentFixture<DoctorsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorsAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
