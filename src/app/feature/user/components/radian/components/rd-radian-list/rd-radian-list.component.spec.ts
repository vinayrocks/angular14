import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdRadianListComponent } from './rd-radian-list.component';

describe('RdRadianListComponent', () => {
  let component: RdRadianListComponent;
  let fixture: ComponentFixture<RdRadianListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdRadianListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdRadianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
