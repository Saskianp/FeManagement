import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ionViewWillEnter() {}

  private url = environment.apiurl;
  private port = environment.apiport;  
  private jwt = environment.jwtSecret;

  private address =
    'http://' + this.url + ':' + this.port + '/api/';

  // User 
  async login(username: string, password: string): Promise<Observable<any>> {
    const url = this.address + 'users/login';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const body = {
      username: username,
      password: password,
    };
  
    return this.http.post(url, body, { headers });
  }

  // Fungsi untuk mengambil token dari localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Fungsi untuk menyimpan token ke localStorage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Fungsi untuk menghapus token dari localStorage
  clearToken(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  regist(username: string, email: string, password: string): Observable<any> {
    const url = this.address + 'users/register';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const body = {
      username: username,
      email: email,
      password: password,
    };
  
    return this.http.post(url, body, { headers });
  }

  //Participant
  getAllParticipant(limit: number, page: number, search: string = ''): Observable<any> {
    const url = `${this.address}participant?limit=${limit}&page=${page}&search=${search}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
  }

  getParticipantById(id: number): Observable<any> {
    const url = `${this.address}participant/get/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
  }
  
  createParticipant(name: string, email: string, phone: string): Observable<any> {
    const url = this.address + 'participant/create';
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });

    const body = {
      name: name,
      email: email,
      phone: phone
    };

    return this.http.post(url, body, { headers });
  }

  updateParticipant(id: number, name: string, email: string, phone: string): Observable<any> {
    const url = `${this.address}participant/update/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    const body = { name, email, phone };
  
    return this.http.put(url, body, { headers });
  }  
  
  deleteParticipantById(id: number): Observable<any> {
    const url = `${this.address}participant/delete/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.delete(url, { headers });
  }

  //Mentor
  getAllMentor(limit: number, page: number, search: string = ''): Observable<any> {
    const url = `${this.address}mentor?limit=${limit}&page=${page}&search=${search}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
  }

  getMentorById(id: number): Observable<any> {
    const url = `${this.address}mentor/get/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
  }
  
  createMentor(name: string, email: string): Observable<any> {
    const url = this.address + 'mentor/create';
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });

    const body = {
      name: name,
      email: email
    };

    return this.http.post(url, body, { headers });
  }

  updateMentor(id: number, name: string, email: string): Observable<any> {
    const url = `${this.address}mentor/update/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    const body = { name, email };
  
    return this.http.put(url, body, { headers });
  }  
  
  deleteMentorById(id: number): Observable<any> {
    const url = `${this.address}mentor/delete/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.delete(url, { headers });
  }
}