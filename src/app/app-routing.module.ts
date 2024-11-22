import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AddParticipantComponentModule } from './components/add-participant/add-participant.component.module';
import { AddParticipantComponent } from './components/add-participant/add-participant.component';
import { UpdateParticipantComponent } from './components/update-participant/update-participant.component';
import { AddMentorComponent } from './components/add-mentor/add-mentor.component';
import { UpdateMentorComponent } from './components/update-mentor/update-mentor.component';
import { AddModuleComponent } from './components/add-module/add-module.component';
import { UpdateModuleComponent } from './components/update-module/update-module.component';
import { AddModuleContentComponent } from './components/add-module-content/add-module-content.component';
import { UpdateModuleContentComponent } from './components/update-module-content/update-module-content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'modul',
    loadChildren: () => import('./pages/modul/modul.module').then( m => m.ModulPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-modul',  
    component: AddModuleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-modul/:id',  
    component: UpdateModuleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-modul-content/:id',  
    component: AddModuleContentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-modul-content/:id',  
    component: UpdateModuleContentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'participant',
    loadChildren: () => import('./pages/participant/participant.module').then( m => m.ParticipantPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-participant',  
    component: AddParticipantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-participant/:id',  
    component: UpdateParticipantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'regist',
    loadChildren: () => import('./pages/regist/regist.module').then( m => m.RegistPageModule)
  },
  {
    path: 'mentor',
    loadChildren: () => import('./pages/mentor/mentor.module').then( m => m.MentorPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-mentor',  
    component: AddMentorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-mentor/:id',  
    component: UpdateMentorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule),
    canActivate: [AuthGuard],

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
