import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  payload: any; // untuk menyimpan data payload

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getPayloadData(); // ambil data payload saat halaman ini di-load
  }

  // Fungsi untuk mengambil data payload
  getPayloadData() {
    const payload = this.apiService.getPayload();
    if (payload) {
      this.payload = payload; // Tidak perlu JSON.parse lagi karena data sudah berupa objek
      console.log(this.payload); // Untuk debugging
    }
  }


}
