import { PictureListComponent } from './../home/picture-list/picture-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { MapViewerPage } from '../map-viewer/map-viewer.page';
import { TicketEditorComponent } from '../home/ticket-editor/ticket-editor/ticket-editor.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'edit/:id',
        outlet: 'home',
        component: TicketEditorComponent
      },
      {
        path: 'edit/:id/pics',
        outlet: 'home',
        component: PictureListComponent
      },
      {
        path: 'about',
        outlet: 'about',
        component: AboutPage
      },
      {
        path: 'mapviewer',
        outlet: 'mapviewer',
        component: MapViewerPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
