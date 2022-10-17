import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdEventListComponent } from './rd-event-list.component';

describe('RdEventListComponent', () => {
  let component: RdEventListComponent;
  let fixture: ComponentFixture<RdEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
