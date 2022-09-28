import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MedicalFieldsComponent} from './medical-fields.component';

describe('MedicalFieldsComponent', () => {
  let component: MedicalFieldsComponent;
  let fixture: ComponentFixture<MedicalFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalFieldsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
