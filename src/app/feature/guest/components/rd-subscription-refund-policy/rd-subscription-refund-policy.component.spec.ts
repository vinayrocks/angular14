import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdSubscriptionRefundPolicyComponent } from './rd-subscription-refund-policy.component';

describe('RdSubscriptionRefundPolicyComponent', () => {
  let component: RdSubscriptionRefundPolicyComponent;
  let fixture: ComponentFixture<RdSubscriptionRefundPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdSubscriptionRefundPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdSubscriptionRefundPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
