import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdLoginComponent } from './rd-login.component';

describe('RdLoginComponent', () => {
  let component: RdLoginComponent;
  let fixture: ComponentFixture<RdLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
