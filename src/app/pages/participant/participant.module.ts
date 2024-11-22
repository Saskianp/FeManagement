import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipantPageRoutingModule } from './participant-routing.module';

import { ParticipantPage } from './participant.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantPageRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [ParticipantPage]
})
export class ParticipantPageModule {}
