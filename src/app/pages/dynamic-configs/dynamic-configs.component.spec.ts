import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicConfigsComponent} from './dynamic-configs.component';

describe('DynamicConfigsComponent', () => {
  let component: DynamicConfigsComponent;
  let fixture: ComponentFixture<DynamicConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicConfigsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
