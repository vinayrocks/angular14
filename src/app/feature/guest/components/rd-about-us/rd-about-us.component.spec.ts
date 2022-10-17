import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdAboutUsComponent } from './rd-about-us.component';

describe('RdAboutUsComponent', () => {
  let component: RdAboutUsComponent;
  let fixture: ComponentFixture<RdAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
