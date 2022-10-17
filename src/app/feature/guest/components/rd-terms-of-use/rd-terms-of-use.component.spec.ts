import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdTermsOfUseComponent } from './rd-terms-of-use.component';

describe('RdTermsOfUseComponent', () => {
  let component: RdTermsOfUseComponent;
  let fixture: ComponentFixture<RdTermsOfUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdTermsOfUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdTermsOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
