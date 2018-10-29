import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketPopupService {
  private optionsSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public options$ = this.optionsSource.asObservable();
  constructor() { }

  confirmOptions(options: any){
    this.optionsSource.next(options);
  }
}
