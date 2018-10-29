import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { TicketsPopoverComponent } from './tickets-popover/tickets-popover.component';
import { TicketEditorComponent } from './ticket-editor/ticket-editor/ticket-editor.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],  
  declarations: [
    HomePage,
    TicketsPopoverComponent,
    TicketEditorComponent
    ],
  entryComponents:[
    TicketsPopoverComponent
  ]
})
export class HomePageModule {}
