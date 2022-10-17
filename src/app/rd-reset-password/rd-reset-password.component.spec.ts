import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdResetPasswordComponent } from './rd-reset-password.component';

describe('RdResetPasswordComponent', () => {
  let component: RdResetPasswordComponent;
  let fixture: ComponentFixture<RdResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
