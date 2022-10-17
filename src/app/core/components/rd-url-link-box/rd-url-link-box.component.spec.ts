import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdUrlLinkBoxComponent } from './rd-url-link-box.component';

describe('RdUrlLinkBoxComponent', () => {
  let component: RdUrlLinkBoxComponent;
  let fixture: ComponentFixture<RdUrlLinkBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdUrlLinkBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdUrlLinkBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
