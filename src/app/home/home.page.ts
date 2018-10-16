import { TicketService } from './../services/ticket.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {
  
  constructor(private ticketSrv: TicketService){

  }
  ngOnInit(): void {
    this.ticketSrv.getTickets().subscribe(
      data=>{
        console.log(data);
      }
    );
  }

  ngAfterViewInit(): void{
    this.ticketSrv.getTickets().subscribe(
      data=>{
        console.log(data);
      }
    );
  }


}
