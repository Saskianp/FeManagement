import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'grid' },
    { title: 'Modul', url: '/modul', icon: 'book' },
    { title: 'Peserta', url: '/participant', icon: 'people' },
    { title: 'Pemateri', url: '/mentor', icon: 'person' },
  ];
  public profile = [
    { title: 'Setting', url: '/setting', icon: 'settings' },
  ];
  public Log = [
    { title: 'Logout', url: '', icon: 'log-out', action: 'logout' }, 
  ];

  constructor(
    private apiService: ApiService, 
    private router: Router) {}

  navigate(page: any) {
    if (page.action === 'logout') {
      this.logout();
    } else {
      this.router.navigate([page.url]);
    }
  }

  logout() {
    this.apiService.logout(); // Hapus token dan status autentikasi
    this.router.navigate(['/login']); // Redirect ke halaman login
  }

}

