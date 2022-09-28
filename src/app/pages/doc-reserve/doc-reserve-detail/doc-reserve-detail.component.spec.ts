import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocReserveDetailComponent} from './doc-reserve-detail.component';

describe('DocReserveDetailComponent', () => {
  let component: DocReserveDetailComponent;
  let fixture: ComponentFixture<DocReserveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocReserveDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocReserveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
