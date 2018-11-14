import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-editor',
  templateUrl: './ticket-editor.component.html',
  styleUrls: ['./ticket-editor.component.scss']
})
export class TicketEditorComponent implements OnInit {
  public ticketId: string;
  public ticketForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router) {
    this.createTicketForm();
  }

  ngOnInit() {
    //this.ticketId = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('id');
      this.loadTicket(+this.ticketId);
    });
  }
  createTicketForm() {
    this.ticketForm = this.fb.group({
      DriveHours: ['', Validators.required],
      WorkHours: ['', Validators.required],
      WorkDone: ['', Validators.required]
    });
  }

  loadTicket(id: number) {
    this.ticketService.getTicket(+this.ticketId).subscribe(
      data => {
        console.log(data);
      });
  }
  saveChanges(){

  }
  showTicketPictures(){
    this.router.navigateByUrl("tabs/(home:edit/" + this.ticketId + "/pics)");
  }

}
