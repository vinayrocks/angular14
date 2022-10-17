import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupImageSliderComponent } from './popup-image-slider.component';

describe('PopupImageSliderComponent', () => {
  let component: PopupImageSliderComponent;
  let fixture: ComponentFixture<PopupImageSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupImageSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
