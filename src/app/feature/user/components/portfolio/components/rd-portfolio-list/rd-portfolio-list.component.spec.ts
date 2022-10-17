import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdPortfolioListComponent } from './rd-portfolio-list.component';

describe('RdPortfolioListComponent', () => {
  let component: RdPortfolioListComponent;
  let fixture: ComponentFixture<RdPortfolioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdPortfolioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdPortfolioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
