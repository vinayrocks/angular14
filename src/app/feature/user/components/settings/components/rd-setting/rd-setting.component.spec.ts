import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdSettingComponent } from './rd-setting.component';

describe('RdSettingComponent', () => {
  let component: RdSettingComponent;
  let fixture: ComponentFixture<RdSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
