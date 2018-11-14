import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
