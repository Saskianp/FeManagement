import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss'],
})
export class AddModuleComponent  implements OnInit {

  title: string = '';
  description: string = '';
  class_module: string = '';
  date: string = '';
  mentor_id: number = 0;

  mentors: any[] = []; 
 
  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
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
    this.apiService.createModule(
      this.title,
      this.description,
      this.class_module,
      this.date,
      this.mentor_id
    ).subscribe(
      async (response) => {
        console.log('Module created', response);
        
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Modul berhasil ditambahkan!',
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
        console.error('Error creating module', error);        
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat membuat modul. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
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

}
