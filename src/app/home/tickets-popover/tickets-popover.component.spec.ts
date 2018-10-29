import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPopoverComponent } from './tickets-popover.component';

describe('TicketsPopoverComponent', () => {
  let component: TicketsPopoverComponent;
  let fixture: ComponentFixture<TicketsPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
