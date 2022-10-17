import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdForgotPasswordComponent } from './rd-forgot-password.component';

describe('RdForgotPasswordComponent', () => {
  let component: RdForgotPasswordComponent;
  let fixture: ComponentFixture<RdForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
