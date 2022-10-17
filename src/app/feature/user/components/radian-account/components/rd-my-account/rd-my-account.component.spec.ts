import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdMyAccountComponent } from './rd-my-account.component';

describe('RdMyAccountComponent', () => {
  let component: RdMyAccountComponent;
  let fixture: ComponentFixture<RdMyAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdMyAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
