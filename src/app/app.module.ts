import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http'; 
import { ApiService } from './services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddParticipantComponentModule } from './components/add-participant/add-participant.component.module';
import { UpdateParticipantComponentModule } from './components/update-participant/update-participant.component.module';
import { AddMentorComponentModule } from './components/add-mentor/add-mentor.component.module';
import { UpdateMentorComponentModule } from './components/update-mentor/update-mentor.component.module';
import { AddModuleComponentModule } from './components/add-module/add-module.component.module';
import { UpdateModuleComponentModule } from './components/update-module/update-modul.component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    NgxPaginationModule, 
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AddParticipantComponentModule, 
    UpdateParticipantComponentModule,
    AddMentorComponentModule,
    UpdateMentorComponentModule,
    AddModuleComponentModule,
    UpdateModuleComponentModule,

  ],
  providers: [
    ApiService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
