import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocReserveComponent} from './doc-reserve.component';

describe('DocReserveComponent', () => {
  let component: DocReserveComponent;
  let fixture: ComponentFixture<DocReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocReserveComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
