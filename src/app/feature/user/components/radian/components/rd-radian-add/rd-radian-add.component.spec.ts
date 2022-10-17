import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdRadianAddComponent } from './rd-radian-add.component';

describe('RdRadianAddComponent', () => {
  let component: RdRadianAddComponent;
  let fixture: ComponentFixture<RdRadianAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdRadianAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdRadianAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
