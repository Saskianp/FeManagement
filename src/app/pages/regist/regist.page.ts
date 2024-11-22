import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
})
export class RegistPage implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor( 
    private apiService: ApiService, 
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
   
  }

  async onRegist() {
    if (this.username.trim() && this.email.trim() && this.password.trim()) {
      (await this.apiService.regist(this.username, this.email, this.password)).subscribe(
        async (response) => {
          if (response.user) {
            this.navCtrl.navigateRoot('/login'); 
            const successAlert = await this.alertController.create({
              mode: 'ios',
              header: 'Berhasil',
              message: 'Anda berhasil Registrasi!',
              buttons: [
                {
                  text: 'OK',
                  handler: async () => {
                    await this.navCtrl.navigateRoot('/login');
                  }
                }
              ]
            });
            await successAlert.present();
          }
        },
        async (error) => {
          console.error('Regist failed:', error);
          const errorAlert = await this.alertController.create({
            mode: 'ios',
            header: 'Error',
            message: 'Terjadi kesalahan saat Registrasi. Silakan coba lagi.',
            buttons: ['OK']
          });
          await errorAlert.present();
        }
      );
    } else {
      console.error('Username, Email atau password kosong');
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Username, Email atau password kosong',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    }
  }
