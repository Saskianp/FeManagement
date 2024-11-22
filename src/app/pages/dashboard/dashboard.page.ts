import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  modules: any[] = []; // Data peserta dari API
  totalItems: number = 0; // Total item untuk pagination
  itemsPerPage: number = 10; // Jumlah item per halaman
  currentPage: number = 1; // Halaman saat ini
  searchQuery: string = ''; // Query pencarian
  loading: boolean = false; // Indikator loading

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.getModule(); 
  }

  // Ambil data module dari API
  getModule() {
    this.loading = true;
    this.apiService.getAllModule(this.itemsPerPage, this.currentPage, this.searchQuery).subscribe(
      (data: any) => {
        this.modules = data.modules; 
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
    this.getModule(); // Muat ulang data
  }

  // Fungsi untuk pencarian
  onSearch() {
    this.currentPage = 1; // Reset ke halaman pertama saat pencarian
    this.getModule(); // Muat ulang data
  }

  getClassColor(category: string): string {
    if (category === 'Pemogramman') {
      return 'cadetblue'; 
    } else if (category === 'Pengantar Bisnis') {
      return 'orange'; 
    } else if (category === 'Design Grafis') {
      return 'orangered'; 
    } else if (category === 'Algoritma') {
      return 'green'; 
    }
    return 'gray'; 
  }

}
