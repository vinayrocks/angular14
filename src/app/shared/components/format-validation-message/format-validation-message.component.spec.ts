import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatValidationMessageComponent } from './format-validation-message.component';

describe('FormatValidationMessageComponent', () => {
  let component: FormatValidationMessageComponent;
  let fixture: ComponentFixture<FormatValidationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatValidationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
