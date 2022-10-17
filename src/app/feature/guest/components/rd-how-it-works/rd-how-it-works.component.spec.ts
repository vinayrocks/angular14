import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdHowItWorksComponent } from './rd-how-it-works.component';

describe('RdHowItWorksComponent', () => {
  let component: RdHowItWorksComponent;
  let fixture: ComponentFixture<RdHowItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdHowItWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
