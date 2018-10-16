import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    //api/ticket
    const ticket = [{
      id: 1,
      name: "Test ticket"
    },{
      id: 2,
      name: "The second ticket"
    }];

    const users = [];

    return {ticket, users};
  }

}
