import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocReserveListComponent} from './doc-reserve-list.component';

describe('DocReserveListComponent', () => {
  let component: DocReserveListComponent;
  let fixture: ComponentFixture<DocReserveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocReserveListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocReserveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
