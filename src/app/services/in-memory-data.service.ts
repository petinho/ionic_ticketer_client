import { Ticket } from './../models/ticket';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    //api/ticket       
    const ticket = [{
      id:1,
      Title: 'Incidence on the main module',
      CreationDate: new Date(),
      DueDate: new Date().setDate(25),
      Description: 'You have to repair the main module, then break it again'
    },{
      id:2,
      Title: 'Installation of hardware',
      CreationDate: new Date(),
      DueDate: new Date().setDate(23),
      Description: 'Install hardware and make tests'
    },{
      id:3,
      Title: 'Check line',
      CreationDate: new Date(),
      DueDate: new Date().setDate(26),
      Description: 'The line is too slow. Make some tests'
    },{
      id:4,
      Title: 'Change module A',
      CreationDate: new Date(),
      DueDate: new Date().setDate(27),
      Description: 'Replace module with a new one'
    },{
      id:5,
      Title: 'Make maintenance',
      CreationDate: new Date(),
      DueDate: new Date().setDate(28),
      Description: 'Standard yearly maintenance'
    },{
      id:6,
      Title: 'Change batteries',
      CreationDate: new Date(),
      DueDate: new Date().setDate(29),
      Description: 'Emergency batteries are low. Make a replacement'
    }];
    
    //api/users
    const users = [];

    return {ticket, users};
  }

}
