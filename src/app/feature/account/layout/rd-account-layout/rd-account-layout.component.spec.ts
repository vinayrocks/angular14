import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdAccountLayoutComponent } from './rd-account-layout.component';

describe('RdAccountLayoutComponent', () => {
  let component: RdAccountLayoutComponent;
  let fixture: ComponentFixture<RdAccountLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdAccountLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdAccountLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
