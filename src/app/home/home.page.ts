import { TicketsPopoverComponent } from './tickets-popover/tickets-popover.component';
import { OnEnter } from './../interfaces/on-enter';
import { LoadingController, Platform, ActionSheetController, PopoverController, AlertController, NavController } from '@ionic/angular';
import { TicketService } from './../services/ticket.service';
import { Component, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticket';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TicketPopupService } from '../services/ticket-popup.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit, OnEnter, OnDestroy {

  private subscription: Subscription;
  currentTickets: Ticket[];
  loading: any;
  constructor(private ticketSrv: TicketService,
    private platform: Platform,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private route: ActivatedRoute,
    public popoverController: PopoverController,
    private ticketPopoverSrv: TicketPopupService,
    public alertController: AlertController,
    private zone: NgZone, ) {

  }
  async ngOnInit() {
    await this.platform.ready();
    this.ticketPopoverSrv.options$.subscribe(data => {
      if (data !== null) {
        this.presentAlert(JSON.stringify(data));
      }
    });
    await this.loadTickets();

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/' || event.url === '/tabs' || event.url === '/tabs/(home:home)') {
          this.onEnter();
        }
      }
    });
  }

  async presentAlert(content: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  async loadTickets() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await this.loading.present();
    this.ticketSrv.getTickets().subscribe(
      data => {
        this.currentTickets = data;
      }, err => {
        console.log(err);
      }, () => {
        this.loading.dismiss()
      }
    );
  }

  onEnter() {
    this.loadTickets();
  }

  ngAfterViewInit(): void {

  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async doRefresh(event) {
    await this.loadTickets();
    event.target.complete();
  }

  async presentActionSheet(id: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ticket',
      buttons: [{
        text: 'Edit',
        role: 'destructive',
        icon: 'create',
        handler: () => {
          this.editTicket(id);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentTicketPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TicketsPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  editTicket(ticketId: number) {
    // this.zone.run(()=>{
    //   this.router.navigate(['../edit'], { relativeTo: this.route });
    // });
    this.router.navigateByUrl("tabs/(home:edit/" + ticketId + ")");
  }




}
