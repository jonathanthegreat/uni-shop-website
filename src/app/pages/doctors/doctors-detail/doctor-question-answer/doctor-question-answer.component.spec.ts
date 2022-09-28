import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorQuestionAnswerComponent} from './doctor-question-answer.component';

describe('DoctorQuestionAnswerComponent', () => {
  let component: DoctorQuestionAnswerComponent;
  let fixture: ComponentFixture<DoctorQuestionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorQuestionAnswerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
