import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-mentor',
  templateUrl: './add-mentor.component.html',
  styleUrls: ['./add-mentor.component.scss'],
})
export class AddMentorComponent  implements OnInit {

  name: string = '';
  email: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,

  ) { }

  ngOnInit() {}

  onSubmit() {
    this.apiService.createMentor(this.name, this.email).subscribe(
      async (response) => {
        console.log('Mentor created', response);
        
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Pemateri berhasil ditambahkan!',
          buttons: [
            {
              text: 'OK',
              handler: async () => {
                await this.router.navigate(['/mentor']);
              }
            }
          ]
        });
        await successAlert.present();
        
      },
      async (error) => {
        console.error('Error creating mentor', error);        
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat membuat pemateri. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
  }

}
