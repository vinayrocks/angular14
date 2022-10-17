import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdWhoWeAreComponent } from './rd-who-we-are.component';

describe('RdWhoWeAreComponent', () => {
  let component: RdWhoWeAreComponent;
  let fixture: ComponentFixture<RdWhoWeAreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdWhoWeAreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdWhoWeAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
