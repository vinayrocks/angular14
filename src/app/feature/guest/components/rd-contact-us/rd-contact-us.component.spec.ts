import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdContactUsComponent } from './rd-contact-us.component';

describe('RdContactUsComponent', () => {
  let component: RdContactUsComponent;
  let fixture: ComponentFixture<RdContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
