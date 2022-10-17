import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdGuestLayoutComponent } from './rd-guest-layout.component';

describe('RdGuestLayoutComponent', () => {
  let component: RdGuestLayoutComponent;
  let fixture: ComponentFixture<RdGuestLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdGuestLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdGuestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
