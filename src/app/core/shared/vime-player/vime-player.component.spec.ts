import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VimePlayerComponent} from './vime-player.component';

describe('VimePlayerComponent', () => {
  let component: VimePlayerComponent;
  let fixture: ComponentFixture<VimePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VimePlayerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VimePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
