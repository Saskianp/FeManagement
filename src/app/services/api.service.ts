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

  getPayload(): any {
    const payload = localStorage.getItem('payload');
    return payload ? JSON.parse(payload) : null; // Mengambil dan mengubah string JSON kembali menjadi objek
  }


  // Fungsi untuk menyimpan token ke localStorage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  savePayload(payload: any): void {
    localStorage.setItem('payload', JSON.stringify(payload)); // Mengubah objek menjadi string JSON sebelum disimpan
  }


  // Fungsi untuk menghapus token dari localStorage
  clearToken(): void {
    localStorage.removeItem('auth_token');
  }

  clearPayload(): void {
    localStorage.removeItem('payload');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.clearToken();
    this.clearPayload();
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

  getProfile(): Observable<any> {
    const url = this.address + 'users/profile';
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
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

  getAllMentors(): Observable<any> {
    const url = `${this.address}mentor`;
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

  //Module
  getAllModule(limit: number, page: number, search: string = ''): Observable<any> {
    const url = `${this.address}module?limit=${limit}&page=${page}&search=${search}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
  }

  getModuleById(id: number): Observable<any> {
    const url = `${this.address}module/get/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
  }
  
  createModule(title: string, description: string, class_module: string, date: string, mentor_id: number): Observable<any> {
    const url = this.address + 'module/create';
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });

    const body = {
      title: title,
      description: description,
      class_module: class_module,
      date: date,
      mentor_id: mentor_id
    };

    return this.http.post(url, body, { headers });
  }

  updateModule(id: number, title: string, description: string, class_module: string, date: string, mentor_id: number): Observable<any> {
    const url = `${this.address}module/update/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    const body = {
      title: title,
      description: description,
      class_module: class_module,
      date: date,
      mentor_id: mentor_id
    };
  
    return this.http.put(url, body, { headers });
  }  
  
  deleteModuleById(id: number): Observable<any> {
    const url = `${this.address}module/delete/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.delete(url, { headers });
  }

  //Module Content
  getAllModuleContent(limit: number, page: number): Observable<any> {
    const url = `${this.address}module/content?limit=${limit}&page=${page}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
  }

  getModuleContentById(id: number): Observable<any> {
    const url = `${this.address}module/content/get/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(url, { headers });
  }
  
  createModuleContent(module_id: number, title: string, content: string): Observable<any> {
    const url = this.address + 'module/content/create';
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });

    const body = {
      module_id: module_id,
      title: title,
      content: content
    };

    return this.http.post(url, body, { headers });
  }

  updateModuleContent(id: number, module_id: number, title: string, content: string): Observable<any> {
    const url = `${this.address}module/content/update/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    const body = {
      module_id: module_id,
      title: title,
      content: content
    };
  
    return this.http.put(url, body, { headers });
  }  
  
  deleteModuleContentById(id: number): Observable<any> {
    const url = `${this.address}module/content/delete/${id}`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.delete(url, { headers });
  }

}