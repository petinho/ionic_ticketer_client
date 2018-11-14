import { TicketPopupService } from './../../services/ticket-popup.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tickets-popover',
  templateUrl: './tickets-popover.component.html',
  styleUrls: ['./tickets-popover.component.scss']
})
export class TicketsPopoverComponent implements OnInit {

  public optionsForm : FormGroup;
  constructor(private fb: FormBuilder,
    private ticketPopoverSrv: TicketPopupService,
    private storage: Storage) { }

  ngOnInit() {
    this.createOptionsForm();
    this.storage.get('ticketListSettings').then((val) => {
      if (val !== null) {
        this.optionsForm.get('showSearchBar').setValue(val.showSearchBar);
        this.optionsForm.get('showDetailed').setValue(val.showDetailed);
      }
    });
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
