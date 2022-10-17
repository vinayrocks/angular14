import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdEventEditComponent } from './rd-event-edit.component';

describe('RdEventEditComponent', () => {
  let component: RdEventEditComponent;
  let fixture: ComponentFixture<RdEventEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdEventEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
