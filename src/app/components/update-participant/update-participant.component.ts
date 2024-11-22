import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-participant',
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.scss'],
})
export class UpdateParticipantComponent  implements OnInit {

  name: string = '';
  email: string = '';
  phone: string = '';

  participants: any; 
  idParticipant: number | null = null;
  loading: boolean = false; 

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
   const idParam = this.route.snapshot.paramMap.get('id');
   this.idParticipant = idParam ? Number(idParam) : null;

   if (this.idParticipant) {
     this.getParticipant(this.idParticipant);
   }
 }

  onSubmit() {
    this.apiService.updateParticipant(
      this.participants.id,
      this.participants.name, 
      this.participants.email, 
      this.participants.phone
      ).subscribe(
      async (response) => {
        console.log('Participant updated', response);
        
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Peserta berhasil diupdate!',
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
        console.error('Error updating participant', error);        
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat update peserta. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
  }

  async getParticipant(id: number) {
    this.loading = true;
    this.apiService.getParticipantById(id).subscribe(
      (data: any) => {
        this.participants = data.data; 
        this.loading = false;
      },
      (error: any) => {
        console.error('Terjadi error:', error);
        this.loading = false;
      }
    );
  }


  onDelete() {
    this.apiService.deleteParticipantById(
      this.participants.id).subscribe(
      async (response) => {
        console.log('Participant deleted', response);
        
        const successAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Berhasil',
          message: 'Peserta berhasil dihapus!',
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
        console.error('Error deleting participant', error);        
        const errorAlert = await this.alertController.create({
          mode: 'ios',
          header: 'Error',
          message: 'Terjadi kesalahan saat menghapus peserta. Silakan coba lagi.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    );
  }

}
