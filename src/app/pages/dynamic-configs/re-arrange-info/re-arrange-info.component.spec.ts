import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReArrangeInfoComponent} from './re-arrange-info.component';

describe('ReArrangeInfoComponent', () => {
  let component: ReArrangeInfoComponent;
  let fixture: ComponentFixture<ReArrangeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReArrangeInfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReArrangeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
