import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdRadianDetailComponent } from './rd-radian-detail.component';

describe('RdRadianDetailComponent', () => {
  let component: RdRadianDetailComponent;
  let fixture: ComponentFixture<RdRadianDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdRadianDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdRadianDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
