import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderImageSliderComponent } from './header-image-slider.component';

describe('HeaderImageSliderComponent', () => {
  let component: HeaderImageSliderComponent;
  let fixture: ComponentFixture<HeaderImageSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderImageSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
