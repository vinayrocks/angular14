import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdPrivacyPolicyComponent } from './rd-privacy-policy.component';

describe('RdPrivacyPolicyComponent', () => {
  let component: RdPrivacyPolicyComponent;
  let fixture: ComponentFixture<RdPrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdPrivacyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
