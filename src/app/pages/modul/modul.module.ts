import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModulPageRoutingModule } from './modul-routing.module';

import { ModulPage } from './modul.page';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulPageRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [ModulPage]
})
export class ModulPageModule {}
