import { TicketPopupService } from './../../services/ticket-popup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tickets-popover',
  templateUrl: './tickets-popover.component.html',
  styleUrls: ['./tickets-popover.component.scss']
})
export class TicketsPopoverComponent implements OnInit {

  public optionsForm : FormGroup;
  constructor(private fb: FormBuilder,
    private ticketPopoverSrv: TicketPopupService) { }

  ngOnInit() {
    this.createOptionsForm();
    
  }

  createOptionsForm(){
    this.optionsForm = this.fb.group({
      showDetailed: [false, Validators.required],
      showSearchBar: [false, Validators.required]
    });
  }

  saveTicketSettings(){
    this.ticketPopoverSrv.confirmOptions(this.optionsForm.value);
  }

}
