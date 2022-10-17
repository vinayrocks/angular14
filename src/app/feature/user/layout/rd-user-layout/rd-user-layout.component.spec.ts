import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdUserLayoutComponent } from './rd-user-layout.component';

describe('RdUserLayoutComponent', () => {
  let component: RdUserLayoutComponent;
  let fixture: ComponentFixture<RdUserLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdUserLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
