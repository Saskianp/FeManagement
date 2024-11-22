import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateModuleContentComponent } from './update-module-content.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [UpdateModuleContentComponent],
  exports: [UpdateModuleContentComponent],
})
export class UpdateModuleContentComponentModule {}
