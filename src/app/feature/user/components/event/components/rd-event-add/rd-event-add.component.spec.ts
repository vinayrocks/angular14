import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdEventAddComponent } from './rd-event-add.component';

describe('RdEventAddComponent', () => {
  let component: RdEventAddComponent;
  let fixture: ComponentFixture<RdEventAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdEventAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdEventAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
