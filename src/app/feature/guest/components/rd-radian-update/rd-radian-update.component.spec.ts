import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdRadianUpdateComponent } from './rd-radian-update.component';

describe('RdRadianUpdateComponent', () => {
  let component: RdRadianUpdateComponent;
  let fixture: ComponentFixture<RdRadianUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdRadianUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdRadianUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
