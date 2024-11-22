import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss'],
})
export class AddParticipantComponent  implements OnInit {

  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,

  ) { }

  ngOnInit() {}

  onSubmit() {
    this.apiService.createParticipant(this.name, this.email, this.phone).subscribe(
      async (response) => {
        console.log('Participant created', response);
        
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Peserta berhasil ditambahkan!',
          buttons: [
            {
              text: 'OK',
              handler: async () => {
                await this.router.navigate(['/participant']);
              }
            }
          ]
        });
        await successAlert.present();
        
      },
      async (error) => {
        console.error('Error creating participant', error);        
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat membuat peserta. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
  }

}
