import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredValidationMessageComponent } from './required-validation-message.component';

describe('RequiredValidationMessageComponent', () => {
  let component: RequiredValidationMessageComponent;
  let fixture: ComponentFixture<RequiredValidationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredValidationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
