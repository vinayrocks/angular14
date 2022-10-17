import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdPortfolioAddComponent } from './rd-portfolio-add.component';

describe('RdPortfolioAddComponent', () => {
  let component: RdPortfolioAddComponent;
  let fixture: ComponentFixture<RdPortfolioAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdPortfolioAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdPortfolioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
