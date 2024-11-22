import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-module-content',
  templateUrl: './add-module-content.component.html',
  styleUrls: ['./add-module-content.component.scss'],
})
export class AddModuleContentComponent  implements OnInit {

  title: string = '';
  content: string = '';
  idModule: number | null = null; 
 
  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idModule = idParam ? Number(idParam) : null;
  }

  async onSubmit() {
    if (!this.idModule || !this.title || !this.content) {
      const errorAlert = await this.alertController.create({
        mode: 'ios',
        header: 'Error',
        message: 'Pastikan semua field sudah diisi.',
        buttons: ['OK'],
      });
      await errorAlert.present();
      return;
    }
    
    this.apiService.createModuleContent(
    this.idModule,     
    this.title,
    this.content
    ).subscribe(
      async (response) => {
        console.log('Module content created', response);
        
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Materi modul berhasil ditambahkan!',
          buttons: [
            {
              text: 'OK',
              handler: async () => {
                await this.router.navigate(['/modul']);
              }
            }
          ]
        });
        await successAlert.present();
        
      },
      async (error) => {
        console.error('Error creating module content', error);        
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat membuat materi modul. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
  }

  

}
