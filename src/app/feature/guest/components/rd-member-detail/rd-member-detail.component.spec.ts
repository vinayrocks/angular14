import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdMemberDetailComponent } from './rd-member-detail.component';

describe('RdMemberDetailComponent', () => {
  let component: RdMemberDetailComponent;
  let fixture: ComponentFixture<RdMemberDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdMemberDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdMemberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
