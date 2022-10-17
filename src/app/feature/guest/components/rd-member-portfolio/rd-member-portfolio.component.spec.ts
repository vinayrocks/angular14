import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdMemberPortfolioComponent } from './rd-member-portfolio.component';

describe('RdMemberPortfolioComponent', () => {
  let component: RdMemberPortfolioComponent;
  let fixture: ComponentFixture<RdMemberPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdMemberPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdMemberPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
