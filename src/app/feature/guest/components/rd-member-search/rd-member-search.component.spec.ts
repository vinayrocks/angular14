import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdMemberSearchComponent } from './rd-member-search.component';

describe('RdMemberSearchComponent', () => {
  let component: RdMemberSearchComponent;
  let fixture: ComponentFixture<RdMemberSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdMemberSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdMemberSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

