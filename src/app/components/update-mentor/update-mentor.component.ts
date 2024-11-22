import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-mentor',
  templateUrl: './update-mentor.component.html',
  styleUrls: ['./update-mentor.component.scss'],
})
export class UpdateMentorComponent  implements OnInit {
  
  name: string = '';
  email: string = '';

  mentors: any; 
  idMentor: number | null = null;
  loading: boolean = false; 

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
   const idParam = this.route.snapshot.paramMap.get('id');
   this.idMentor = idParam ? Number(idParam) : null;

   if (this.idMentor) {
     this.getMentor(this.idMentor);
   }
 }

  onSubmit() {
    this.apiService.updateMentor(
      this.mentors.id,
      this.mentors.name, 
      this.mentors.email
      ).subscribe(
      async (response) => {
        console.log('Mentor updated', response);
        
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Pemateri berhasil diupdate!',
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
        console.error('Error updating mentor', error);        
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat update pemateri. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
  }

  async getMentor(id: number) {
    this.loading = true;
    this.apiService.getMentorById(id).subscribe(
      (data: any) => {
        this.mentors = data.data; 
        this.loading = false;
      },
      (error: any) => {
        console.error('Terjadi error:', error);
        this.loading = false;
      }
    );
  }


  onDelete() {
    this.apiService.deleteMentorById(
      this.mentors.id).subscribe(
      async (response) => {
        console.log('Mentor deleted', response);
        
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Pemateri berhasil dihapus!',
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
        console.error('Error deleting mentor', error);        
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat menghapus pemateri. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
  }

}
