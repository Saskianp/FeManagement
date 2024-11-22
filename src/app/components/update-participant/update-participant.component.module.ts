import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateParticipantComponent } from './update-participant.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [UpdateParticipantComponent],
  exports: [UpdateParticipantComponent],
})
export class UpdateParticipantComponentModule {}
