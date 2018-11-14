import { Ticket } from './../models/ticket';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'api/ticket';
  
  constructor(private http: HttpClient) { }

  getTickets() {
    return this.http.get<Ticket[]>(this.apiUrl);
  }
  getTicket(id: number) {
    return this.http.get<Ticket>(this.apiUrl + '/' + id);
  }
  saveTicket(ticket: Ticket){
    return this.http.put(this.apiUrl, ticket);
  }
}
