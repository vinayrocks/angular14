import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdDeleteConfirmationBoxComponent } from './rd-delete-confirmation-box.component';

describe('RdDeleteConfirmationBoxComponent', () => {
  let component: RdDeleteConfirmationBoxComponent;
  let fixture: ComponentFixture<RdDeleteConfirmationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdDeleteConfirmationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdDeleteConfirmationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
