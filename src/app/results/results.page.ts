import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { DbService } from '../services/db.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  results;

  constructor(private webService: HttpService, private alertCtrl: AlertController) { }
  
  ngOnInit() {
    this.results = this.webService.getData()
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Save Game',
      message: 'Do you want to add this game to your favourites list?',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
        }
        
      ]
    })
    await alert.present();
  }

  saveGame() {
    this.presentAlertConfirm();

    //DbService.addGame();
  }

}
