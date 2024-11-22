import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateModuleComponent } from './update-module.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [UpdateModuleComponent],
  exports: [UpdateModuleComponent],
})
export class UpdateModuleComponentModule {}
