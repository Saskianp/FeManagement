import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private apiService: ApiService, 
    private router: Router) {}

  canActivate(): boolean {
    if (this.apiService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
