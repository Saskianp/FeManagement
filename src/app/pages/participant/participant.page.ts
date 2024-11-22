import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.page.html',
  styleUrls: ['./participant.page.scss'],
})
export class ParticipantPage implements OnInit {
  
  participants: any[] = []; // Data peserta dari API
  totalItems: number = 0; // Total item untuk pagination
  itemsPerPage: number = 10; // Jumlah item per halaman
  currentPage: number = 1; // Halaman saat ini
  searchQuery: string = ''; // Query pencarian
  loading: boolean = false; // Indikator loading

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.getParticipant(); 
  }

  // Ambil data peserta dari API
  getParticipant() {
    this.loading = true;
    this.apiService.getAllParticipant(this.itemsPerPage, this.currentPage, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.data);
        this.participants = data.data; // Data peserta
        this.totalItems = data.total; // Total item dari API
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
    this.getParticipant(); // Muat ulang data
  }

  // Fungsi untuk pencarian
  onSearch() {
    this.currentPage = 1; // Reset ke halaman pertama saat pencarian
    this.getParticipant(); // Muat ulang data
  }

}

