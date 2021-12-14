import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { gameDetails } from './gameDetails';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  gamesList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchGames(): Observable<gameDetails[]> {
    return this.gamesList.asObservable();
  }

  getGames(){
    return this.storage.executeSql('SELECT * FROM gametable', []).then(res => {
      let items: gameDetails[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            gameName: res.rows.item(i).gameName,  
            gameDescription: res.rows.item(i).gameDescription,
            gameDeveloper: res.rows.item(i).gameDeveloper,
            userComment: res.rows.item(i).userComment
           });
        }
      }
      this.gamesList.next(items);
    });
  }

  addGame(gameName, gameDescription, gameDeveloper) {
    let data = [gameName, gameDescription, gameDeveloper];
    return this.storage.executeSql('INSERT INTO gametable (gameName, gameDescription, gameDeveloper) VALUES (?, ?, ?)', data)
    .then(res => {
      this.getGames();
    });
  }

  deleteGame(id) {
    return this.storage.executeSql('DELETE FROM gametable WHERE id = ?', [id])
    .then(_ => {
      this.getGames();
    });
  }
}
