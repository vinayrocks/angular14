import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdFooterComponent } from './rd-footer.component';

describe('RdFooterComponent', () => {
  let component: RdFooterComponent;
  let fixture: ComponentFixture<RdFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
