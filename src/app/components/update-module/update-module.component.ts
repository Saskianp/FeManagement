import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.scss'],
})
export class UpdateModuleComponent  implements OnInit {

  title: string = '';
  description: string = ''
  class_module: string = '';
  date: string = '';
  mentor_id: number = 0;

  idModule: number | null = null; 

  modules: any;
  mentors: any[] = []; 
 
  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idModule = idParam ? Number(idParam) : null;

    if (this.idModule) {
      this.getModuleById(this.idModule);
    }

    this.getMentor();
  }

  onMentorChange(event: any) {
    const selectedMentor = event.detail.value;
    this.mentor_id = selectedMentor;
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.date = selectedDate;
  }

  onSubmit() {
  // Pastikan idModule tidak null sebelum melanjutkan
  if (this.idModule !== null) {
    this.apiService.updateModule(
      this.idModule, // idModule sudah dipastikan bertipe number
      this.title,
      this.description,
      this.class_module,
      this.date,
      this.mentor_id
    ).subscribe(
      async (response) => {
        console.log('Module updated', response);

        // Menampilkan alert jika update berhasil
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Modul berhasil diupdate!',
          buttons: [
            {
              text: 'OK',
              handler: async () => {
                // Navigasi kembali ke halaman modul setelah update
                await this.router.navigate(['/modul']);
              }
            }
          ]
        });
        await successAlert.present();
      },
      async (error) => {
        console.error('Error updating module', error);

        // Menampilkan alert jika terjadi kesalahan
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat update modul. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
  } else {
    // Menangani kasus jika idModule null
    console.error('idModule is null. Cannot update module.');

    // Menampilkan alert untuk memberi tahu pengguna
    this.alertController.create({
      mode: 'ios',
      header: 'Error',
      message: 'ID modul tidak ditemukan. Tidak dapat melakukan update.',
      buttons: ['OK']
    }).then(alert => alert.present());
  }
}

  getMentor() {
    this.apiService.getAllMentors().subscribe(
      (data: any) => {
        console.log(data.data);
        this.mentors = data.data; 
      },
      (error: any) => {
        console.error('Terjadi error:', error);
      }
    );
  }

  async getModuleById(id: number) {
    this.apiService.getModuleById(id).subscribe(
      (data: any) => {
        this.modules = data.data; 
      },
      (error: any) => {
        console.error('Terjadi error:', error);
      }
    );
  }

  
  onDelete() {
    // Pastikan idModule tidak null sebelum melanjutkan
    if (this.idModule !== null) {
      this.apiService.deleteMentorById(this.idModule).subscribe(
        async (response) => {
          console.log('Module deleted', response);
  
          const successAlert = await this.alertController.create({
            mode: 'ios',
            header: 'Berhasil',
            message: 'Modul berhasil dihapus!',
            buttons: [
              {
                text: 'OK',
                handler: async () => {
                  // Navigasi kembali ke halaman modul setelah penghapusan
                  await this.router.navigate(['/modul']);
                }
              }
            ]
          });
          await successAlert.present();
        },
        async (error) => {
          console.error('Error deleting module', error);
  
          // Menampilkan alert jika terjadi kesalahan
          const errorAlert = await this.alertController.create({
            mode: 'ios',
            header: 'Error',
            message: 'Terjadi kesalahan saat menghapus modul. Silakan coba lagi.',
            buttons: ['OK']
          });
          await errorAlert.present();
        }
      );
    } else {
      // Menangani kasus jika idModule null
      console.error('idModule is null. Cannot delete module.');
  
      this.alertController.create({
        mode: 'ios',
        header: 'Error',
        message: 'ID modul tidak ditemukan. Tidak dapat menghapus modul.',
        buttons: ['OK']
      }).then(alert => alert.present());
    }
  }
  
}
