import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.page.html',
  styleUrls: ['./mentor.page.scss'],
})
export class MentorPage implements OnInit {

  mentors: any[] = []; // Data peserta dari API
  totalItems: number = 0; // Total item untuk pagination
  itemsPerPage: number = 10; // Jumlah item per halaman
  currentPage: number = 1; // Halaman saat ini
  searchQuery: string = ''; // Query pencarian
  loading: boolean = false; // Indikator loading

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.getMentor(); 
  }

  // Ambil data mentor dari API
  getMentor() {
    this.loading = true;
    this.apiService.getAllMentor(this.itemsPerPage, this.currentPage, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.data);
        this.mentors = data.data; 
        this.totalItems = data.total; 
        this.loading = false;
      },
      (error: any) => {
        console.error('Terjadi error:', error);
        this.loading = false;
      }
    );
  }

  // Fungsi untuk memuat data sesuai halaman
  getPage(page: number) {
    this.currentPage = page; // Update halaman saat ini
    this.getMentor(); // Muat ulang data
  }

  // Fungsi untuk pencarian
  onSearch() {
    this.currentPage = 1; // Reset ke halaman pertama saat pencarian
    this.getMentor(); // Muat ulang data
  }

}
