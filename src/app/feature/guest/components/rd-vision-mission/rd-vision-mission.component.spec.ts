import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdVisionMissionComponent } from './rd-vision-mission.component';

describe('RdVisionMissionComponent', () => {
  let component: RdVisionMissionComponent;
  let fixture: ComponentFixture<RdVisionMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdVisionMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdVisionMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
