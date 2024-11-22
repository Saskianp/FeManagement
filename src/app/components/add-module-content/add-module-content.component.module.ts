import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddModuleContentComponent } from './add-module-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [AddModuleContentComponent],
  exports: [AddModuleContentComponent],
})
export class AddModuleContentComponentModule {}
