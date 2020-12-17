import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from "src/app/interfaces/player.interface";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private mock: Player[] = [{
    id: '0',
    name: 'Jacek',
    points: 0,
    isActive: true,
    playedCardId: null
  }, {
    id: '1',
    name: 'Pioter',
    points: 0,
    isActive: false,
    playedCardId: null
  }, {
    id: '2',
    name: 'Damian',
    points: 0,
    isActive: false,
    playedCardId: 0
  }, {
    id: '3',
    name: 'Golden',
    points: 0,
    isActive: false,
    playedCardId: null
  }, {
    id: '4',
    name: 'Hania',
    points: 0,
    isActive: false,
    playedCardId: 2
  }];

  constructor(private httpClient: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return new Observable<Player[]>((observer) => {
      setTimeout(() => {
        observer.next(this.mock);
        observer.complete();
      }, 700);
    });
    // return this.httpClient.get<Player[]>('');
  }
}