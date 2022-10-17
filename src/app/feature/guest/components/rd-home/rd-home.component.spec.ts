import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdHomeComponent } from './rd-home.component';

describe('RdHomeComponent', () => {
  let component: RdHomeComponent;
  let fixture: ComponentFixture<RdHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
