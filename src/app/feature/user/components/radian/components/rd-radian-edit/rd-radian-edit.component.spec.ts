import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdRadianEditComponent } from './rd-radian-edit.component';

describe('RdRadianEditComponent', () => {
  let component: RdRadianEditComponent;
  let fixture: ComponentFixture<RdRadianEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdRadianEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdRadianEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
