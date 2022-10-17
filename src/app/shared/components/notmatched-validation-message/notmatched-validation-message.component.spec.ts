import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotmatchedValidationMessageComponent } from './notmatched-validation-message.component';

describe('NotmatchedValidationMessageComponent', () => {
  let component: NotmatchedValidationMessageComponent;
  let fixture: ComponentFixture<NotmatchedValidationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotmatchedValidationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotmatchedValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
