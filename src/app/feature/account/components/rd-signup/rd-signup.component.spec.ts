import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdSignupComponent } from './rd-signup.component';

describe('RdSignupComponent', () => {
  let component: RdSignupComponent;
  let fixture: ComponentFixture<RdSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
