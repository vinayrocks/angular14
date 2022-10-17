import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadianLayoutComponent } from './radian-layout.component';

describe('RadianLayoutComponent', () => {
  let component: RadianLayoutComponent;
  let fixture: ComponentFixture<RadianLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadianLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadianLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
