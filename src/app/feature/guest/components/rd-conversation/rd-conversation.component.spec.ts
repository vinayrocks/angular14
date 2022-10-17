import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdConversationComponent } from './rd-conversation.component';

describe('RdConversationComponent', () => {
  let component: RdConversationComponent;
  let fixture: ComponentFixture<RdConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
