import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModulPageRoutingModule } from './modul-routing.module';

import { ModulPage } from './modul.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulPageRoutingModule
  ],
  declarations: [ModulPage]
})
export class ModulPageModule {}
