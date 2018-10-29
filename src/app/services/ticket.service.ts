import { Ticket } from './../models/ticket';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'api/ticket';
  constructor(private http: HttpClient) { }

  getTickets(){
    return this.http.get<Ticket[]>(this.apiUrl);
  }
}
