import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulPage } from './modul.page';

const routes: Routes = [
  {
    path: '',
    component: ModulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulPageRoutingModule {}
