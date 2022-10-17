import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdPortfolioEditComponent } from './rd-portfolio-edit.component';

describe('RdPortfolioEditComponent', () => {
  let component: RdPortfolioEditComponent;
  let fixture: ComponentFixture<RdPortfolioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdPortfolioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdPortfolioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
