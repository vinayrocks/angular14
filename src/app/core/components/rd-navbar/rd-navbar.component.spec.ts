import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdNavbarComponent } from './rd-navbar.component';

describe('RdNavbarComponent', () => {
  let component: RdNavbarComponent;
  let fixture: ComponentFixture<RdNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
