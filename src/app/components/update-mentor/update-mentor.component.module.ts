import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMentorComponent } from './update-mentor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [UpdateMentorComponent],
  exports: [UpdateMentorComponent],
})
export class UpdateMentorComponentModule {}
