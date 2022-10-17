import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdUserListBoxComponent } from './rd-user-list-box.component';

describe('RdUserListBoxComponent', () => {
  let component: RdUserListBoxComponent;
  let fixture: ComponentFixture<RdUserListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdUserListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdUserListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
