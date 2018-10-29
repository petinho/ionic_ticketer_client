import { TestBed, inject } from '@angular/core/testing';

import { TicketPopupService } from './ticket-popup.service';

describe('TicketPopupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketPopupService]
    });
  });

  it('should be created', inject([TicketPopupService], (service: TicketPopupService) => {
    expect(service).toBeTruthy();
  }));
});
