import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor( 
    private apiService: ApiService, 
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
   
  }

  async onLogin() {
    if (this.username.trim() && this.password.trim()) {
      (await this.apiService.login(this.username, this.password)).subscribe(
        async (response) => {
          if (response.token) {
            this.apiService.saveToken(response.token);  // Simpan token
            console.log('Login success:', response);
            this.navCtrl.navigateRoot('/dashboard'); 
            const successAlert = await this.alertController.create({
              mode: 'ios',
              header: 'Berhasil',
              message: 'Anda berhasil Login!',
              buttons: [
                {
                  text: 'OK',
                  // handler: async () => {
                  //   await this.navCtrl.navigateRoot('/participant');
                  // }
                }
              ]
            });
            await successAlert.present();
          }
        },
        async (error) => {
          console.error('Login failed:', error);
          const errorAlert = await this.alertController.create({
            mode: 'ios',
            header: 'Error',
            message: 'Terjadi kesalahan saat Login. Silakan coba lagi.',
            buttons: ['OK']
          });
          await errorAlert.present();
        }
      );
    } else {
      console.error('Username atau password kosong');
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Username atau password kosong',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    }
  }


  
  
